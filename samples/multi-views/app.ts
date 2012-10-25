/// <reference path="masterModule/masterModule.ts"/>

module app {

    // bootstrap

    
    export var localPublish = amplify.publish;
    export var localSubscribe = amplify.subscribe;

    $(() =>{

        masterModule.masterViewRenderer.render($("body"));

    });

}