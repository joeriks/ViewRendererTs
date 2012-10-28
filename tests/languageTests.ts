///<reference path="../libs/jquery-1.7.2.min.js"/>
///<reference path="../libs/jasmine.d.ts"/>
///<reference path="../libs/jquery.d.ts"/>

describe("test jquery utilities", () => {

    var someArray = [{ id: 1, text: "a" }, { id: 2, text: "b" }];

    it("grep should return reference to items in original array", () =>{

        $.grep(someArray, (itm) =>{ return itm.id == 1 }, false)[0].text = "aa";

        expect(someArray[0].text).toBe("aa");
        expect(someArray[1].text).toBe("b");

    });

});
