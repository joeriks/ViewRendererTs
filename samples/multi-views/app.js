var app;
(function (app) {
    app.localPublish = amplify.publish;
    app.localSubscribe = amplify.subscribe;
    $(function () {
        masterModule.masterViewRenderer.render($("body"));
    });
})(app || (app = {}));

