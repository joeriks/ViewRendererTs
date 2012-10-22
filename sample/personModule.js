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
    var personView = function (model) {
        return DIV(LABEL("First name: "), INPUT({
            id: "firstname",
            value: model.firstName
        }), BR(), LABEL("Second name: "), INPUT({
            id: "secondname",
            value: model.secondName
        }), BR(), BUTTON({
            id: "button1"
        }), BR(), P(STRONG("Hello : " + model.fullName())));
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

