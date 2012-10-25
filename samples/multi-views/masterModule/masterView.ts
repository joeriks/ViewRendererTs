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
            P("Total win: " + result.totalWin),
            P("Percentage win: " + Math.round(result.totalWin*100/result.totalSpent).toString() + "%")
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
                viewHeader("Swedish Triss lottery win simulator"),
                P("This is using a randomizer and actual statistics for Swedish Triss lottery. One of their advertising slogans is 'suddenly it happens'. This simulator might show just how sudden you can expect it to happen... It is bad odds, only half the money goes back to the lottery buyers. And the chance of winning big is microscopic. Still it's really popular. ",
                A(
                    { href: "https://svenskaspel.se/img/pdf/Triss-vinstplan-ordinarie_0903.pdf" }, "Triss lottery statistics")),
                P("The tech side of this is I wanted to write a client side application using the MVC pattern but without any pre-made MVC framework. I wrote it using TypeScript. You can find the code at ", 
                    A({ href:"https://github.com/joeriks/viewrendererts" },"github")),
                P("Techs used: typescript, jquery, amplifyjs, dom-o, ", 
                    A({href : "http://live.xsockets.net"},"live.xsockets.net")
                ),
                H3("Total results"),
                BUTTON({ id: "addgame", style: "display:none;" }, "Add game"),
                DIV(totalResult(model)),
                H3("Hi-score list (results from all players)"),
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