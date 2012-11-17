describe("Render paragraphs", function () {
    it("can render paragraph with links", function () {
        var renderThis = P({
        }, "domo lets you write ", A({
            href: "#html"
        }, "HTML markup"), " and ", A({
            href: "#css"
        }, "CSS styles"), " in JavaScript syntax, in the browser and ", A({
            href: "#server"
        }, "on the server"), ". ", "domo is a simpler, easier, and more reliable alternative to template engines and CSS pre-processors, and works well with all the tools you already use.");
        var expected = 'domo lets you write <a href="#html">HTML markup</a> and <a href="#css">CSS styles</a> in JavaScript syntax, in the browser and <a href="#server">on the server</a>. domo is a simpler, easier, and more reliable alternative to template engines and CSS pre-processors, and works well with all the tools you already use.';
        expect(renderThis.innerHTML).toBe(expected);
    });
});
describe("Render STYLE.on()", function () {
    it("STYLE.on()", function () {
        var styleSheet = STYLE({
            type: "text/css"
        }, STYLE.on("a", {
            color: "red"
        }), STYLE.on("*", {
            margin: 0,
            padding: 0
        }));
        expect(styleSheet.innerHTML).toBe("a{color:red;}\n*{margin:0px;padding:0px;}\n");
    });
    it("nested STYLE.on()", function () {
        var nestedStyles = STYLE({
            type: "text/css"
        }, STYLE.on("a", {
            color: "red"
        }, STYLE.on("img", {
            borderWidth: 0
        })));
        var normalStyles = STYLE({
            type: "text/css"
        }, STYLE.on("a img", {
            borderWidth: 0
        }), STYLE.on("a", {
            color: "red"
        }));
        expect(nestedStyles.innerHTML).toBe(normalStyles.innerHTML);
    });
});
