import ApiUtils from "./ApiUtils";

class CategoryToColorMappingApi {

    static async getAllCategoryToColorMappings () {
        return await ApiUtils.callGetRequest('/categoryToColor');
    }

    static async addCategoryToColorMapping(categoryToColorMapping) {
        return await ApiUtils.callPostRequest('/categoryToColor/add', categoryToColorMapping);
    }

    static async updateCategoryToColorMapping(id, categoryToColorMapping) {
        return await ApiUtils.callPostRequest('/categoryToColor/update/' + id, categoryToColorMapping);
    }

}

export default CategoryToColorMappingApi;