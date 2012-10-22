/// <reference path="ref.ts"/>
var personModule;
(function (personModule) {
    var PersonModel = (function () {
        function PersonModel() { }
        PersonModel.prototype.fullName = function () {
            return this.firstName + " " + this.secondName;
        };
        return PersonModel;
    })();    
    var personModel = new PersonModel();
    personModel.firstName = "Foo";
    personModel.secondName = "Bar";
    var inputControl = function (label, id, value) {
        return DIV(LABEL(label + ": "), INPUT({
            id: id,
            value: value()
        }));
    };
    var personView = function (model) {
        return DIV(DIV(inputControl("First name", "firstname", function () {
            return model.firstName;
        }), inputControl("Second name", "secondname", function () {
            return model.secondName;
        }), BUTTON({
            id: "button1"
        }, "Update")), P(STRONG("Hello : " + model.fullName())));
    };
    var personControllerBindings = function (model, viewRenderer) {
        $("#button1").on("click", function () {
            model.firstName = $("#firstname").val();
            model.secondName = $("#secondname").val();
            viewRenderer.render();
        });
    };
    personModule.personViewRenderer = new ViewRenderer(personView, personModel, personControllerBindings);
})(personModule || (personModule = {}));

