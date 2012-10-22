/// <reference path="ref.ts"/>
var masterModule;
(function (masterModule) {
    var MasterModel = (function () {
        function MasterModel() { }
        return MasterModel;
    })();    
    var masterModel = new MasterModel();
    masterModel.subViewName = "personView";
    var masterView = function (model) {
        return DIV(H1("Sample MVC"), P("Rendered at time : " + new Date()), DIV({
            id: model.subViewName
        }));
    };
    masterModule.masterViewRenderer = new ViewRenderer(masterView, masterModel);
})(masterModule || (masterModule = {}));

