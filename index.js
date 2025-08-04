import { buildFontString, getTextWidth } from "./utils/offSreenRenderSize.js";

// 获取DOM元素
const textElement = document.getElementById('text');
const widthElement = document.getElementById('width');

// 字体样式配置
const font = {
    size: 16,
    bold: false,
    horizontal: "left",
    vertical: "top",
    color: "#000000",
    family: "Arial",
};

const unit = 'px';

// 计算并更新宽度显示
function updateWidth() {
    const text = textElement.textContent || textElement.innerText || '';
    console.log(text);
    if (text.trim() === '') {
        widthElement.textContent = '0';
        return;
    }

    try {
        const width = getTextWidth(text, font, unit);
        widthElement.textContent = Math.round(width * 100) / 100; // 保留两位小数

        // 显示离屏渲染的canvas
        const canvas = document.createElement("canvas");
        const tempCtx = canvas.getContext("2d");
        if (tempCtx === null) {
            throw new Error("Can't get context of canvas. Change a browser may fix this problem");
        }

        // 设置canvas尺寸用于显示验证
        canvas.width = Math.max(width + 40, 200);
        canvas.height = font.size + 20;

        // 设置canvas样式，使其可见
        canvas.style.border = "1px solid red";
        canvas.style.margin = "5px";
        canvas.style.display = "block";

        // 重新设置字体（canvas尺寸改变后需要重新设置）
        tempCtx.font = buildFontString(font, unit);
        tempCtx.fillStyle = font.color;
        tempCtx.textBaseline = "top";

        // 在canvas上实际绘制文本
        tempCtx.fillText(text, 5, 5);

        // 绘制一个红色矩形框，宽度为实际测量的宽度
        tempCtx.strokeStyle = "red";
        tempCtx.lineWidth = 1;
        tempCtx.strokeRect(5, 5, width, font.size);

        // 清除之前的canvas（避免积累）
        const existingCanvases = document.querySelectorAll('.debug-canvas');
        existingCanvases.forEach(c => c.remove());

        // 添加标识类名和说明
        canvas.className = 'debug-canvas';
        canvas.title = `文本: "${text}", 宽度: ${Math.round(width * 100) / 100}px`;

        // 添加到页面用于调试
        document.body.appendChild(canvas);

    } catch (error) {
        console.error('计算宽度时出错:', error);
        widthElement.textContent = '计算错误';
    }
}

// 监听内容变化事件
textElement.addEventListener('input', updateWidth);
textElement.addEventListener('paste', () => {
    // 粘贴事件需要延迟执行，等待内容更新
    setTimeout(updateWidth, 10);
});

// 页面加载时计算初始宽度
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateWidth);
} else {
    updateWidth();
}