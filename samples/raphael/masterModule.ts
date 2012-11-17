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
                P("Rendered at time : " + new Date()),
                DIV({ id: model.subViewName }));


    var draw = () => {
    
        // Creates canvas 320 × 200 at 10, 50
        var paper = Raphael(10, 150, 320, 200);
        
        paper.text(155, 10, "Some text");

        // Creates circle at x = 50, y = 40, with radius 10
        var circle = paper.circle(50, 40, 10);
        // Sets the fill attribute of the circle to red (#f00)
        circle.attr("fill", "#f00");

        // Sets the stroke attribute of the circle to white
        circle.attr("stroke", "#fff");

        var anim = Raphael.animation({ cx: 100, cy: 200 }, 2e3);
        var anim2 = Raphael.animation({ cx: 50, cy: 40 }, 2e3);

        circle.click(() =>{
            circle.animate(anim); // run the given animation immediately
            circle.animate(anim2.delay(1500)); // run the given animation after 500 ms
            console.log(circle.getBBox().x2);
        });

    }

    var controller = () => {
        draw();
    }

    export var masterViewRenderer = new ViewRenderer(masterView, masterModel,controller);

}