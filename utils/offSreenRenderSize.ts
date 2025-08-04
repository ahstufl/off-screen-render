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

export const buildFontString = function buildFontString(ops: FontStyle, unit='pt') {
    const {family, size, lineHeight, bold, italic} = ops;
    return `${italic === true ? "italic " : ""}${bold === true ? "bold " : "normal "}${size}${unit}${lineHeight !== undefined ? `/${lineHeight}` : ""} ${family}`;
};

export const getTextWidth = (text: string, font: FontStyle, unit='pt'): number => {
    const tempCtx = document.createElement("canvas").getContext("2d");
    if (tempCtx === null) {
        throw new Error("Can't get context of canvas. Change a browser may fix this problem");
    }
    tempCtx.font = buildFontString({...font}, unit);
    const {width} = tempCtx.measureText(text);
    return width / 10;
};
