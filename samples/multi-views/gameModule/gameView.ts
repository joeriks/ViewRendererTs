/// <reference path="../ref.ts"/>
module gameModule {
    var gameBox = (contents: any) =>

    DIV(

        H3("Another game"),
        contents

    );

    export var gameView = (model: GameModel) =>

        gameBox(
        DIV(
            P("Spent money : ", SPAN(model.spentMoney()),
            P("Max win : ", SPAN(model.maxWin)),
            P("Won money : ", SPAN(model.wonMoney)),
            P("Result : ", SPAN(model.result()),
            DIV(
                BUTTON("Get me another lottery ticket")),
            DIV(
            (model.autoBuyIntervalId != null) ?
                INPUT({ type: "checkbox", checked: "checked" }) :
                INPUT({ type: "checkbox" }),
                LABEL("Auto buy")),
            DIV(
                SPAN(model.lastTicketResult)
                ))
            )
        ))

}