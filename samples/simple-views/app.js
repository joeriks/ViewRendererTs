/// <reference path="masterModule.ts"/>
/// <reference path="personModule.ts"/>
// setup masterview to use body as container
masterModule.masterViewRenderer.$el = $("body");
masterModule.masterViewRenderer.render();
// setup personview to use #personView as container
personModule.personViewRenderer.$el = $("#personView");
personModule.personViewRenderer.render();
