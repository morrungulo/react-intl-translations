import { useEffect, useState } from "react"

const noop = () => { }

const useJsonFileReader = (onloadhook = noop) => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!file) return
    const allowedTypes = ["application/json"]
    if (!allowedTypes.includes(file.type)) {
      setError("Please select a valid json file.")
      return
    }
    setError(null)

    const reader = new FileReader()
    reader.onloadstart = () => {
      setLoading(true)
      console.log("onloadstart")
    }
    reader.onloadend = () => {
      setLoading(false)
      console.log("onloadend")
    }
    reader.onload = (e) => {
      console.log("onload")
      try {
        const jsondata = JSON.parse(e.target.result)
        setError(null)
        setData(jsondata)
        onloadhook(jsondata, file)
      } catch (err) {
        setError("Invalid Json format.")
      }
    }
    reader.onerror = (e) => {
      console.log("onerror")
      setError(reader.error)
    }
    try {
      reader.readAsText(file)
    } catch (err) {
      setError(reader)
    }
  }, [file])

  return [{ data, error, file, loading }, setFile]
}

export default useJsonFileReader