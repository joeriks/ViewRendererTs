/// <reference path="masterModule/masterModule.ts"/>

// setup masterview to use body as container

module app {

    var settings = {
        apikey: '1de968d1-b06e-4054-abc5-c1ba167d2c29'
    };

    export var ws = new jXSockets.WebSocket("ws://xsocketslive.cloudapp.net:10101/XSockets.Live.Realtime.API",
     "XSockets.Live.Realtime.API", settings);

    $(() =>{

        masterModule.masterViewRenderer.$el = $("body");
        masterModule.masterViewRenderer.render();

    });

}