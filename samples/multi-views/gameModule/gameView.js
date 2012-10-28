var gameModule;
(function (gameModule) {
    var gameBox = function (contents) {
        return DIV(contents);
    };
    var alert = function (model) {
        var divclass = "alert " + ((model.lastTicketWin == 0) ? "alert-error" : "alert-success");
        return DIV({
            "class": divclass,
            style: "margin-bottom:0px;"
        }, STRONG(model.lastTicketResult));
    };
    gameModule.gameView = function (model) {
        return gameBox(DIV(TABLE({
            class: "table table-bordered"
        }, TR(TD(BUTTON({
            class: "btn"
        }, "Get me another lottery ticket")), TD(LABEL(" Auto buy ", (model.autoBuyIntervalId != null) ? INPUT({
            type: "checkbox",
            checked: "checked"
        }) : INPUT({
            type: "checkbox"
        })))), TR(TH("Last ticket : "), TD(alert(model))), TR(TH("Spent money : "), TD({
            style: "text-align:right;"
        }, model.spentMoney())), TR(TH("Max win : "), TD({
            style: "text-align:right;"
        }, model.maxWin)), TR(TH("Won money : "), TD({
            style: "text-align:right;"
        }, model.wonMoney)), TR(TH("Result : "), TD({
            style: "text-align:right;"
        }, model.result())))));
    };
})(gameModule || (gameModule = {}));

