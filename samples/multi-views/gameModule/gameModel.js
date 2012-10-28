var gameModule;
(function (gameModule) {
    var GameModel = (function () {
        function GameModel(lottery) {
            this.boughtTickets = 0;
            this.autoBuyIntervalId = null;
            this.wonMoney = 0;
            this.lottery = lottery;
            this.lastTicketResult = "";
            this.lastTicketWin = 0;
            this.maxWin = 0;
        }
        GameModel.prototype.buyTicket = function () {
            this.boughtTickets += 1;
            var totalTickets = this.lottery.winMatrix[0].fromTicketNumber + this.lottery.winMatrix[0].totalTickets;
            var random = Math.floor((Math.random() * totalTickets));
            var win = 0;
            for(var idx in this.lottery.winMatrix) {
                var elem = this.lottery.winMatrix[idx];
                if(random >= elem.fromTicketNumber) {
                    win = elem.winAmount;
                    break;
                }
            }
            if(win > 0) {
                this.lastTicketResult = "Win " + win;
                this.wonMoney += win;
                if(win > this.maxWin) {
                    this.maxWin = win;
                }
            } else {
                this.lastTicketResult = "No win";
            }
            this.lastTicketWin = win;
            app.localPublish("ticketResult", this);
            return win;
        };
        GameModel.prototype.result = function () {
            return this.wonMoney - this.spentMoney();
        };
        GameModel.prototype.spentMoney = function () {
            return this.boughtTickets * this.lottery.lotteryPrice;
        };
        return GameModel;
    })();
    gameModule.GameModel = GameModel;    
})(gameModule || (gameModule = {}));

