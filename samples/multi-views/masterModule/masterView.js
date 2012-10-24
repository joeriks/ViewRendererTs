/// <reference path="../ref.ts"/>
/// <reference path="../app.ts"/>
var masterModule;
(function (masterModule) {
    var viewHeader = function (name) {
        return H2(name);
    };
    masterModule.totalResult = function (model) {
        var result = model.totalResult();
        return DIV(P("Total games: " + result.totalGames), P("Total spent: " + result.totalSpent), P("Max win: " + result.maxWin), P("Total win: " + result.totalWin));
    };
    masterModule.masterView = function (model) {
        return DIV(STYLE({
            type: "text/css"
        }, CSS("#leftContent", {
            width: "50%",
            float: "left"
        }), CSS("#rightContent", {
            width: "50%",
            float: "right"
        }), CSS("p", {
            "margin-top": "0px",
            "margin-bottom": "0px"
        })), DIV({
            id: "leftContent"
        }, viewHeader("Games")), DIV({
            id: "rightContent"
        }, viewHeader("Total Result"), DIV(masterModule.totalResult(model)), BUTTON({
            id: "addgame",
            style: "display:none;"
        }, "Add game"), DIV({
            id: "fromServer"
        }), DIV({
            id: "remoteResults"
        }, "Communicating with server...")));
    };
    masterModule.refreshTotalResult = function (model) {
        $("#rightContent div:first").html(masterModule.totalResult(model));
    };
})(masterModule || (masterModule = {}));

