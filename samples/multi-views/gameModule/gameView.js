/// <reference path="../ref.ts"/>
var gameModule;
(function (gameModule) {
    var gameBox = function (contents) {
        return DIV(H3("Another game"), contents);
    };
    gameModule.gameView = function (model) {
        return gameBox(DIV(P("Spent money : ", SPAN(model.spentMoney()), P("Max win : ", SPAN(model.maxWin)), P("Won money : ", SPAN(model.wonMoney)), P("Result : ", SPAN(model.result()), DIV(BUTTON("Get me another lottery ticket")), DIV((model.autoBuyIntervalId != null) ? INPUT({
            type: "checkbox",
            checked: "checked"
        }) : INPUT({
            type: "checkbox"
        }), LABEL("Auto buy")), DIV(SPAN(model.lastTicketResult))))));
    };
})(gameModule || (gameModule = {}));

