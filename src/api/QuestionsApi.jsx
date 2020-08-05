import ApiUtils from "./ApiUtils";

class QuestionsApi {

    static async getAllQuestions () {
        console.info("Questions: returning questions to caller")
        return ApiUtils.callGetRequest('/question');
    }

    static async addQuestion(question) {
        return ApiUtils.callPostRequest('/question/add', question);
    }

    static async updateQuestion(id, question) {
        return ApiUtils.callPutRequest("/question/update/" + id, question);
    }

    static async deleteQuestion(id) {
        return ApiUtils.callDeleteRequest("/question/" + id);
    }

    static getConfiguration(){
        // TODO: implement?
        console.info("Questions: returning configuration options")
        return "[add, update]"
    }

}

export default QuestionsApi;