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
        autoBuyIntervalId: number;

        ticketPrice: number;
        constructor (ticketPrice: number) {

            this.boughtTickets = 0;
            this.autoBuyIntervalId = null;
            this.wonMoney = 0;
            this.ticketPrice = ticketPrice;
            this.lastTicketResult = "";
            this.lastTicketWin = 0;
            this.maxWin = 0;
            this.winMatrix = [
                { fromTicketNumber: 1999999, totalTickets: 1, winAmount: 2765000 },
                { fromTicketNumber: 1999998, totalTickets: 1, winAmount: 1000000 },
                { fromTicketNumber: 1999993, totalTickets: 5, winAmount: 265000 },
                { fromTicketNumber: 1999992, totalTickets: 1, winAmount: 200000 },
                { fromTicketNumber: 1999990, totalTickets: 2, winAmount: 100000 },
                { fromTicketNumber: 1999988, totalTickets: 2, winAmount: 20000 },
                { fromTicketNumber: 1999948, totalTickets: 40, winAmount: 10000 },
                { fromTicketNumber: 1999918, totalTickets: 30, winAmount: 5000 },
                { fromTicketNumber: 1999848, totalTickets: 70, winAmount: 2000 },
                { fromTicketNumber: 1999768, totalTickets: 80, winAmount: 1500 },
                { fromTicketNumber: 1999603, totalTickets: 165, winAmount: 1000 },
                { fromTicketNumber: 1999503, totalTickets: 100, winAmount: 900 },
                { fromTicketNumber: 1999303, totalTickets: 200, winAmount: 600 },
                { fromTicketNumber: 1998993, totalTickets: 310, winAmount: 500 },
                { fromTicketNumber: 1998043, totalTickets: 950, winAmount: 300 },
                { fromTicketNumber: 1996843, totalTickets: 1200, winAmount: 180 },
                { fromTicketNumber: 1993083, totalTickets: 3760, winAmount: 150 },
                { fromTicketNumber: 1985883, totalTickets: 7200, winAmount: 120 },
                { fromTicketNumber: 1956083, totalTickets: 29800, winAmount: 90 },
                { fromTicketNumber: 1747283, totalTickets: 208800, winAmount: 60 },
                { fromTicketNumber: 1567583, totalTickets: 179700, winAmount: 30 }
            ];
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

    var gameController = (model: GameModel, viewRenderer: ViewRenderer) =>
    {

        viewRenderer.$el.find("input").on("change", (s) => {
            if (s.target.checked) {
                model.autoBuyIntervalId = setInterval(() => {
                    model.buyTicket();
                    viewRenderer.render();
                }, 1000);
            } else {
                clearInterval(model.autoBuyIntervalId);
                model.autoBuyIntervalId = null;
            }
        });

        viewRenderer.$el.find("button").on("click", () => {

            model.buyTicket();
            viewRenderer.render();

        });
    }

    export class GameRenderer extends ViewRenderer {

        constructor () {

            var gameModel = new GameModel(30);
            super(gameView, gameModel, gameController);

        }

    }

}