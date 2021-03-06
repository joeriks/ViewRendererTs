var Foo = (function () {
    function Foo(name, value) {
        this.name = name;
        this.value = value;
    }
    return Foo;
})();
var Foo1 = (function () {
    function Foo1() { }
    return Foo1;
})();
$("").addModulec3 = 12;
function addThemePrototypes() {
    var templateSetup = new Array();
    $.fn.addTemplateSetup = function (func, prioritary) {
        if(prioritary) {
            templateSetup.unshift(func);
        } else {
            templateSetup.push(func);
        }
    };
}
var f = ((function () {
    var _f = function () {
    };
    _f.prop = "blah";
    return _f;
})());
var x = (function () {
    function x(prop) {
        this.prop = prop;
    }
    return x;
})();
describe("test ts class", function () {
    it("does it make sense?", function () {
        $("").addModule(function () {
        }, false);
        var foo = new Foo("foo", 10);
        expect(foo.name).toBe("foo");
        var foo1 = new Foo1();
        foo1.name = "foo";
        foo1.value = 10;
    });
});
describe("test jquery utilities", function () {
    var someArray = [
        {
            id: 1,
            text: "a"
        }, 
        {
            id: 2,
            text: "b"
        }
    ];
    it("grep should return reference to items in original array", function () {
        $.grep(someArray, function (itm) {
            return itm.id == 1;
        }, false)[0].text = "aa";
        expect(someArray[0].text).toBe("aa");
        expect(someArray[1].text).toBe("b");
    });
});
