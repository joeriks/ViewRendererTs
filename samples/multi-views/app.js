/// <reference path="masterModule.ts"/>
// setup masterview to use body as container
$(function () {
    masterModule.masterViewRenderer.$el = $("body");
    masterModule.masterViewRenderer.render();
});
