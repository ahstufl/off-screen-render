import { getTextWidth } from "./utils/offSreenRenderSize";
// import type { FontStyle } from "./utils/offSreenRenderSize";

const text = "Hello, world!";
const font = {
    size: 16,
    bold: true,
    horizontal: "left",
    vertical: "top",
    color: "#000000",
    family: "Arial",
};
console.log(getTextWidth(text, font));