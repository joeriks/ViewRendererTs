/// <reference path="../ref.ts"/>
/// <reference path="../app.ts"/>
var masterModule;
(function (masterModule) {
    var viewHeader = function (name) {
        return H2(name);
    };
    masterModule.totalResult = function (model) {
        var result = model.totalResult();
        return TABLE({
            class: "table table-bordered"
        }, TR(TH("Total games: "), TD({
            style: "text-align:right;"
        }, result.totalGames)), TR(TH("Total spent: "), TD({
            style: "text-align:right;"
        }, result.totalSpent)), TR(TH("Max win: "), TD({
            style: "text-align:right;"
        }, result.maxWin)), TR(TH("Total win: "), TD({
            style: "text-align:right;"
        }, result.totalWin)), TR(TH("Percentage win: "), TD({
            style: "text-align:right;"
        }, Math.round(result.totalWin * 100 / result.totalSpent).toString() + "%")));
    };
    masterModule.masterView = function (model) {
        return DIV({
            class: "container"
        }, DIV({
            class: "row"
        }, STYLE({
            type: "text/css"
        }, CSS("p", {
            "margin-top": "0px",
            "margin-bottom": "0px"
        })), DIV({
            id: "leftContent",
            class: "span6"
        }, viewHeader("Games")), DIV({
            id: "rightContent",
            class: "span6"
        }, viewHeader("Swedish Triss lottery win simulator"), P("This is using a randomizer and actual statistics for Swedish Triss lottery. One of their advertising slogans is 'suddenly it happens'. This simulator might show just how sudden you can expect it to happen... It is bad odds, only half the money goes back to the lottery buyers, and as much as 20% of the win money goes to the 10 biggest wins. And the chance of winning big is microscopic. Have fun! :) ", A({
            href: "https://svenskaspel.se/img/pdf/Triss-vinstplan-ordinarie_0903.pdf"
        }, "Triss lottery statistics")), P("The tech side of this is I wanted to write a client side application using the MVC pattern but without any pre-made MVC framework. I wrote it using TypeScript. You can find the code at ", A({
            href: "https://github.com/joeriks/viewrendererts"
        }, "github")), P("Techs used: typescript, jquery, amplifyjs, dom-o, ", A({
            href: "http://live.xsockets.net"
        }, "live.xsockets.net")), H3("Total results"), TABLE({
            class: "table table-bordered"
        }, TR(TD({
            "colspan": 2
        }, BUTTON({
            id: "addgame",
            style: "display:none;",
            class: "btn"
        }, "Add game")))), DIV(masterModule.totalResult(model)), H3("Hi-score list (results from all players)"), DIV({
            id: "fromServer"
        }), DIV({
            id: "remoteResults"
        }, "Communicating with server..."))));
    };
    masterModule.refreshTotalResult = function (model) {
        $("#rightContent div:first").html(masterModule.totalResult(model));
    };
})(masterModule || (masterModule = {}));

