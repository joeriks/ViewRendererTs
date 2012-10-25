/// <reference path="../ref.ts"/>
/// <reference path="../app.ts"/>

module masterModule {


    var viewHeader = (name: string) => H2(name);

    export var totalResult = (model: MasterModel) =>
    {
        var result = model.totalResult();

        return DIV(
            P("Total games: " + result.totalGames),
            P("Total spent: " + result.totalSpent),
            P("Max win: " + result.maxWin),
            P("Total win: " + result.totalWin)
            )
    }

    export var masterView = (model: MasterModel) =>
        DIV(


            STYLE({ type: "text/css" },
                CSS("#leftContent", { width: "50%", float: "left" }),
                CSS("#rightContent", { width: "50%", float: "right" }),
                CSS("p", { "margin-top": "0px", "margin-bottom": "0px" })),

            DIV({ id: "leftContent" },
                viewHeader("Games")),

            DIV({ id: "rightContent" },
                viewHeader("Total Result"),
                H3("Using actual lottery statistics for Swedish Triss lottery = bad odds"),
                DIV(totalResult(model)),
                BUTTON({ id: "addgame", style: "display:none;" }, "Add game"),
                DIV({ id: "fromServer" }),
                DIV({ id: "remoteResults" }, "Communicating with server...")
                )

        );


    export var refreshTotalResult = (model: MasterModel) => {
        $("#rightContent div:first").html(
            totalResult(model)
        );
    }

}