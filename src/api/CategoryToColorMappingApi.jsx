import ApiUtils from "./ApiUtils";

class CategoryToColorMappingApi {

    static async getAllCategoryToColorMappings () {
        return ApiUtils.callGetRequest('/categoryToColor');
    }

    static async addCategoryToColorMapping(question) {
        return ApiUtils.callPostRequest('/categoryToColor/add', question);
    }

    static async updateCategoryToColorMapping(id, question) {
        return ApiUtils.callPostRequest('/categoryToColor/update/' + id, question);
    }

}

export default CategoryToColorMappingApi;