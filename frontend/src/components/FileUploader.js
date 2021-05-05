import useJsonFileReader from "../hooks/useJsonFileReader";

const FileUploader = ({ onUpload }) => {
  const onloadhook = (data, file) => onUpload(data, file)
  const [{ error }, setFile] = useJsonFileReader(onloadhook)

  const handleFileInput = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected)
    }
  }

  return (
    <div className="file-field input-field">
      <div className="btn red lighten-1">
        <span>File</span>
        <input type="file" onChange={handleFileInput} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" placeholder="Upload one file" multiple />
      </div>
      {error && <div className="red-text lighten-1">{error}</div>}
    </div>
  );
}

export default FileUploader;