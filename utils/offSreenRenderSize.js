
export const buildFontString = function buildFontString(ops) {
    const {family, size, lineHeight, bold, italic} = ops;
    return `${italic === true ? "italic " : ""}${bold === true ? "bold " : "normal "}${size}pt${lineHeight !== undefined ? `/${lineHeight}` : ""} ${family}`;
};

export const getTextWidth = (text, font) => {
    const tempCtx = document.createElement("canvas").getContext("2d");
    if (tempCtx === null) {
        throw new Error("Can't get context of canvas. Change a browser may fix this problem");
    }
    tempCtx.font = buildFontString({...font, size: font.size * 10});
    const {width} = tempCtx.measureText(text);
    return width / 10;
};
