/// <reference path="ref.ts"/>
/// <reference path="gameModule.ts"/>
/// <reference path="app.ts"/>

module masterModule {
    function GUID() {
        var S4 = function () {
            return Math.floor(
                    Math.random() * 0x10000 /* 65536 */
                ).toString(16);
        };

        return (
                S4() + S4() + "-" +
                S4() + "-" +
                S4() + "-" +
                S4() + "-" +
                S4() + S4() + S4()
            );
    }

    export class MasterModel {
        games: gameModule.GameRenderer[];
        guid: string;

        constructor () {
            this.games = [];
            this.guid = GUID();
        }

        totalResult() {

            var totalSpent = 0;
            var totalWin = 0;

            $.each(this.games, (idx, elem: gameModule.GameRenderer) =>{
                totalSpent = totalSpent + elem.model.spentMoney();
                totalWin = totalWin + elem.model.wonMoney;
            });
            return {
                guid: this.guid,
                totalSpent: totalSpent,
                totalWin: totalWin,
                totalGames: this.games.length
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
                DIV({ id: "fromServer" })
        );


    var refreshTotalResult = (model: MasterModel) => {
        $("#rightContent div:first").html(
            totalResult(model)
        );
    }

    var masterController = (model: MasterModel, viewRenderer: ViewRenderer) =>

    {

        amplify.subscribe("ticketResult", () => {
            refreshTotalResult(model);
            var result = model.totalResult();
            app.ws.trigger('result', result);
        });

        app.ws.bind('result', function (result) {
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