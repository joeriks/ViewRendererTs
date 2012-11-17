var Foo = (function () {
    function Foo(name, value) {
        this.name = name;
        this.value = value;
    }
    return Foo;
})();
describe("test ts class", function () {
    it("does it make sense?", function () {
        var foo = new Foo("foo", 10);
        expect(foo.name).toBe("foo");
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
