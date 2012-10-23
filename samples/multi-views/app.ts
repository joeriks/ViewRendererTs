/// <reference path="masterModule.ts"/>

// setup masterview to use body as container

$(() => {
    masterModule.masterViewRenderer.$el = $("body");
    masterModule.masterViewRenderer.render();
});