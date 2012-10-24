/// <reference path="../ref.ts"/>
/// <reference path="../gameModule/gameModule.ts"/>
/// <reference path="../app.ts"/>

/// <reference path="masterModel.ts"/>
/// <reference path="masterController.ts"/>
/// <reference path="masterView.ts"/>

module masterModule {

    export var masterModel = new MasterModel();
    export var masterViewRenderer = new ViewRenderer(masterView, masterModel, masterController);
}