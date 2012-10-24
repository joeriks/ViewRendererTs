/// <reference path="../ref.ts"/>
/// <reference path="../gameModule/gameModule.ts"/>
/// <reference path="../app.ts"/>
var masterModule;
(function (masterModule) {
    var MasterModel = (function () {
        function MasterModel() {
            this.games = [];
            this.remoteGames = [];
        }
        MasterModel.prototype.newRemoteResult = function (remoteResult) {
            var _this = this;
            if(this.remoteGames.length > 0) {
                var found = false;
                $.each(this.remoteGames, function (idx, element) {
                    if(element.guid == remoteResult.guid) {
                        _this.remoteGames[idx] = remoteResult;
                        found = true;
                    }
                });
                if(!found) {
                    this.remoteGames.push(remoteResult);
                }
                amplify.publish("remote", this.remoteGames);
            }
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

