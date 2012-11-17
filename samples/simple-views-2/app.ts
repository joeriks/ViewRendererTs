/// <reference path="masterModule.ts"/>
/// <reference path="personModule.ts"/>

// setup masterview to use body as container
masterModule.masterViewRenderer.render($("body"));

// setup personview to use #personView as container
personModule.personViewRenderer.render($("#personView"));
