var ViewRenderer = (function () {
    function ViewRenderer(view, model, controllerBindings, $el) {
        this.view = view;
        this.$el = (typeof ($el) != "undefined") ? $el : null;
        this.model = (typeof (model) != "undefined") ? model : null;
        this.controllerBindings = (typeof (controllerBindings) != "undefined") ? controllerBindings : null;
    }
    ViewRenderer.prototype.render = function ($el, model) {
        if(typeof (model) == "undefined") {
            model = this.model;
        }
        var renderedView = (typeof (this.view) == "function") ? this.view(model) : this.view;
        if(typeof ($el) == "undefined" && this.$el != null) {
            $el = this.$el;
        }
        if(typeof ($el) != "undefined") {
            this.$el = $el;
            $el.html(renderedView);
        }
        if(this.controllerBindings != null) {
            this.controllerBindings(this.model, this);
        }
        return {
            renderedView: renderedView,
            controllerBindings: this.controllerBindings
        };
    };
    return ViewRenderer;
})();
