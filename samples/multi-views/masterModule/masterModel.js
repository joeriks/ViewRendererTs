var masterModule;
(function (masterModule) {
    function GUID() {
        var S4 = function () {
            return Math.floor(Math.random() * 65536).toString(16);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    var MasterModel = (function () {
        function MasterModel() {
            this.games = [];
            this.remoteGames = [];
            if(!xSocketsModule.enableSink) {
                this.guid = GUID();
            }
        }
        MasterModel.prototype.newRemoteResult = function (remoteResult) {
            var found = $.grep(this.remoteGames, function (item) {
                return item.guid == remoteResult.guid;
            }, false);
            if(found.length > 0) {
                found[0] = remoteResult;
            } else {
                this.remoteGames.push(remoteResult);
            }
            app.localPublish("remote", this.remoteGames);
        };
        MasterModel.prototype.totalResult = function () {
            var totalSpent = 0;
            var totalWin = 0;
            var maxWin = 0;
            $.each(this.games, function (idx, elem) {
                totalSpent = totalSpent + elem.model.spentMoney();
                totalWin = totalWin + elem.model.wonMoney;
                if(elem.model.maxWin > maxWin) {
                    maxWin = elem.model.maxWin;
                }
            });
            return {
                guid: this.guid,
                totalSpent: totalSpent,
                totalWin: totalWin,
                totalGames: this.games.length,
                maxWin: maxWin
            };
        };
        return MasterModel;
    })();
    masterModule.MasterModel = MasterModel;    
})(masterModule || (masterModule = {}));

