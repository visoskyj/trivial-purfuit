import ApiUtils from "./ApiUtils";

class GameApi {

    static async newGame (numPlayers) {
        console.info("Game API: newGame");
        return await ApiUtils.callPostRequest('/game/new', {"players": numPlayers});
    }

    static async allGames () {
        console.info("Game API: allGames");
        return await ApiUtils.callGetRequest('/game');

    }

    static async getPlayerCakes(){
        console.info("Game API: getPlayerCakes");
        return await ApiUtils.callGetRequest('/game/cakes');
    }

    static async updatePlayerCakes(color){
        console.info("Game API: updatePlayerCakes");
        return await ApiUtils.callPostRequest('/game/updatecakes', {"color" : color});
    }

    
    static async playerMoves(diceValue){
        console.info("Game API: playerMoves");
        return await ApiUtils.callPostRequest('/game/playermove', {"diceValue" : diceValue});
    }

    static async updatePlayers(){
        console.info("Game API: updatePlayers");
        return await ApiUtils.callGetRequest('/game/updatePlayers');
    }

    static async updateTurn(){
        console.info("Game API: updateTurn");
        return await ApiUtils.callGetRequest('/game/updateTurn');
    }

    static async movePlayer(spot){
        console.info("Game API: movePlayer");
        return await ApiUtils.callPostRequest('/game/movePlayer', {"spot": spot});
    }
}


export default GameApi;