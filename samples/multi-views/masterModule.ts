﻿/// <reference path="ref.ts"/>
/// <reference path="gameModule.ts"/>
/// <reference path="app.ts"/>

module masterModule {

    export interface IgameResult {
        guid: string;
        totalSpent: number;
        totalWin: number;
        totalGames: number;
        maxWin: number;
    }
    export class MasterModel {
        games: gameModule.GameRenderer[];
        guid: string;
        remoteGames: IgameResult[];
        constructor () {
            this.games = [];
            this.remoteGames = [];
        }

        newRemoteResult(remoteResult: IgameResult) {
            var found = false;
            $.each(this.remoteGames, (idx, element) => {

                if (element.guid == remoteResult.guid) {
                    element = remoteResult;
                    found = true;
                }
            });
            if (!found) {
                this.remoteGames.push(remoteResult);
            }
            amplify.publish("remote", this.remoteGames);
        }

        totalResult(): IgameResult {

            var totalSpent = 0;
            var totalWin = 0;
            var maxWin = 0;

            $.each(this.games, (idx, elem: gameModule.GameRenderer) =>{
                totalSpent = totalSpent + elem.model.spentMoney();
                totalWin = totalWin + elem.model.wonMoney;
                if (elem.model.maxWin > maxWin) maxWin = elem.model.maxWin;
            });
            return {
                guid: this.guid,
                totalSpent: totalSpent,
                totalWin: totalWin,
                totalGames: this.games.length,
                maxWin: maxWin
            };

        }

    }



    var masterModel = new MasterModel();

    var viewHeader = (name: string) => H2(name);

    var totalResult = (model: MasterModel) =>
    {
        var result = model.totalResult();

        return DIV(
            P("Total games: " + result.totalGames),
            P("Total spent: " + result.totalSpent),
            P("Max win: " + result.maxWin),
            P("Total win: " + result.totalWin)
            )
    }


    var masterView = (model: MasterModel) =>
        DIV(


            STYLE({ type: "text/css" },
                CSS("#leftContent", { width: "50%", float: "left" }),
                CSS("#rightContent", { width: "50%", float: "left" })
                ),

            DIV({ id: "leftContent" },
                viewHeader("Games")),

            DIV({ id: "rightContent" },
                viewHeader("Total Result"),
                DIV(totalResult(model)),
                BUTTON("Add game")
                ),
                DIV({ id: "fromServer" }),
                DIV({ id: "remoteResults" })

        );


    var refreshTotalResult = (model: MasterModel) => {
        $("#rightContent div:first").html(
            totalResult(model)
        );
    }

    var masterController = (model: MasterModel, viewRenderer: ViewRenderer) =>
    {
        app.ws.bind('Sink.Read', (allElements) =>{
            $.each(allElements, (idx, element) => {

                model.remoteGames.push({
                    guid: element.Key,
                    maxWin: element.JSON.maxWin,
                    totalGames: element.JSON.totalGames,
                    totalSpent: element.JSON.totalSpent,
                    totalWin: element.JSON.totalWin
                });

            });
        });


        app.ws.bind('Sink.Create', (createdElement) =>{
            model.guid = createdElement.Key;
        });
        amplify.subscribe("remote", (results: IgameResult[]) => {
            $("#remoteResults").html(results.length.toString());
        });
        amplify.subscribe("ticketResult", () => {
            refreshTotalResult(model);
            var result = model.totalResult();
            if (model.remoteGames.length == 0) {
                app.ws.trigger('Sink.Read', { model: 'result' });
            }
            if (result.guid == null) {
                app.ws.trigger('Sink.Create', { Type: 'result', JSON: result });
            } else {
                app.ws.trigger('Sink.Update', { Key: result.guid, JSON: result });
            }

            app.ws.trigger('result', result);
        });

        app.ws.bind('result', function (result: IgameResult) {

            model.newRemoteResult(result);
            $("#fromServer").html(result.guid);

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
    export var masterViewRenderer = new ViewRenderer(masterView, masterModel, masterController);
}