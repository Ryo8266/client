import axios from 'axios';


const API_URL = 'http://localhost:4000/score/';

class Score {
    getAll(accountId, subjectId, hocky, yearName) {
        return axios.get(API_URL, {
            params: {
                accountId: accountId,
                subjectId: subjectId,
                hocky: hocky,
                yearName: yearName
            }
        });
    }

    getAllScore(accountId, hocky, yearName) {
        return axios.get(API_URL + 'all', {
            params: {
                accountId: accountId,

                hocky: hocky,
                yearName: yearName
            }
        });
    }

    create(data) {
        return axios.post(API_URL, data);
    }

    createMany(data) {
        return axios.post(API_URL + 'createMany', data);
    }

    update(id, data) {
        delete  data.id
        return axios.patch(API_URL + id, data);
    }
}

export default new Score();