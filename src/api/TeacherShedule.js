import axios from 'axios';


const API_URL = 'http://localhost:4000/teacherSchedule/';

class TeacherScheduleService {
    getByClass(userName, yearName) {
        return axios.get(API_URL, {
            params: {
                userName: userName,
                yearName: yearName
            }
        });
    }

    getUnique(userName, yearName) {
        return axios.get(API_URL + 'unique', {
            params: {
                userName: userName,
                yearName: yearName
            }
        });
    }

    create(data) {
        return axios.post(API_URL, data);
    }
   getClass(Classname,Year){
       return axios.get(API_URL +'class',{params:{
               Classname:Classname,
               Year:Year
           }

       });
   }
    createMany(data) {
        return axios.post(API_URL + 'many', data);
    }

    updateAndCreate(id, data) {
        console.log(id)
        console.log(data);
        console.log(id)
        return axios.patch(API_URL + id, data);
    }

}

export default new TeacherScheduleService()