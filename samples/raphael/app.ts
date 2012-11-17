/// <reference path="masterModule.ts"/>
// setup masterview to use body as container
masterModule.masterViewRenderer.render($("body"));

    interface ModalDefaultOptions {
        content?: bool;
        useIframe?: bool;
    }

    interface JQueryStatic {
        modal: {
            defaults: ModalDefaultOptions;
        };
    }

    interface JQuery {
        disableBt(): void;
    }

    $("body").disableBt();
    $.modal.defaults.content = false;
