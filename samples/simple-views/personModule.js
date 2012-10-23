/// <reference path="ref.ts"/>
var personModule;
(function (personModule) {
    // the person model
    var PersonModel = (function () {
        function PersonModel() {
            this.firstName = "";
            this.secondName = "";
        }
        PersonModel.prototype.fullName = function () {
            return this.firstName + " " + this.secondName;
        };
        return PersonModel;
    })();    
    var personModel = new PersonModel();
    // person view specific controls
    var inputControl = function (label, id, value) {
        return DIV(LABEL(label + ": "), INPUT({
            id: id,
            value: value()
        }));
    };
    var greeterControl = function (value) {
        return (value() != " ") ? P(STRONG("Hello : " + value())) : "";
    };
    // the person view
    var personView = function (model) {
        return DIV(commonViewControls.viewHeader("Person View"), DIV(inputControl("First name", "firstname", function () {
            return model.firstName;
        }), inputControl("Second name", "secondname", function () {
            return model.secondName;
        }), BUTTON({
            id: "button1"
        }, "Update")), greeterControl(function () {
            return model.fullName();
        }));
    };
    // the controller bindings
    var personControllerBindings = function (model, viewRenderer) {
        $("#button1").on("click", function () {
            model.firstName = $("#firstname").val();
            model.secondName = $("#secondname").val();
            viewRenderer.render();
        });
    };
    personModule.personViewRenderer = new ViewRenderer(personView, personModel, personControllerBindings);
})(personModule || (personModule = {}));

