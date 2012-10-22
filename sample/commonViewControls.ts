/// <reference path="ref.ts"/>

module commonViewControls {

    // view controls common to several views

    export var viewHeader = (label: string) => 
        H2({ class: "viewHeader" }, label);

}
