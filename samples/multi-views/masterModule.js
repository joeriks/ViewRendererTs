/// <reference path="ref.ts"/>
/// <reference path="gameModule.ts"/>
var masterModule;
(function (masterModule) {
    var MasterModel = (function () {
        function MasterModel() {
            this.games = [];
        }
        MasterModel.prototype.totalResult = function () {
            var totalSpent = 0;
            var totalWin = 0;
            $.each(this.games, function (idx, elem) {
                totalSpent = totalSpent + elem.model.spentMoney();
                totalWin = totalWin + elem.model.wonMoney;
            });
            return {
                totalSpent: totalSpent,
                totalWin: totalWin,
                totalGames: this.games.length
            };
        };
        return MasterModel;
    })();    
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
        }, viewHeader("Total Result"), DIV(totalResult(model)), BUTTON("Add game")));
    };
    var refreshTotalResult = function (model) {
        $("#rightContent div:first").html(totalResult(model));
    };
    var masterController = function (model, viewRenderer) {
        amplify.subscribe("ticketResult", function () {
            refreshTotalResult(model);
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

