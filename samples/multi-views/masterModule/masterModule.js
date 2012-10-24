/// <reference path="../ref.ts"/>
/// <reference path="../gameModule/gameModule.ts"/>
/// <reference path="../app.ts"/>
/// <reference path="masterModel.ts"/>
/// <reference path="masterController.ts"/>
/// <reference path="masterView.ts"/>
var masterModule;
(function (masterModule) {
    masterModule.masterModel = new masterModule.MasterModel();
    masterModule.masterViewRenderer = new ViewRenderer(masterModule.masterView, masterModule.masterModel, masterModule.masterController);
})(masterModule || (masterModule = {}));

