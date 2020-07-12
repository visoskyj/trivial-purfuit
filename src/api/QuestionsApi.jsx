import ApiUtils from "./ApiUtils";

class QuestionsApi {

    static async getAllQuestions () {
        return ApiUtils.callGetRequest('/question');
    }

    static async addQuestion(question) {
        return ApiUtils.callPostRequest('/question/add', question);
    }

    static async updateQuestion(id, question) {
        return ApiUtils.callPostRequest('/question/update/' + id, question);
    }

}

export default QuestionsApi;