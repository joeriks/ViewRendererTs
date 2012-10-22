#ViewRenderer.ts - an MVC approach with TypeScript

"I was inspired by the many good javascript frameworks out there so I made my own".

Not really. This is a _very simple_ playful & experimental approach building client side functionality MVC style with typescript. It boils down to the three MVC components:

* The model : a TypeScript class or a plain javascript model.
* The view : a function that returns html.
* The controller : a controllerbindings-function that adds bindings to the DOM. Can be router events, pubsub publishs, clicks or whatever you like.

The components are tied together with a ViewRenderer class (25 lines of code). It takes the mentioned components as parameters and has a render function which renders the view on a given jQuery element.

## Small dependencies
So the the ViewRenderer is the only code that is my own here. Other than that I use jQuery and the minimalistic Html-builder Dom-O in my sample to get a really nice DOM-experience. 

Dom-O by jed is the thing that got me inspired to write this, and what really makes this interesting since it's possible to write dynamic views in good looking and pure ts/js with it. Yep, no external templating whatsoever.

## Structure
To get structure in the application, the components can for example be spread across different files (asp net mvc style) or bound together in TypeScript modules. In the sample I use the latter approach.

## The sample
In the simple sample I've got two modules, "masterModule" and "personModule".

The masterModule looks like this and shows how the the Module and the View are bound together with a viewrenderer:

	module masterModule {

		class MasterModel {
			subViewName: string;
		}

		var masterModel = new MasterModel();
		masterModel.subViewName = "personView";


		// here's how the view syntax look like with "Dom-o", build html with functions
		var masterView = (model: MasterModel) =>
			DIV(
				H1("Sample MVC"),
				P("Rendered at time : " + new Date()),
				DIV({ id: model.subViewName })
			);

		export var masterViewRenderer = new ViewRenderer(masterView, masterModel);

	}

Next step is to render the view to an element. I do that in my application module:

    // setup masterview to use body as container
    masterModule.masterViewRenderer.$el = $("body");
    masterModule.masterViewRenderer.render();

Note that the class instantiations take place inside the modules, and in the main module (app.ts) I just tell my existing views where they are going to be rendered. That is of course a matter of preference.

The personModule has a view and a model and also adds a controller (controllerbindings), to handle some user interaction:

    var personControllerBindings = (model: PersonModel, viewRenderer:ViewRenderer) => {

        $("#button1").on("click", () => {
            model.firstName = $("#firstname").val();
            model.secondName = $("#secondname").val();
            viewRenderer.render();
        });
    };

    export var personViewRenderer = new ViewRenderer(personView, personModel, personControllerBindings);

The fullName is a function within the module:

    class PersonModel {
        firstName: string;
        secondName: string;
        fullName() {
            return this.firstName + " " + this.secondName;
        }
    }

And the personView renders the input boxes as well as the full name to the view:

    P(
        STRONG("Hello : " +
        model.fullName()))
    );
