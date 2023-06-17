
import http from './api'
class Menu {
    async index(options = {}) {
        return await http.get('/menu', options)
    }
    async uploadExcel(data) {
        return await http.post('/meu/upload', data)
    }

}
export default new Menu()