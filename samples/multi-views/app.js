/// <reference path="masterModule/masterModule.ts"/>
var app;
(function (app) {
    // bootstrap
    app.localPublish = amplify.publish;
    app.localSubscribe = amplify.subscribe;
    $(function () {
        masterModule.masterViewRenderer.render($("body"));
    });
})(app || (app = {}));

