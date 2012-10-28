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
