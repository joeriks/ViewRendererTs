/// <reference path="../ref.ts"/>
/// <reference path="../gameModule/gameModule.ts"/>
/// <reference path="../app.ts"/>
var masterModule;
(function (masterModule) {
    var refreshTotalResult = function (model) {
        $("#rightContent div:first").html(masterModule.totalResult(model));
    };
    masterModule.masterController = function (model, viewRenderer) {
        if(xSocketsModule.enabled) {
            xSocketsModule.ws = new jXSockets.WebSocket("ws://xsocketslive.cloudapp.net:10101/XSockets.Live.Realtime.API", "XSockets.Live.Realtime.API", xSocketsModule.wsSettings);
            xSocketsModule.ws.bind('open', function () {
                xSocketsModule.ws.trigger('Sink.Read', {
                    model: 'result-triss'
                });
            });
            xSocketsModule.ws.bind('Sink.Read', function (allElements) {
                $.each(allElements, function (idx, element) {
                    model.remoteGames.push({
                        guid: element.Key,
                        maxWin: element.JSON.maxWin,
                        totalGames: element.JSON.totalGames,
                        totalSpent: element.JSON.totalSpent,
                        totalWin: element.JSON.totalWin
                    });
                });
                app.localPublish("remote", model.remoteGames);
                $("#addgame").show();
            });
            xSocketsModule.ws.bind('Sink.Create', function (createdElement) {
                model.guid = createdElement.Key;
            });
            xSocketsModule.ws.bind('result', function (result) {
                model.newRemoteResult(result);
            });
            setTimeout(function () {
                $("#remoteResults").html("Cannot reach server, so no high-scores, sorry.");
                $("#addgame").show();
            }, 2000);
        } else {
            $("#remoteResults").html("High-scores currently disabled, sorry.");
            $("#addgame").show();
        }
        app.localSubscribe("remote", function (results) {
            var html = "";
            results.sort(function (a, b) {
                return (a.totalSpent - a.totalWin) - (b.totalSpent - b.totalWin);
            });
            $.each(results, function (idx, elem) {
                var position = idx + 1;
                var result = position + ". Result: " + (elem.totalWin - elem.totalSpent).toString() + " Spent: " + elem.totalSpent.toString() + " Won: " + elem.totalWin.toString() + " (" + Math.round(elem.totalWin / elem.totalSpent * 100).toString + "%) max win:" + elem.maxWin.toString();
                if(elem.guid == model.guid) {
                    html += "<p><strong>" + result + "</strong></p>";
                } else {
                    html += "<p>" + result + "</p>";
                }
            });
            $("#remoteResults").html(html);
        });
        app.localSubscribe("ticketResult", function () {
            masterModule.refreshTotalResult(model);
            var result = model.totalResult();
            if(xSocketsModule.enabled && typeof (webSocket) != "undefined" && webSocket.readyState == 1) {
                if(result.guid == null) {
                    xSocketsModule.ws.trigger('Sink.Create', {
                        Type: 'result-triss',
                        JSON: result
                    });
                } else {
                    xSocketsModule.ws.trigger('Sink.Update', {
                        Key: result.guid,
                        JSON: result
                    });
                }
                xSocketsModule.ws.trigger('result', result);
            }
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

