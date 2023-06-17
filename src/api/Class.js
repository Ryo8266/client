import axios from 'axios';


const API_URL = 'http://localhost:4000/class/';

class ClassService {
    getClass() {
        return axios.get(API_URL);
    }
    getAllPagination(page) {
        return axios.get(API_URL, {params: {page}});
    }
    createClass(data) {
        console.log()

        return axios.post(API_URL, {
            name: data.name,
            Khoi: data.Khoi,
        });
    }

    getClassByList(name) {
        return axios.get(API_URL + 'Khoi/' + `${name}`);
    }

    getClassById(id) {
        return axios.get(API_URL + `${id}`);
    }

    getStudentsByClass(name) {
        return axios.get(API_URL + `students/${name}`);
    }

    filterClass(name, page) {
        console.log(name);
        return axios.post(API_URL + `filter`, {
            khoiName: name,
        }, {params: {page}});
    }

    classPagination(page) {
        return axios.get(API_URL, {params: page});
    }

    edit(id, data) {
        console.log(id)
        return axios.patch(API_URL + `${id}`, data);
    }

    delete(id) {
        return axios.delete(API_URL + `${id}`);
    }
}

export default new ClassService();
