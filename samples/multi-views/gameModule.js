var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
/// <reference path="ref.ts"/>
var gameModule;
(function (gameModule) {
    var GameModel = (function () {
        function GameModel(ticketPrice) {
            this.boughtTickets = 0;
            this.wonMoney = 0;
            this.ticketPrice = ticketPrice;
            this.lastTicketResult = "";
            this.lastTicketWin = 0;
        }
        GameModel.prototype.buyTicket = function () {
            this.boughtTickets += 1;
            var random = Math.floor((Math.random() * 10) + 1);
            var win = 0;
            if(random > 5) {
                win = this.ticketPrice * 2;
                this.lastTicketResult = "Win " + win;
                this.wonMoney += win;
            } else {
                this.lastTicketResult = "No win";
            }
            this.lastTicketWin = win;
            amplify.publish("ticketResult", this);
            return win;
        };
        GameModel.prototype.result = function () {
            return this.wonMoney - this.spentMoney();
        };
        GameModel.prototype.spentMoney = function () {
            return this.boughtTickets * this.ticketPrice;
        };
        return GameModel;
    })();
    gameModule.GameModel = GameModel;    
    var gameBox = function (contents) {
        return DIV(H3("Another game"), contents);
    };
    var gameView = function (model) {
        return gameBox(DIV(P("Spent money : ", SPAN(model.spentMoney()), P("Won money : ", SPAN(model.wonMoney)), P("Result : ", SPAN(model.result()), DIV(BUTTON("Get me another lottery ticket"), SPAN(model.lastTicketResult))))));
    };
    var gameController = function (model, viewRenderer) {
        return viewRenderer.$el.find("button").on("click", function () {
            model.buyTicket();
            viewRenderer.render();
        });
    };
    var GameRenderer = (function (_super) {
        __extends(GameRenderer, _super);
        function GameRenderer() {
            var gameModel = new GameModel(25);
                _super.call(this, gameView, gameModel, gameController);
        }
        return GameRenderer;
    })(ViewRenderer);
    gameModule.GameRenderer = GameRenderer;    
})(gameModule || (gameModule = {}));

