class ViewRenderer {

    $el: any;
    model: any;
    view: Function;
    controllerBindings: (model:any, viewRenderer:ViewRenderer)=> any;

    constructor (view: Function, model?: any, controllerBindings?:(model:any, viewRenderer:ViewRenderer)=> any, $el?: any) {
        this.view = view;
        this.$el = (typeof ($el) != "undefined") ? $el : null;
        this.model = (typeof (model) != "undefined") ? model : null;
        this.controllerBindings = (typeof (controllerBindings) != "undefined") ? controllerBindings : null;
    }

    render($el?: any, model?: any) {
        if (typeof ($el) == "undefined") $el = this.$el;
        if (typeof (model) == "undefined") model = this.model;
        var renderedView = (typeof (this.view) == "function") ? this.view(model) : this.view;
        $el.html(renderedView);
        if (this.controllerBindings != null) {
            this.controllerBindings(this.model, this);
        }
    }
}
