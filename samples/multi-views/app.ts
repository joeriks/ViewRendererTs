/// <reference path="masterModule/masterModule.ts"/>

module app {

    // bootstrap

    export var wsSettings = {
        apikey: '1de968d1-b06e-4054-abc5-c1ba167d2c29'
    };

    export var ws: jXSockets.WebSocket;
    
    export var localPublish = amplify.publish;
    export var localSubscribe = amplify.subscribe;

    $(() =>{

        masterModule.masterViewRenderer.render($("body"));

    });

}