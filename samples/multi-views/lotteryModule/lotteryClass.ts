module lotteryModule {

    export interface IWinMatrix {

        fromTicketNumber: number;
        totalTickets: number;
        winAmount: number;

    }


    export class Lottery {

        lotteryName: string;
        winMatrix: IWinMatrix[];
        lotteryPrice: number;
        constructor () {
            this.winMatrix = [];
            this.lotteryPrice = 0;
        }

    }

}