import axios from 'axios';
const API_URL = 'http://localhost:4000/year/';
class YearService{
    getYear() {
        return axios.get(API_URL)
    }
    getYearActive() {
        return axios.get(API_URL+'isActive');
    }
    createYear(data){
        return axios.post(API_URL,data)
    }
    upadeYear(id,data){
        return axios.patch(API_URL  + id,data)
    }
    changeActiveYear(id){
        return axios.patch(API_URL + 'isActive/' + id)
    }
    deleteYear(id){
        return axios.delete(API_URL+id)
    }

}
export default new YearService;