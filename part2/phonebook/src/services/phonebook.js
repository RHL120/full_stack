import axios from "axios"
const URL = 'http://localhost:30001/persons'
const getAll = () => axios.get(URL).then(resp => resp.data)
const newContact = (new_person) => axios.post(URL, new_person)
export default { getAll, newContact }
