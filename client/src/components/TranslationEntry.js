import { useEffect, useRef } from 'react';
import { JsonEditor } from 'react-json-edit'
import M from 'materialize-css'

const TranslationEntry = ({ entry }) => {
  const saveRef = useRef();
  const deleteRef = useRef();

  const propagateChanges = (changes) => {
    // do nothing
  }

  useEffect(() => {
    const options = {
      inDuration: 300,
      outDuration: 250,
      exitDelay: 0,
      enterDelay: 250,
      transitionMovement: 10,
      position: "bottom",
      margin: 5
    };
    M.Tooltip.init(saveRef, options);
    M.Tooltip.init(deleteRef);
  }, [])

  return (
    <div className="col s12 m6 l6">
      <nav className="teal darken-3">
        <div className="container">
          <div className="nav-wrapper">
            <h6 className="brand-logo">{entry.name}</h6>
            <ul className="right">
              <li>
                <a href="!#" ref={saveRef} className="tooltipped" data-position="bottom" data-tooltip="Save">
                  <i className="material-icons">save</i>
                </a>
              </li>
              <li>
                <a href="!#" ref={deleteRef} className="tooltipped" data-position="bottom" data-tooltip="Remove">
                  <i className="material-icons">delete</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <JsonEditor value={entry.data} propagateChanges={propagateChanges} />
    </div>
  );
}

export default TranslationEntry;