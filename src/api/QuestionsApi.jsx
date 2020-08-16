import ApiUtils from "./ApiUtils";

class QuestionsApi {

    static async getAllQuestions () {
        console.info("Questions: returning questions to caller")
        return await ApiUtils.callGetRequest('/question');
    }

    static async addQuestion(question) {
        return await ApiUtils.callPostRequest('/question/add', question);
    }

    static async updateQuestion(id, question) {
        return await ApiUtils.callPutRequest("/question/update/" + id, question);
    }

    static async deleteQuestion(id) {
        return await ApiUtils.callDeleteRequest("/question/" + id);
    }

    static getConfiguration(){
        // TODO: implement?
        console.info("Questions: returning configuration options")
        return "[add, update]"
    }

}

export default QuestionsApi;