/// <reference path="ref.ts"/>
/// <reference path="gameModule.ts"/>
/// <reference path="app.ts"/>
var masterModule;
(function (masterModule) {
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
            float: "right"
        }), CSS("p", {
            "margin-top": "0px",
            "margin-bottom": "0px"
        })), DIV({
            id: "leftContent"
        }, viewHeader("Games")), DIV({
            id: "rightContent"
        }, viewHeader("Total Result"), DIV(totalResult(model)), BUTTON({
            id: "addgame",
            style: "display:none;"
        }, "Add game"), DIV({
            id: "fromServer"
        }), DIV({
            id: "remoteResults"
        }, "Communicating with server...")));
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
            amplify.publish("remote", model.remoteGames);
        });
        app.ws.bind('Sink.Create', function (createdElement) {
            model.guid = createdElement.Key;
        });
        amplify.subscribe("remote", function (results) {
            var html = "";
            results.sort(function (a, b) {
                return (a.totalSpent - a.totalWin) - (b.totalSpent - b.totalWin);
            });
            $.each(results, function (idx, elem) {
                var position = idx + 1;
                if(elem.guid == model.guid) {
                    html += "<p><strong>" + position + ". Result: " + (elem.totalWin - elem.totalSpent).toString() + " Spent: " + elem.totalSpent.toString() + " Won: " + elem.totalWin.toString() + " max win:" + elem.maxWin.toString() + "</strong></p>";
                } else {
                    html += "<p>" + position + ". Result: " + (elem.totalWin - elem.totalSpent).toString() + " Spent: " + elem.totalSpent.toString() + " Won: " + elem.totalWin.toString() + " max win:" + elem.maxWin.toString() + "</p>";
                }
            });
            $("#remoteResults").html(html);
        });
        $(function () {
            return setTimeout(function () {
                app.ws.trigger('Sink.Read', {
                    model: 'result-triss'
                });
                $("#addgame").show();
            }, 2000);
        });
        amplify.subscribe("ticketResult", function () {
            refreshTotalResult(model);
            var result = model.totalResult();
            if(result.guid == null) {
                app.ws.trigger('Sink.Create', {
                    Type: 'result-triss',
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

