/// <reference path="ref.ts"/>
module gameModule {

    export class GameModel {

        boughtTickets: number;
        wonMoney: number;
        lastTicketResult: string;
        lastTicketWin: number;

        ticketPrice: number;
        constructor (ticketPrice: number) {

            this.boughtTickets = 0;
            this.wonMoney = 0;
            this.ticketPrice = ticketPrice;
            this.lastTicketResult = "";
            this.lastTicketWin = 0;
        }

        buyTicket() {

            this.boughtTickets += 1;

            var random = Math.floor((Math.random() * 10) + 1);

            var win = 0;

            if (random > 5) {

                win = this.ticketPrice * 2;
                this.lastTicketResult = "Win " + win;
                this.wonMoney += win;
            }
            else {

                this.lastTicketResult = "No win";
            }
            this.lastTicketWin = win;

            amplify.publish("ticketResult", this);

            return win;
        }

        result() {

            return this.wonMoney - this.spentMoney();

        }

        spentMoney() {

            return this.boughtTickets * this.ticketPrice;

        }
    }

    var gameBox = (contents: any) =>

        DIV(

            H3("Another game"),
            contents

        );

    var gameView = (model: GameModel) =>

        gameBox(
        DIV(
            P("Spent money : ", SPAN(model.spentMoney()),
            P("Won money : ", SPAN(model.wonMoney)),
            P("Result : ", SPAN(model.result()),
            DIV(
                BUTTON("Get me another lottery ticket"),
                SPAN(model.lastTicketResult)
                )
            )
        )))

    var gameController = (model: GameModel, viewRenderer: ViewRenderer) =>

        viewRenderer.$el.find("button").on("click", () => {

            model.buyTicket();
            viewRenderer.render();

    });


    export class GameRenderer extends ViewRenderer {

        constructor () {

            var gameModel = new GameModel(25);
            super(gameView, gameModel, gameController);

        }

    }

}