var gameModule;
(function (gameModule) {
    gameModule.gameController = function (model, viewRenderer) {
        viewRenderer.$el.find("input").on("change", function (s) {
            if(s.target.checked) {
                model.autoBuyIntervalId = setInterval(function () {
                    model.buyTicket();
                    viewRenderer.render();
                }, 1000);
            } else {
                clearInterval(model.autoBuyIntervalId);
                model.autoBuyIntervalId = null;
            }
        });
        viewRenderer.$el.find("button").on("click", function () {
            model.buyTicket();
            viewRenderer.render();
        });
    };
})(gameModule || (gameModule = {}));

