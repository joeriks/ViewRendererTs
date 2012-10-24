var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
/// <reference path="../ref.ts"/>
/// <reference path="gameModel.ts"/>
/// <reference path="gameView.ts"/>
/// <reference path="gameController.ts"/>
var gameModule;
(function (gameModule) {
    var GameRenderer = (function (_super) {
        __extends(GameRenderer, _super);
        function GameRenderer() {
            var gameModel = new gameModule.GameModel(lotteryModule.trissLottery);
                _super.call(this, gameModule.gameView, gameModel, gameModule.gameController);
        }
        return GameRenderer;
    })(ViewRenderer);
    gameModule.GameRenderer = GameRenderer;    
})(gameModule || (gameModule = {}));

