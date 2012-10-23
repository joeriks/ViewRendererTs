/// <reference path="ref.ts"/>
/// <reference path="gameModule.ts"/>
/// <reference path="app.ts"/>
var masterModule;
(function (masterModule) {
    function GUID() {
        var S4 = function () {
            return Math.floor(Math.random() * 65536).toString(/* 65536 */
            16);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    var MasterModel = (function () {
        function MasterModel() {
            this.games = [];
            this.guid = GUID();
        }
        MasterModel.prototype.totalResult = function () {
            var totalSpent = 0;
            var totalWin = 0;
            $.each(this.games, function (idx, elem) {
                totalSpent = totalSpent + elem.model.spentMoney();
                totalWin = totalWin + elem.model.wonMoney;
            });
            return {
                guid: this.guid,
                totalSpent: totalSpent,
                totalWin: totalWin,
                totalGames: this.games.length
            };
        };
        return MasterModel;
    })();
    masterModule.MasterModel = MasterModel;    
    var masterModel = new MasterModel();
    var viewHeader = function (name) {
        return H2(name);
    };
    var totalResult = function (model) {
        var result = model.totalResult();
        return DIV(P("Total games: " + result.totalGames), P("Total spent: " + result.totalSpent), P("Total win: " + result.totalWin));
    };
    var masterView = function (model) {
        return DIV(STYLE({
            type: "text/css"
        }, CSS("#leftContent", {
            width: "50%",
            float: "left"
        }), CSS("#rightContent", {
            width: "50%",
            float: "left"
        })), DIV({
            id: "leftContent"
        }, viewHeader("Games")), DIV({
            id: "rightContent"
        }, viewHeader("Total Result"), DIV(totalResult(model)), BUTTON("Add game")), DIV({
            id: "fromServer"
        }));
    };
    var refreshTotalResult = function (model) {
        $("#rightContent div:first").html(totalResult(model));
    };
    var masterController = function (model, viewRenderer) {
        amplify.subscribe("ticketResult", function () {
            refreshTotalResult(model);
            var result = model.totalResult();
            app.ws.trigger('result', result);
        });
        app.ws.bind('result', function (result) {
            $("#fromServer").html(result.guid);
        });
        // recreate subviews
        $.each(model.games, function (idx, game) {
            game.render($("<div></div>").appendTo("#leftContent"));
        });
        viewRenderer.$el.find("button").on("click", function () {
            // create a new game
            var game = new gameModule.GameRenderer();
            game.render($("<div></div>").appendTo("#leftContent"));
            model.games.push(game);
            refreshTotalResult(model);
        });
    };
    masterModule.masterViewRenderer = new ViewRenderer(masterView, masterModel, masterController);
})(masterModule || (masterModule = {}));

