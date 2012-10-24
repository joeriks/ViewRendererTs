/// <reference path="../ref.ts"/>
/// <reference path="gameModel.ts"/>
/// <reference path="gameView.ts"/>
/// <reference path="gameController.ts"/>


module gameModule {

    export class GameRenderer extends ViewRenderer {

        constructor () {

            var gameModel = new GameModel(lotteryModule.trissLottery);
            super(gameView, gameModel, gameController);

        }

    }

}