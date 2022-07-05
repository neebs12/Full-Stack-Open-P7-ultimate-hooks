import { useState, useEffect } from 'react'

import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // ...
  useEffect(() => {
    axios.get(baseUrl)
    .then(result => {
      setResources(result.data)
    })
  }, [])

  const create = (resource) => {
    axios.post(baseUrl, resource)
    .then(result => {
      const newResource = result.data
      // <--- assume is full state incl. id within json database
      setResources(resources.concat(newResource))
      // <--- updates resources state for display later!
    })
  }

  const service = {
    create
  } 
  // <--- can have mult services, like update, delete, etc
  // <--- implicit .get service via the resources state and useEffect

  return [ 
    resources, service
  ] // <--- this is an array of values!
}
