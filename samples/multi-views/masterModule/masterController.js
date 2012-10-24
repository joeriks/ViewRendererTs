/// <reference path="../ref.ts"/>
/// <reference path="../gameModule/gameModule.ts"/>
/// <reference path="../app.ts"/>
var masterModule;
(function (masterModule) {
    var refreshTotalResult = function (model) {
        $("#rightContent div:first").html(masterModule.totalResult(model));
    };
    masterModule.masterController = function (model, viewRenderer) {
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
            masterModule.refreshTotalResult(model);
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
            masterModule.refreshTotalResult(model);
        });
    };
})(masterModule || (masterModule = {}));

