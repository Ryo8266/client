import axios from 'axios';


const API_URL = 'http://localhost:4000/subject/';

class SubjectService {
    async getAllSubjects() {
        return await axios.get(API_URL);
    }

    async getAllSubjectsById(id) {
        return await axios.get(API_URL + `id/${id}`);
    }

    async getAllSubjectsByName(name) {
        return await axios.get(API_URL + `name/${name}`);
    }

    async createSubject(data) {
        return await axios.post(API_URL, data)
    }

    async getPaginationSubject(page) {
        return await axios.get(API_URL + 'pagination', {params: {page}})
    }

    async updateData(data, id) {
        return await axios.patch(API_URL + id, data)
    }

    async deleteSubject(id) {
        return await axios.delete(API_URL + id)
    }

    async getAllSubjectsbyKhoi(khoi) {
        return axios.get(API_URL + `Khoi/${khoi}`)
    }

    filterSubjectbyPage(page, khoi) {
        return axios.get(API_URL + `Khoi/${khoi}`, {params: {page}})
    }
}

export default new SubjectService()