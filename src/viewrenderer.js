var ViewRenderer = (function () {
    function ViewRenderer(view, model, controllerBindings, $el) {
        this.view = view;
        this.$el = (typeof ($el) != "undefined") ? $el : null;
        this.model = (typeof (model) != "undefined") ? model : null;
        this.controllerBindings = (typeof (controllerBindings) != "undefined") ? controllerBindings : null;
    }
    ViewRenderer.prototype.render = function ($el, model) {
        if(typeof ($el) == "undefined") {
            $el = this.$el;
        }
        if(typeof (model) == "undefined") {
            model = this.model;
        }
        var renderedView = (typeof (this.view) == "function") ? this.view(model) : this.view;
        $el.html(renderedView);
        if(this.controllerBindings != null) {
            this.controllerBindings(this.model, this);
        }
    };
    return ViewRenderer;
})();
