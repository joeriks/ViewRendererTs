class ViewRenderer {

    model: any;
    view: Function;
    $el: any;
    controllerBindings: (model: any, viewRenderer: ViewRenderer) => any;

    constructor (view: Function, model?: any, controllerBindings?: (model: any, viewRenderer: ViewRenderer) => any, $el?: any) {
        this.view = view;
        this.$el = (typeof ($el) != "undefined") ? $el : null;
        this.model = (typeof (model) != "undefined") ? model : null;
        this.controllerBindings = (typeof (controllerBindings) != "undefined") ? controllerBindings : null;
    }

    render($el?: any, model?: any) {
        if (typeof (model) == "undefined") model = this.model;
        var renderedView = (typeof (this.view) == "function") ? this.view(model) : this.view;
        if (typeof ($el) == "undefined" && this.$el != null) $el = this.$el;
        if (typeof ($el) != "undefined") { 
            this.$el = $el; 
            $el.html(renderedView); 
        }
        if (this.controllerBindings != null) {
            this.controllerBindings(this.model, this);
        }

        return { renderedView: renderedView, controllerBindings: this.controllerBindings };
    }
}
