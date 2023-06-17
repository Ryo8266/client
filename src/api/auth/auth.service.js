import axios from 'axios';

const API_URL = 'http://localhost:4000/auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'sign-in', {
                userName: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    console.log(response.data)
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }
    signUpStudent(user) {
        console.log()
        return axios
            .post(API_URL + 'signup/student', {
                userName: user.userName,
                password: user.password,
                fullName: user.fullName,
                sex: user.sex,
                className: user.className,
                numberPhone: user.numberPhone,
                email: user.email,
                Date: user.Date,
                Address: user.Address
            })
            .then(response => {

                return response.data;
            });
    }
    signUpTeacher(user) {
        return axios
            .post(API_URL + 'signup/teacher', {
                userName: user.userName,
                password: user.password,
                fullName: user.fullName,
                sex: user.sex,
                subjectTeacherName: user.subjectTeacherName,
                numberPhone: user.numberPhone,
                email: user.email,
                Date: user.Date,
                Address: user.Address,
            })
            .then(response => {

                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }


}

export default new AuthService();