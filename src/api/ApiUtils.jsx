import axios from "axios";

const server = 'http://localhost:4000';

class ApiUtils {

    static async callGetRequest(path) {
        return axios.get(server + path);
    }

    static async callPostRequest(path, body) {
        return axios.post(server + path, body);
    }

    static async callPutRequest(path, body) {
        return axios.put(server + path, body);
    }

    static async callDeleteRequest(path) {
        return axios.delete(server + path);
    }
}

export default ApiUtils;