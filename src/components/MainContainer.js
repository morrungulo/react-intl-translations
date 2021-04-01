import { useState } from "react";
import FileUploader from "./FileUploader";
import TranslationEntry from "./TranslationEntry";

const MainContainer = () => {
  const [entries, setEntries] = useState([]);

  const onUpload = (data, file) => {
    const entry = { id: Date.now(), data, name: file.name }
    setEntries([...entries, entry])
  }

  const handleDelete = (id) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
  }

  return (
    <div className="section">
      <div className="row">
        <div className="col s12 m8 l6">
          <FileUploader onUpload={onUpload} />
        </div>
      </div>
      <div className="row">
        {entries.length > 0 &&
          entries.map(entry => (
            <div key={entry.id}>
              <TranslationEntry entry={entry} handleDelete={handleDelete} />
            </div>
          ))}
      </div>
    </div >
  );
}

export default MainContainer;