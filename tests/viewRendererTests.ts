/// <reference path="../libs/jasmine.d.ts"/>
/// <reference path="../src/viewRenderer.ts"/>
describe("basic tests", () => {

    var model = { value: "value" };
    var view = (model: any) => {
        return "<h1>" + model.value + "</h1>";
    }

    var r = new ViewRenderer(view, model);

    it("can render a view", () => {
        var result = r.render();
        expect(result.renderedView).toBe("<h1>value</h1>");
    });

    it("model change should change render result", () => {
        model.value = "value 2";
        var result = r.render();
        expect(result.renderedView).toBe("<h1>value 2</h1>");
    });

});