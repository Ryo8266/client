import axios from 'axios';
import authHeader from './auth-header';
import http from "@/api/api";

const API_URL = 'http://localhost:4000/class/';

class QLSV {
    getdata(username) {
        return http.get( + `class/username/${username}`, { headers: authHeader() });
    }
 
}

export default new QLSV(); 
