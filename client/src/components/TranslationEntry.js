import { useEffect, useRef, useState } from 'react'
import { JsonEditor } from 'react-json-edit'
import M from 'materialize-css'

const TranslationEntry = ({ entry, handleDelete }) => {
  const [value, setValue] = useState(entry.data);
  const { name, id } = entry;

  const propagateChanges = (changes) => {
    setValue(changes)
  }

  const handleSave = (e) => {
    e.preventDefault()
    console.log('save here', name, id)
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
      <JsonEditor value={value} propagateChanges={propagateChanges} />
    </div>
  );
}

export default TranslationEntry;