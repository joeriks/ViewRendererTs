var lotteryModule;
(function (lotteryModule) {
    var Lottery = (function () {
        function Lottery() {
            this.winMatrix = [];
            this.lotteryPrice = 0;
        }
        return Lottery;
    })();
    lotteryModule.Lottery = Lottery;    
})(lotteryModule || (lotteryModule = {}));

