/// <reference path="ref.ts"/>

module personModule {

    // the person model

    class PersonModel {
        firstName: string;
        secondName: string;
        constructor () {
            this.firstName = "";
            this.secondName = "";
        }
        fullName() {
            return this.firstName + " " + this.secondName;
        }
    }

    var personModel = new PersonModel();
    

    // person view specific controls

    var inputControl = (label: string, id: string, value: () => string) =>

        DIV(
            LABEL(label + ": "),
            INPUT({ id: id, value: value() }))


    var greeterControl = (value: () => string) => 

        (value() != " ") ? P(STRONG("Hello : " + value())) : "";

    
    // the person view
    
    var personView = (model: PersonModel) =>

        DIV(
            commonViewControls.viewHeader("Person View"),
            DIV(
                inputControl("First name", "firstname", () =>model.firstName),
                inputControl("Second name", "secondname", () =>model.secondName),
                BUTTON({ id: "button1" },"Update")),           
                greeterControl(() =>model.fullName()));


    // the controller bindings

    var personControllerBindings = (model: PersonModel, viewRenderer: ViewRenderer) => {

        $("#button1").on("click", () => {
            model.firstName = $("#firstname").val();
            model.secondName = $("#secondname").val();
            viewRenderer.render();
        });
    };

    export var personViewRenderer = new ViewRenderer(personView, personModel, personControllerBindings);

}