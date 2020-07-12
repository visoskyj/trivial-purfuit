import ApiUtils from "./ApiUtils";

class CategoryToColorMappingApi {

    static async getAllCategoryToColorMappings () {
        return ApiUtils.callGetRequest('/categoryToColor');
    }

    static async addCategoryToColorMapping(categoryToColorMapping) {
        return ApiUtils.callPostRequest('/categoryToColor/add', categoryToColorMapping);
    }

    static async updateCategoryToColorMapping(id, categoryToColorMapping) {
        return ApiUtils.callPostRequest('/categoryToColor/update/' + id, categoryToColorMapping);
    }

}

export default CategoryToColorMappingApi;