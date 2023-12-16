import axios from "axios"
const URL = '/api/persons'
const getAll = () => axios.get(URL).then(resp => resp.data)
const newContact = new_person => axios.post(URL, new_person)
const deleteContact = id => axios.delete(`${URL}/${id}`)
const update = (id, newObject) => {return axios.put(`${URL}/${id}`, newObject)}
export default { getAll, newContact, deleteContact, update }
