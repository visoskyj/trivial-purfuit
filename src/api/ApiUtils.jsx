import axios from "axios";

const server = 'http://localhost:4000';

class ApiUtils {

    static async callGetRequest(path) {
        return axios.get(server + path);
    }

    static async callPostRequest(path, body) {
        return axios.post(server + path, body);
    }
}

export default ApiUtils;