var masterModule;
(function (masterModule) {
    var MasterModel = (function () {
        function MasterModel() { }
        return MasterModel;
    })();    
    var masterModel = new MasterModel();
    masterModel.subViewName = "personView";
    var masterView = function (model) {
        return DIV(STYLE({
            type: "text/css"
        }, CSS("h2.viewHeader", {
            color: "#cdcdcd"
        })), H1("Sample MVC"), P("Rendered at time : " + new Date()), DIV({
            id: model.subViewName
        }));
    };
    var draw = function () {
        var paper = Raphael(10, 150, 320, 200);
        paper.text(155, 10, "Some text");
        var circle = paper.circle(50, 40, 10);
        circle.attr("fill", "#f00");
        circle.attr("stroke", "#fff");
        var anim = Raphael.animation({
            cx: 100,
            cy: 200
        }, 2000);
        var anim2 = Raphael.animation({
            cx: 50,
            cy: 40
        }, 2000);
        circle.click(function () {
            circle.animate(anim);
            circle.animate(anim2.delay(1500));
            console.log(circle.getBBox().x2);
        });
    };
    var controller = function () {
        draw();
    };
    masterModule.masterViewRenderer = new ViewRenderer(masterView, masterModel, controller);
})(masterModule || (masterModule = {}));

