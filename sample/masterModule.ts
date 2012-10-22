/// <reference path="ref.ts"/>

module masterModule {

    class MasterModel {
        subViewName: string;
    }

    var masterModel = new MasterModel();
    masterModel.subViewName = "personView";

    var masterView = (model: MasterModel) =>
            DIV(
            
                STYLE({ type: "text/css" }, 
                    CSS("h2.viewHeader", { color: "#cdcdcd" })),
            
                H1("Sample MVC"),
                commonViewControls.viewHeader("Master View"),
                P("Rendered at time : " + new Date()),
                DIV({ id: model.subViewName }));

    export var masterViewRenderer = new ViewRenderer(masterView, masterModel);

}