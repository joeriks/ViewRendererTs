/// <reference path="ref.ts"/>
module gameModule {

    interface IWinMatrix {

        fromTicketNumber: number;
        totalTickets: number;
        winAmount: number;

    }
    export class GameModel {

        boughtTickets: number;
        wonMoney: number;
        lastTicketResult: string;
        lastTicketWin: number;
        maxWin: number;
        winMatrix: IWinMatrix[];

        ticketPrice: number;
        constructor (ticketPrice: number) {

            this.boughtTickets = 0;
            this.wonMoney = 0;
            this.ticketPrice = ticketPrice;
            this.lastTicketResult = "";
            this.lastTicketWin = 0;
            this.maxWin = 0;
            this.winMatrix = [{
                fromTicketNumber: 9,
                totalTickets: 1,
                winAmount: 150
            },
            {
                fromTicketNumber: 7,
                totalTickets: 2,
                winAmount: 50
            }];
        }

        buyTicket() {

            this.boughtTickets += 1;

            var totalTickets = this.winMatrix[0].fromTicketNumber + this.winMatrix[0].totalTickets;
            var random = Math.floor((Math.random() * totalTickets));

            var win = 0;
            for (var idx in this.winMatrix) {
                var elem = this.winMatrix[idx];
                if (random >= elem.fromTicketNumber) {

                    win = elem.winAmount;
                    break;

                }

            }

            if (win > 0) {

                this.lastTicketResult = "Win " + win;
                this.wonMoney += win;
                if (win > this.maxWin) this.maxWin = win;
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
            P("Max win : ", SPAN(model.maxWin)),
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