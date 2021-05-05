const { readdir, stat, readFile, writeFile } = require('fs/promises')
const { resolve, join } = require('path')

/**
 * Recursively walk the directory tree and return the filenames and directories.
 * @param {String} dir the root directory 
 * @param {String} prefix the prefix which must be removed from the directory names
 * @returns A structure containing the contents of the root directory
 */
const readFolder = async (dir, prefix) => {
  const dirents = await readdir(dir, { withFileTypes: true });
  const contents = await Promise.all(dirents.map((dirent) => {
    if (dirent.isSymbolicLink()) {
      return  // skip links
    }
    if (dirent.isDirectory()) {
      const res = resolve(dir, dirent.name);
      return readFolder(res, prefix)  // recursive
    }
    return { type: 'f', name: dirent.name }
  }));
  return { type: 'd', name: dir.replace(prefix, ''), contents }
}

module.exports.getFiles = async (req, res, next) => {
  try {
    const data = await readFolder(process.env.ROOT_FOLDER, resolve(process.env.ROOT_FOLDER))
    res.status(200).json({ data: data.contents })
  } catch (e) {
    return next(e)
  }
}

/**
 * @param {String} filename 
 * @returns true if filename is a file and it exists
 */
const isValidAndExists = async (filename) => {
  try {
    const stats = await stat(filename)
    return stats.isFile()
  } catch (e) {
    return false
  }
}


module.exports.loadFile = async (req, res, next) => {
  const { name } = req.query
  // if (!name) {
  //   const error = new Error('missing/invalid query field')
  //   error.status = 400
  //   return next(error)
  // }

  // file exists?
  const fullname = join(process.env.ROOT_FOLDER, name)
  if (! await isValidAndExists(fullname)) {
    const error = new Error(`unknown/invalid file (${name})`)
    error.status = 400
    return next(error)
  }

  // read file
  try {
    const contents = await readFile(fullname, 'utf8')
    const data = JSON.parse(contents)
    res.status(200).json({ name, data })
  } catch (e) {
    const error = new Error(`invalid json file (${name})`)
    return next(error)
  }
}

module.exports.saveFile = async (req, res, next) => {
  const { name, data } = req.body

  // file exists?
  const fullname = join(process.env.ROOT_FOLDER, name)
  if (! await isValidAndExists(fullname)) {
    const error = new Error(`unknown/invalid file (${name})`)
    error.status = 400
    return next(error)
  }

  // write file
  try {
    const contents = JSON.stringify(data, null, '  ')
    await writeFile(fullname, contents)
    res.status(201).json({ name })
  } catch (e) {
    const error = new Error(`error occurred (${name})`)
    return next(error)
  }
}