ViewRenderer.ts - an MVC approach with TypeScript

"I was inspired by the many good javascript frameworks out there so I made my own".

Not really. This is a simple approach building MVC style with typescript. It boils down to the three MVC components:

The model : a TypeScript class or a plain javascript model.

The view : a function that returns html.

The controller : a controllerbindings-function that adds bindings to the DOM. Can be router events, pubsub publishs, clicks or whatever you like.

The components are tied together with a ViewRenderer. Which takes the components as parameters and has a render function which renders the view on a given jQuery element.

To get structure in the application, the compnents can for example be spread across different files (asp net mvc style) or bound together in TypeScript modules.

In the simple sample they are in two modules, the masterModule and the personModule.

Here's what the main function looks like in app.ts:

masterModule.masterViewRenderer.$el = $("body");
masterModule.masterViewRenderer.render()

The masterModule looks like this:

	module masterModule {

		class MasterModel {
			subViewName: string;
		}

		var masterModel = new MasterModel();
		masterModel.subViewName = "personView";

		var masterView = (model: MasterModel) =>
				DIV(
				H1("Sample MVC"),
				P("Rendered at time : " + new Date()),
				DIV({ id: model.subViewName }));

		export var masterViewRenderer = new ViewRenderer(masterView, masterModel);

	}

The personModule uses controllerBindings to create some user interaction:

    var personControllerBindings = (model: PersonModel, viewRenderer:ViewRenderer) => {

        $("#button1").on("click", () => {
            model.firstName = $("#firstname").val();
            model.secondName = $("#secondname").val();
            viewRenderer.render();
        });
    };


In the sample I use the nice and minimalistic Dom-o Html helper by jed to create the markup.