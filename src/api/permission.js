import axios from 'axios';


const API_URL = 'http://localhost:4000/permission/';
class PermissionsServiece{
    getStudent(){
        return axios.get(API_URL+'student');
    }
    getTeacher(){
        return axios.get(API_URL+'teacher');
    }
}
export default new PermissionsServiece();