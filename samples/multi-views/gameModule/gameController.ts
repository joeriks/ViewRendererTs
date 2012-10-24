/// <reference path="../ref.ts"/> 

module gameModule {

    export var gameController = (model: GameModel, viewRenderer: ViewRenderer) =>
    {

        viewRenderer.$el.find("input").on("change", (s) => {
            if (s.target.checked) {
                model.autoBuyIntervalId = setInterval(() => {
                    model.buyTicket();
                    viewRenderer.render();
                }, 1000);
            } else {
                clearInterval(model.autoBuyIntervalId);
                model.autoBuyIntervalId = null;
            }
        });

        viewRenderer.$el.find("button").on("click", () => {

            model.buyTicket();
            viewRenderer.render();

        });
    }


}