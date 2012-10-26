describe("basic tests", function () {
    var model = {
        value: "value"
    };
    var view = function (model) {
        return "<h1>" + model.value + "</h1>";
    };
    var r = new ViewRenderer(view, model);
    it("can render a view", function () {
        var result = r.render();
        expect(result.renderedView).toBe("<h1>value</h1>");
    });
    it("model change should change render result", function () {
        model.value = "value 2";
        var result = r.render();
        expect(result.renderedView).toBe("<h1>value 2</h1>");
    });
});
