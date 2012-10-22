﻿/// <reference path="ref.ts"/>

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

    var inputControl = (label: string, id: string, value:()=> string) =>

        DIV(LABEL(label + ": "),
        INPUT({ id: id, value: value() }),
        BR());

    var personView = (model: PersonModel) =>
        DIV(
            inputControl("First name", "firstname", () =>model.firstName),
            inputControl("Second name", "secondname", () =>model.secondName),
            BUTTON({ id: "button1" }),
            BR(),
            P(
                STRONG("Hello : " +
                model.fullName()))
            );

    var personControllerBindings = (model: PersonModel, viewRenderer: ViewRenderer) => {

        $("#button1").on("click", () => {
            model.firstName = $("#firstname").val();
            model.secondName = $("#secondname").val();
            viewRenderer.render();
        });
    };
    export var personViewRenderer = new ViewRenderer(personView, personModel, personControllerBindings);

}