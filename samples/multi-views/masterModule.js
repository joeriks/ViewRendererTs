/// <reference path="ref.ts"/>
/// <reference path="gameModule.ts"/>
/// <reference path="app.ts"/>
var masterModule;
(function (masterModule) {
    var MasterModel = (function () {
        function MasterModel() {
            this.games = [];
            this.remoteGames = [];
        }
        MasterModel.prototype.newRemoteResult = function (remoteResult) {
            var _this = this;
            var found = false;
            $.each(this.remoteGames, function (idx, element) {
                if(element.guid == remoteResult.guid) {
                    _this.remoteGames[idx] = remoteResult;
                    found = true;
                }
            });
            if(!found) {
                this.remoteGames.push(remoteResult);
            }
            amplify.publish("remote", this.remoteGames);
        };
        MasterModel.prototype.totalResult = function () {
            var totalSpent = 0;
            var totalWin = 0;
            var maxWin = 0;
            $.each(this.games, function (idx, elem) {
                totalSpent = totalSpent + elem.model.spentMoney();
                totalWin = totalWin + elem.model.wonMoney;
                if(elem.model.maxWin > maxWin) {
                    maxWin = elem.model.maxWin;
                }
            });
            return {
                guid: this.guid,
                totalSpent: totalSpent,
                totalWin: totalWin,
                totalGames: this.games.length,
                maxWin: maxWin
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
        return DIV(P("Total games: " + result.totalGames), P("Total spent: " + result.totalSpent), P("Max win: " + result.maxWin), P("Total win: " + result.totalWin));
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
        }), DIV({
            id: "remoteResults"
        }));
    };
    var refreshTotalResult = function (model) {
        $("#rightContent div:first").html(totalResult(model));
    };
    var masterController = function (model, viewRenderer) {
        app.ws.bind('Sink.Read', function (allElements) {
            $.each(allElements, function (idx, element) {
                model.remoteGames.push({
                    guid: element.Key,
                    maxWin: element.JSON.maxWin,
                    totalGames: element.JSON.totalGames,
                    totalSpent: element.JSON.totalSpent,
                    totalWin: element.JSON.totalWin
                });
            });
        });
        app.ws.bind('Sink.Create', function (createdElement) {
            model.guid = createdElement.Key;
        });
        amplify.subscribe("remote", function (results) {
            var html = "";
            results.sort(function (a, b) {
                return (a.totalWin - a.totalSpent) - (b.totalWin - b.totalSpent);
            });
            $.each(results, function (idx, elem) {
                if(elem.guid == model.guid) {
                    html += "<p><strong>" + "spent: " + elem.totalSpent.toString() + " won: " + elem.totalWin.toString() + "</strong></p>";
                } else {
                    html += "<p>" + "spent: " + elem.totalSpent.toString() + " won: " + elem.totalWin.toString() + "</p>";
                }
            });
            $("#remoteResults").html(html);
        });
        amplify.subscribe("ticketResult", function () {
            refreshTotalResult(model);
            var result = model.totalResult();
            if(model.remoteGames.length == 0) {
                app.ws.trigger('Sink.Read', {
                    model: 'result'
                });
            }
            if(result.guid == null) {
                app.ws.trigger('Sink.Create', {
                    Type: 'result',
                    JSON: result
                });
            } else {
                app.ws.trigger('Sink.Update', {
                    Key: result.guid,
                    JSON: result
                });
            }
            app.ws.trigger('result', result);
        });
        app.ws.bind('result', function (result) {
            model.newRemoteResult(result);
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

