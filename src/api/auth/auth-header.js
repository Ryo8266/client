export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {

        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}
export function fileHeader() {
    return { 'Content-Type': 'multipart/form-data' };
}