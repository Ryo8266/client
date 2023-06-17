import axios from 'axios';
const API_URL = 'http://localhost:4000/subjectInDate/';
class ScheduleService {
    getByClass(name,year) {
        return axios.get(API_URL+'class/'+name+'/year/'+year);
    }

    create(data){
        return axios.post(API_URL,data);
    }
    createMany(data){
        return axios.post(API_URL+'many',data);
    }
 updateAndCreate(id,data){
        console.log(id)
        console.log(data);
        console.log(id)
     return axios.patch(API_URL+id,data);
 }



}

export default new ScheduleService();