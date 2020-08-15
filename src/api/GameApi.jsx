import ApiUtils from "./ApiUtils";

class GameApi {

    static async testGame () {
        console.info("testing Game")
        return ApiUtils.callGetRequest('/game');
    }
}

export default GameApi;