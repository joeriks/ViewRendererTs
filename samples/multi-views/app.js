/// <reference path="masterModule/masterModule.ts"/>
var app;
(function (app) {
    // bootstrap
    app.wsSettings = {
        apikey: '1de968d1-b06e-4054-abc5-c1ba167d2c29'
    };
    app.ws;
    app.localPublish = amplify.publish;
    app.localSubscribe = amplify.subscribe;
    $(function () {
        masterModule.masterViewRenderer.render($("body"));
    });
})(app || (app = {}));

