import axios from 'axios';


const API_URL = 'http://localhost:4000/list/';

class ListClass {
    getAll() {
        return axios.get(API_URL);
    }


    getListClassById(id) {
        return axios.get(API_URL + `${id}`);
    }
    getListClassByName(name) {
        return axios.get(API_URL + `listclass/${name}`);
    }
    filter(khoiName,className) {
        console.log(className);
        return axios.post(API_URL + `filter`, {
            khoiName: khoiName,
            className: className,
        });
    }
}

export default new ListClass();