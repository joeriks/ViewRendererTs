var masterModule;
(function (masterModule) {
    masterModule.masterModel = new masterModule.MasterModel();
    masterModule.masterViewRenderer = new ViewRenderer(masterModule.masterView, masterModule.masterModel, masterModule.masterController);
})(masterModule || (masterModule = {}));

