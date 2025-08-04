export const buildFontString = function buildFontString(ops, unit = 'pt') {
    const { family, size, lineHeight, bold, italic } = ops;
    return `${italic === true ? "italic " : ""}${bold === true ? "bold " : "normal "}${size}${unit}${lineHeight !== undefined ? `/${lineHeight}` : ""} ${family}`;
};

export const getTextWidth = (text, font, unit = 'pt') => {
    const canvas = document.createElement("canvas");
    const tempCtx = canvas.getContext("2d");
    if (tempCtx === null) {
        throw new Error("Can't get context of canvas. Change a browser may fix this problem");
    }

    // 使用正常字体大小进行测量
    tempCtx.font = buildFontString({ ...font }, unit);

    // 测量文本宽度
    const { width } = tempCtx.measureText(text);
    return width;
};
