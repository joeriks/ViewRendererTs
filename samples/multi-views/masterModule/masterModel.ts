/// <reference path="../ref.ts"/>
/// <reference path="../gameModule/gameModule.ts"/>
/// <reference path="../app.ts"/>

module masterModule {

    export interface IgameResult {
        guid: string;
        totalSpent: number;
        totalWin: number;
        totalGames: number;
        maxWin: number;
    }
    export class MasterModel {
        games: gameModule.GameRenderer[];
        guid: string;
        remoteGames: IgameResult[];
        constructor () {
            this.games = [];
            this.remoteGames = [];
        }

        newRemoteResult(remoteResult: IgameResult) {
            if (this.remoteGames.length > 0) {
                var found = false;
                $.each(this.remoteGames, (idx, element) => {

                    if (element.guid == remoteResult.guid) {
                        this.remoteGames[idx] = remoteResult;
                        found = true;
                    }
                });
                if (!found) {
                    this.remoteGames.push(remoteResult);
                }
                app.localPublish("remote", this.remoteGames);
            }
        }

        totalResult(): IgameResult {

            var totalSpent = 0;
            var totalWin = 0;
            var maxWin = 0;

            $.each(this.games, (idx, elem: gameModule.GameRenderer) =>{
                totalSpent = totalSpent + elem.model.spentMoney();
                totalWin = totalWin + elem.model.wonMoney;
                if (elem.model.maxWin > maxWin) maxWin = elem.model.maxWin;
            });
            return {
                guid: this.guid,
                totalSpent: totalSpent,
                totalWin: totalWin,
                totalGames: this.games.length,
                maxWin: maxWin
            };

        }

    }



}