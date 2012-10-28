var commonViewControls;
(function (commonViewControls) {
    commonViewControls.viewHeader = function (label) {
        return H2({
            class: "viewHeader"
        }, label);
    };
})(commonViewControls || (commonViewControls = {}));

