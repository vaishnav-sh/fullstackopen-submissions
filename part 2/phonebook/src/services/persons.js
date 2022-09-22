import axios from "axios";
const baseURL = `http://localhost:3001/persons`;

export const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
}

export const createPerson = (newEntry) => {
    const request = axios.post(baseURL, newEntry);
    return request.then(response => response.data);
}

export const updatePerson = (id, newEntry) => {
    const request = axios.put(`${baseURL}/${id}`, newEntry)
    return request.then(response => response.data);
}

export const deletePerson = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data);
}

// export default {getAll, createPerson, updatePerson, deletePerson}