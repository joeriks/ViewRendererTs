/// <reference path="ref.ts"/>

module personModule {

    class PersonModel {
        firstName: string;
        secondName: string;
        fullName() {
            return this.firstName + " " + this.secondName;
        }
    }

    var personModel = new PersonModel();
    personModel.firstName = "Foo";
    personModel.secondName = "Bar";

    var personView = (model: PersonModel) =>
        DIV(
            LABEL("First name: "),
            INPUT({ id: "firstname", value: model.firstName }),
            BR(),
            LABEL("Second name: "),
            INPUT({ id: "secondname", value: model.secondName }),
            BR(),
            BUTTON({ id: "button1" }),
            BR(),
            P(
                STRONG("Hello : " +
                model.fullName()))
            );

    var personControllerBindings = (model: PersonModel, viewRenderer:ViewRenderer) => {

        $("#button1").on("click", () => {
            model.firstName = $("#firstname").val();
            model.secondName = $("#secondname").val();
            viewRenderer.render();
        });
    };
    export var personViewRenderer = new ViewRenderer(personView, personModel, personControllerBindings);

}