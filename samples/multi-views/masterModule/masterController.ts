/// <reference path="../ref.ts"/>
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
            app.localPublish("remote", model.remoteGames);
        });

        app.ws.bind('Sink.Create', (createdElement) =>{
            model.guid = createdElement.Key;
        });

        app.localSubscribe("remote", (results: IgameResult[]) => {
            var html = "";
            results.sort((a, b) =>{ return (a.totalSpent - a.totalWin) - (b.totalSpent - b.totalWin) });
            $.each(results, (idx, elem) =>{
                var position = idx + 1;
                if (elem.guid == model.guid) {
                    html += "<p><strong>" + position + ". Result: " + (elem.totalWin - elem.totalSpent).toString() + " Spent: " + elem.totalSpent.toString() + " Won: " + elem.totalWin.toString() + " max win:" + elem.maxWin.toString() + "</strong></p>";
                } else {
                    html += "<p>" + position + ". Result: " + (elem.totalWin - elem.totalSpent).toString() + " Spent: " + elem.totalSpent.toString() + " Won: " + elem.totalWin.toString() + " max win:" + elem.maxWin.toString() + "</p>";
                }
            });
            $("#remoteResults").html(html);
        });

        $(() =>
            setTimeout(() => {

                app.ws.trigger('Sink.Read', {
                    model: 'result-triss'
                });
                $("#addgame").show();

            }
            , 2000));

        app.localSubscribe("ticketResult", () => {
            refreshTotalResult(model);
            var result = model.totalResult();
            if (result.guid == null) {
                app.ws.trigger('Sink.Create', { Type: 'result-triss', JSON: result });
            } else {
                app.ws.trigger('Sink.Update', { Key: result.guid, JSON: result });
            }

            app.ws.trigger('result', result);
        });

        app.ws.bind('result', function (result: IgameResult) {

            model.newRemoteResult(result);

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