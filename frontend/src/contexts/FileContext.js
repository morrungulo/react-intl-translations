import { createContext, useContext, useState } from "react";
import { URL_LOAD_FILE, URL_SAVE_FILE } from "../constants";

const FileContext = createContext()

const FileProvider = ({ children }) => {
  const [nodes, setNodes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const find = (node) => {
    return nodes.some(el => el.node.name === node.name)
  }

  /**
   * Load the json 'data' from the node
   * @param {Node} node 
   */
  const loadNode = (node) => {
    if (!find(node)) {
      setIsLoading(true)
      fetch(`${URL_LOAD_FILE}?name=${node.name}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            throw new Error(data.error)
          }
          const item = { node, data: data.data }
          setNodes(prevState => [...prevState, item])
        })
        .catch(err => {
          console.error(err)
          alert(err)
        })
        .finally(() => setIsLoading(false))
    }
  }

  /**
   * Remove the node from the state
   * @param {Node} node 
   */
  const removeNode = (node) => {
    setNodes(nodes.filter(el => el.node.name !== node.name))
  }

  /**
   * Save the json 'data' to the node
   * @param {Node} node 
   * @param {Json} data 
   */
  const saveNode = (node, data) => {
    if (find(node)) {
      setIsSaving(true)
      fetch(`${URL_SAVE_FILE}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: node.name, data })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            throw new Error(data.error)
          }
          return data
        })
        .catch(err => {
          console.error(err)
          alert(err)
        })
        .finally(() => setIsSaving(false))
    }
  }

  const value = {
    nodes,
    loadNode,
    isLoading,
    removeNode,
    saveNode,
    isSaving
  }

  return (
    <FileContext.Provider value={value}>
      {children}
    </FileContext.Provider>
  )
}

const useFile = () => {
  return useContext(FileContext)
}

export { FileProvider, useFile }