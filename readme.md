#ViewRenderer.ts - an MVC approach with TypeScript

"I was inspired by the many good javascript frameworks out there so I made my own".

Not really. This is a _very simple_ approach building client side functionality MVC style with typescript. It boils down to the three MVC components:

* The model : a TypeScript class or a plain javascript model.
* The view : a function that returns html.
* The controller : a controllerbindings-function that adds bindings to the DOM. Can be router events, pubsub publishs, clicks or whatever you like.

The components are tied together with a ViewRenderer class. Which takes the components as parameters and has a render function which renders the view on a given jQuery element.

The ViewRenderer is the only code that is my own here. And it is about 25 lines of code. The ViewRenderer is not 
dependent on it, but the thing that got me inspired to write this, and what really makes this useful is the nice 
and minimalistic Dom-o Html helper by jed, which I use in the sample to create my markup (my views).

To get structure in the application, the components can for example be spread across different files (asp net mvc style) or bound together in TypeScript modules.

In the simple sample they are in two modules, "masterModule2 and "personModule".

In app.ts I render my two views, here's how the rendering of the master view looks like:

masterModule.masterViewRenderer.$el = $("body");
masterModule.masterViewRenderer.render()

The masterModule looks like this:

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
				DIV({ id: model.subViewName }));

		export var masterViewRenderer = new ViewRenderer(masterView, masterModel);

	}

The personModule uses controllerBindings to handle some user interaction:

    var personControllerBindings = (model: PersonModel, viewRenderer:ViewRenderer) => {

        $("#button1").on("click", () => {
            model.firstName = $("#firstname").val();
            model.secondName = $("#secondname").val();
            viewRenderer.render();
        });
    };


