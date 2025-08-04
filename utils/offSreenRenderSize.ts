export interface FontStyle {
    size: number;
    bold?: boolean;
    horizontal: "left" | "center" | "right";
    vertical: "top" | "center" | "bottom";
    color: string;
    family: string;
    lineHeight?: number;
    italic?: boolean;
    underline?: boolean;
}

export const buildFontString = function buildFontString(ops: FontStyle) {
    const {family, size, lineHeight, bold, italic} = ops;
    return `${italic === true ? "italic " : ""}${bold === true ? "bold " : "normal "}${size}pt${lineHeight !== undefined ? `/${lineHeight}` : ""} ${family}`;
};

export const getTextWidth = (text: string, font: FontStyle): number => {
    const tempCtx = document.createElement("canvas").getContext("2d");
    if (tempCtx === null) {
        throw new Error("Can't get context of canvas. Change a browser may fix this problem");
    }
    tempCtx.font = buildFontString({...font, size: font.size * 10});
    const {width} = tempCtx.measureText(text);
    return width / 10;
};
