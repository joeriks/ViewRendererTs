/// <reference path="ref.ts"/>
var commonViewControls;
(function (commonViewControls) {
    // view controls common to several views
    commonViewControls.viewHeader = function (label) {
        return H2({
            class: "viewHeader"
        }, label);
    };
})(commonViewControls || (commonViewControls = {}));

