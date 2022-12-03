import {createContext, useContext, useState} from 'react'
import addNewDomainValidation from '../validator/addNewDomainValidator'
import Domain from '../lib/api/Domain'
import {DomainListContext} from './DomainListProvider'

export const AddDomainContext = createContext({})

const AddDomainProvider = ({children}) => {

  const INIT_VALUES = {name: '', sitemap: '', favicon: ''}

  const {handleAddDomain} = useContext(DomainListContext)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(INIT_VALUES)
  const [errors, setErrors] = useState({})

  const handleChange = label => event => setValues({
                                                     ...values,
                                                     [label]: event.target.value,
                                                   })

  const handleSubmit = async () => {
    const {value: validatedData, error} = addNewDomainValidation(values)
    if (!(error === undefined)) {
      handleErrors(error.details)
    }
    else {
      setLoading(true)
      await addDomain()
      handleReset()
      console.log('validator', validatedData, error, error.details)
      setLoading(false)
    }
  }
  const handleReset = () => {
    setValues(INIT_VALUES)
    setErrors({})
  }

  const addDomain = async () => {
    const {data} = await Domain.addNewDomain(values)
    handleAddDomain(data)
    return data

  }

  const handleErrors = validationErrors => {
    let newErrors = {}
    validationErrors.forEach(error => {
      newErrors[error.context.label] = error.message
    })
    setErrors(newErrors)
    console.log('PROV ERRORS :', errors)
  }

  return (<AddDomainContext.Provider value={{
    values, loading, handleChange, handleSubmit, errors, handleReset,
  }}>
    {children}
  </AddDomainContext.Provider>)
}
export default AddDomainProvider