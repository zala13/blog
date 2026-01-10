/**
 * 生成包含指定字符的 SVG 矢量图
 * @param {string} text - 要显示的字符（如 "ZALA13"）
 * @param {Object} options - 可选配置（字体、颜色、尺寸等）
 * @returns {string} SVG 字符串
 */
function generateTextSVG(text, options = {}) {
    // 默认配置
    const config = {
        width: options.width || 300,        // SVG 宽度
        height: options.height || 150,      // SVG 高度
        fontSize: options.fontSize || 48,   // 字体大小
        fontFamily: options.fontFamily || 'Arial, Helvetica, sans-serif', // 字体
        fill: options.fill || '#000000',    // 字符颜色
        stroke: options.stroke || 'none',   // 描边（none 为无）
        strokeWidth: options.strokeWidth || 1, // 描边宽度
        textAlign: options.textAlign || 'center', // 文字对齐方式
        verticalAlign: options.verticalAlign || 'middle' // 垂直对齐
    };

    // 计算文字垂直居中的 y 坐标（SVG 中 y 轴向下，需结合字体大小计算）
    let y;
    if (config.verticalAlign === 'middle') {
        y = config.height / 2 + config.fontSize / 3.5; // 补偿字体基线偏移
    } else if (config.verticalAlign === 'top') {
        y = config.fontSize;
    } else {
        y = config.height - 10; // bottom
    }

    // 拼接 SVG 字符串
    const svg = `
<svg width="${config.width}" height="${config.height}" xmlns="http://www.w3.org/2000/svg">
    <text 
        x="${config.width / 2}" 
        y="${y}" 
        font-family="${config.fontFamily}" 
        font-size="${config.fontSize}" 
        fill="${config.fill}" 
        stroke="${config.stroke}" 
        stroke-width="${config.strokeWidth}"
        text-anchor="${config.textAlign}"
        dominant-baseline="auto"
    >
        ${text}
    </text>
</svg>
    `.trim();

    return svg;
}

// ===================== 用法示例 =====================
// 1. 生成 "ZALA13" 的 SVG
const zalaSvg = generateTextSVG("ZALA13", {
    width: 400,          // 自定义宽度
    height: 200,         // 自定义高度
    fontSize: 60,        // 更大的字体
    fill: "#2c3e50",     // 深蓝色文字
    stroke: "#ecf0f1",   // 浅灰色描边
    strokeWidth: 2       // 描边宽度
});

// 2. 打印 SVG 内容（可直接复制到文本文件，保存为 .svg 格式）
console.log(zalaSvg);

// 3. 浏览器环境下：自动下载 SVG 文件（可选）
if (typeof document !== 'undefined') {
    const blob = new Blob([zalaSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ZALA13.svg'; // 下载的文件名
    a.click();
    URL.revokeObjectURL(url); // 释放资源
}