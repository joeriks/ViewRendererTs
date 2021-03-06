﻿/// <reference path="../ref.ts"/>
/// <reference path="../gameModule/gameModule.ts"/>
/// <reference path="../app.ts"/>

module masterModule {

    var refreshTotalResult = (model: MasterModel) => {
        $("#rightContent div:first").html(
            totalResult(model)
        );
    }

    export var masterController = (model: MasterModel, viewRenderer: ViewRenderer) =>
    {
        if (xSocketsModule.enabled) {

            xSocketsModule.ws = new jXSockets.WebSocket("ws://xsocketslive.cloudapp.net:10101/XSockets.Live.Realtime.API",
        "XSockets.Live.Realtime.API", xSocketsModule.wsSettings);

            if (xSocketsModule.enableSink) {
                xSocketsModule.ws.bind('open', () => {

                    xSocketsModule.ws.trigger('Sink.Read', {
                        model: 'result-triss'
                    });

                });

                xSocketsModule.ws.bind('Sink.Read', (allElements) =>{
                    $.each(allElements, (idx, element) => {

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
                xSocketsModule.ws.bind('Sink.Create', (createdElement) =>{
                    model.guid = createdElement.Key;
                });

            }
            xSocketsModule.ws.bind('result', function (result: IgameResult) {
                model.newRemoteResult(result);
            });
            setTimeout(() =>{

                $("#remoteResults").html("Cannot reach server, so no high-scores, sorry.");
                $("#addgame").show();

            }, 2000);
        } else {
            $("#remoteResults").html("High-scores currently disabled, sorry.");
            $("#addgame").show();
        }

        app.localSubscribe("remote", (results: IgameResult[]) => {
            var html = "";
            results.sort((a, b) =>{ return (a.totalSpent - a.totalWin) - (b.totalSpent - b.totalWin) });
            $.each(results, (idx, elem) =>{
                var position = idx + 1;

                var identity = elem.guid.substr(0, 5);

                var result = position + ". '" + identity + "' Result: " + (elem.totalWin - elem.totalSpent).toString() + " Spent: " + elem.totalSpent.toString() + " Won: " + elem.totalWin.toString() + " (" + Math.round(elem.totalWin / elem.totalSpent * 100).toString() + "%) max win:" + elem.maxWin.toString();

                if (elem.guid == model.guid) {
                    html += "<p><strong>" + result + "</strong></p>";
                } else {
                    html += "<p>" + result + "</p>";
                }
            });
            $("#remoteResults").html(html);
        });


        app.localSubscribe("ticketResult", () => {
            refreshTotalResult(model);
            var result = model.totalResult();

            if (xSocketsModule.enabled) {

                if (xSocketsModule.enableSink) {
                    if (result.guid == null) {
                        xSocketsModule.ws.trigger('Sink.Create', { Type: 'result-triss', JSON: result });
                    } else {
                        xSocketsModule.ws.trigger('Sink.Update', { Key: result.guid, JSON: result });
                    }
                }

                xSocketsModule.ws.trigger('result', result);
            }
        });


        // recreate subviews

        $.each(model.games, (idx, game) => {
            game.render($("<div></div>").appendTo("#leftContent"))
        });

        viewRenderer.$el.find("button").on("click", () => {

            // create a new game
            var game = new gameModule.GameRenderer();
            game.render($("<div></div>").appendTo("#leftContent"))
            model.games.push(game);
            refreshTotalResult(model);

        });
    };
}