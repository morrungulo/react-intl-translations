import { useState } from "react";
import FileUploader from "./FileUploader";
import TranslationEntry from "./TranslationEntry";

const MainContainer = () => {
  const [entries, setEntries] = useState([]);

  const onUpload = (data, file) => {
    const entry = { id: Date.now(), data, file, name: file.name }
    setEntries([...entries, entry])
  }

  return (
    <div className="section">
      {/* <div className="container"> */}

      <div className="row">
        <div className="col s12 m8 l6">
          <FileUploader onUpload={onUpload} />
        </div>
      </div>

      <div className="row">
        {entries.length > 0 &&
          entries.map(entry => (
            <div key={entry.id}>
              <TranslationEntry entry={entry} />
            </div>
          ))}
      </div>

      {/* </div> */}
    </div >
  );
}

export default MainContainer;