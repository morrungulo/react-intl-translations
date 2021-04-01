import { useState } from 'react'
import { JsonEditor } from 'react-json-edit'
import Blob from 'blob'

const TranslationEntry = ({ entry, handleDelete }) => {
  const [value, setValue] = useState(entry.data);
  const { name, id } = entry;

  const propagateChanges = (changes) => {
    setValue(changes)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const json = JSON.stringify(value)
    const blob = new Blob([json], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = await URL.createObjectURL(blob)
    link.download = name
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link)
  }

  return (
    <div className="col s12 m6 l6">
      <nav className="teal darken-3">
        <div className="container">
          <div className="nav-wrapper">
            <span className="left flow-text">{name}</span>
            <ul className="right">
              <li>
                <a href="!#" onClick={handleSave}>
                  <i className="material-icons left">save</i>Save
                </a>
              </li>
              <li>
                <a href="!#delete" onClick={() => handleDelete(id)}>
                  <i className="material-icons left">delete</i>Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <JsonEditor tableLike={true} value={value} propagateChanges={propagateChanges} />
    </div>
  );
}

export default TranslationEntry;