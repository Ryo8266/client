import axios from 'axios';
import authHeader from './auth-header';
import { fileHeader } from './auth-header';
const API_URL = 'http://localhost:4000/users/';

class UserService {

    getAll() {
        return axios.get(API_URL, { headers: authHeader() })
    }

    getStudentFillters(page,query,className,sex) {
        console.log(page,query,className,sex)
        return axios.get(API_URL+'search/filter', {params:{
                page: page,
                query: query,
                className:className,
                sex:sex
            },
            headers:authHeader()
        })
    }
    getTeacherFillters(page,query,subjectTeacherName,sex) {
        return axios.get(API_URL+'search/filter/teacher', {params:{
                page: page,
                query: query,
                subjectTeacherName:subjectTeacherName,
                sex:sex
            },
            headers:authHeader()
        })
    }
    getUser(username) {
        console.log('auth', authHeader())
        return axios.get(API_URL + `username/${username.data}`, { headers: authHeader() });
    }

    updateAvatar(userName, fileName) {

        const formData = new FormData()
        formData.append('file', fileName, fileName.name)
        return axios.patch(API_URL + `avatar/${userName.data}`, {
            file: formData
        }, { headers: fileHeader() }).then(response => {
            if (response) {
            }
            return response.data;
        })
    }
    uploadExcel(fileName) {
        console.log(fileName)
        const formData = new FormData()
        formData.append('file', fileName)
        return axios.post(API_URL + 'test', {
            file: fileName
        }, { headers: fileHeader() })
    }
    changePassword(userName, data) {
        console.log(data)
        return axios.put(API_URL + `changePassword/${userName}`, {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }, { headers: authHeader() });
    }
    importExcelTeacher(data) {
        return axios.post(API_URL + `importTeacher`, {
            data
        }, { headers: authHeader() });

    }
    importExcel(data) {
        return axios.post(API_URL + `import`, {
            data
        }, { headers: authHeader() });

    }
    getStudent() {
        return axios.get(API_URL+'role/student', { headers: authHeader() })
    }
    updateProfileUser(data){
        console.log(data)
        return axios.put(API_URL + `upadate/profile/${data.userName}`, {
            userName: data.userName,
            fullName: data.fullName,
            email: data.email,
            numberPhone: data.numberPhone,
            Address: data.Address,
            sex : data.sex,
            Date: data.date,
            className: data.className,
            hashedPassword:data.password,
            subjectTeacherName:data.subjectTeacherName

        }, { headers: authHeader() });
    }
    UserDelete(userName){
        return axios.delete(API_URL + `delete/${userName}`, { headers: authHeader() });
    }
}

export default new UserService();