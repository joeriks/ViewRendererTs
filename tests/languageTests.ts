///<reference path="../libs/jquery-1.7.2.min.js"/>
///<reference path="../libs/jasmine.d.ts"/>
///<reference path="../libs/jquery.d.ts"/>

class Foo {
    constructor (public name: string, public value: number) { }
}

class Foo1 {
    name: string;
    value: number;
}

interface JQuery {

    addModule1: (func: Function, priority: bool) => void;
    addModule2(func: Function, priority: bool): void;

}

$("").addmo

interface JQuery {
    addModulec1: any;
    addModulec2();
    addModulec3;
}

$("").addModulec3 = 12;

function addThemePrototypes() {
    var templateSetup = new Array();
    $.fn.addTemplateSetup = function (func, prioritary) {
        if (prioritary) {
            templateSetup.unshift(func);
        }
        else {
            templateSetup.push(func);
        }
    };
}



interface functionWithProperty {
    prop: string;
}

var f: functionWithProperty = (() => {
    var _f: any = function () { };
    _f.prop = "blah";
    return _f;
} ());

class x implements functionWithProperty {

    constructor (public prop: string) =>{
    }

}


describe("test ts class", () =>{
    it("does it make sense?", () =>{

        $("").addModule1(() =>{
        }, false);

        var foo = new Foo("foo", 10);
        expect(foo.name).toBe("foo");

        var foo1 = new Foo1();
        foo1.name = "foo";
        foo1.value = 10;


    });
});

describe("test jquery utilities", () => {

    var someArray = [{
        id: 1, text: "a"
    }, {
        id: 2, text: "b"
    }];

    it("grep should return reference to items in original array", () =>{

        $.grep(someArray, (itm) =>{
            return itm.id == 1
        }, false)[0].text = "aa";

        expect(someArray[0].text).toBe("aa");
        expect(someArray[1].text).toBe("b");

    });

});
