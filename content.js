// 创建双栏布局的样式
const TRANSLATION_STYLES = `
.translation-container {
  display: flex !important;
  width: 100% !important;
  height: 100vh !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  z-index: 999999 !important;
  background: var(--translation-bg, white) !important;
  overflow: hidden !important;
}

.translation-container.dark {
  --translation-bg: #1a1a1a;
  --translation-border: #444444;
  --highlight-bg: rgba(255, 255, 255, 0.1);
}

.translation-column {
  width: 50% !important;
  height: 100% !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  box-sizing: border-box !important;
}

.translation-column.left {
  padding: 0 !important;
}

.translation-column.right {
  padding: 10px !important;
  border-left: 1px solid var(--translation-border, #ccc) !important;
}

.translation-column.left > * {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  max-width: none !important;
  min-width: 0 !important;
  box-sizing: border-box !important;
}

.translation-column.right > * {
  width: auto !important;
  min-width: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  transform: none !important;
  box-sizing: border-box !important;
  overflow-wrap: break-word !important;
}

.translation-column img,
.translation-column video,
.translation-column iframe,
.translation-column embed,
.translation-column object {
  max-width: 100% !important;
  height: auto !important;
  display: block !important;
  margin: 0 auto !important;
}

.translation-column table {
  width: auto !important;
  max-width: 100% !important;
  display: block !important;
  overflow-x: auto !important;
  margin: 0 auto !important;
}

.translation-column pre,
.translation-column code {
  white-space: pre-wrap !important;
  word-wrap: break-word !important;
  max-width: 100% !important;
  overflow-x: hidden !important;
}

.translation-column > body {
  margin: 0 !important;
  padding: 0 !important;
  width: auto !important;
  min-width: 0 !important;
}

.translation-column p,
.translation-column div,
.translation-column h1,
.translation-column h2,
.translation-column h3,
.translation-column h4,
.translation-column h5,
.translation-column h6,
.translation-column article,
.translation-column section {
  width: auto !important;
  min-width: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  box-sizing: border-box !important;
  position: relative !important;
}

.translation-controls {
  position: fixed !important;
  top: 10px !important;
  right: 80px !important;
  z-index: 9999999 !important;
  display: flex !important;
  gap: 10px !important;
  background: rgba(0, 0, 0, 0.8) !important;
  padding: 8px !important;
  border-radius: 20px !important;
  backdrop-filter: blur(5px) !important;
}

.translation-controls button {
  background: transparent !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  padding: 5px 10px !important;
  border-radius: 15px !important;
  cursor: pointer !important;
  font-size: 12px !important;
  transition: all 0.3s ease !important;
}

.translation-controls button:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
}

.translation-controls button.active {
  background: #4CAF50 !important;
  border-color: #4CAF50 !important;
}

.translation-close {
  position: fixed !important;
  top: 10px !important;
  right: 10px !important;
  z-index: 9999999 !important;
  background: #ff4444 !important;
  color: white !important;
  border: none !important;
  padding: 5px 10px !important;
  border-radius: 4px !important;
  cursor: pointer !important;
}

.translation-progress {
  position: fixed !important;
  bottom: 20px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  background: rgba(0, 0, 0, 0.8) !important;
  color: white !important;
  padding: 10px 20px !important;
  border-radius: 20px !important;
  z-index: 9999999 !important;
}

.translation-highlight {
  position: relative !important;
  background: linear-gradient(120deg, rgba(68, 204, 246, 0.08), rgba(147, 112, 219, 0.08)) !important;
  transition: all 0.3s ease !important;
}

.translation-highlight:hover {
  background: linear-gradient(120deg, rgba(68, 204, 246, 0.12), rgba(147, 112, 219, 0.12)) !important;
}

.translation-highlight.active {
  background: linear-gradient(120deg, rgba(68, 204, 246, 0.15), rgba(147, 112, 219, 0.15)) !important;
  transform: translateX(2px) !important;
}

.translation-highlight::before {
  content: '' !important;
  position: absolute !important;
  left: -2px !important;
  top: 0 !important;
  bottom: 0 !important;
  width: 2px !important;
  background: linear-gradient(180deg, #44CCF6, #9370DB) !important;
  opacity: 0 !important;
  transition: opacity 0.3s ease !important;
}

.translation-highlight.active::before {
  opacity: 1 !important;
}

.translation-highlight::after {
  content: '' !important;
  position: absolute !important;
  inset: -2px !important;
  border: 2px solid transparent !important;
  border-radius: 6px !important;
  background: linear-gradient(120deg, #44CCF6, #9370DB) border-box !important;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) !important;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) !important;
  -webkit-mask-composite: destination-out !important;
  mask-composite: exclude !important;
  opacity: 0 !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.translation-column .hoverable {
  cursor: pointer !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  padding: 4px 8px !important;
  margin: 2px 0 !important;
  border-radius: 4px !important;
  position: relative !important;
}

.translation-column .hoverable:hover {
  background: rgba(68, 204, 246, 0.08) !important;
}

.translation-column .hoverable.active {
  background: linear-gradient(120deg, rgba(68, 204, 246, 0.15), rgba(147, 112, 219, 0.15)) !important;
}

.translation-pulse {
  animation: pulse 1.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

@keyframes pulse {
  0% {
    transform: scale(1) translateX(4px) !important;
    box-shadow: 0 4px 12px rgba(68, 204, 246, 0.2) !important;
  }
  50% {
    transform: scale(1.02) translateX(4px) !important;
    box-shadow: 0 8px 24px rgba(68, 204, 246, 0.3) !important;
  }
  100% {
    transform: scale(1) translateX(4px) !important;
    box-shadow: 0 4px 12px rgba(68, 204, 246, 0.2) !important;
  }
}

.translation-connection-line {
  position: fixed !important;
  pointer-events: none !important;
  z-index: 999999 !important;
  height: 2px !important;
  background: linear-gradient(90deg, #44CCF6, #9370DB) !important;
  opacity: 0 !important;
  transform-origin: left center !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.translation-connection-line.show {
  opacity: 0.6 !important;
}

.translation-progress-bar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 4px !important;
  background: #f0f0f0 !important;
  z-index: 9999999 !important;
}

.translation-progress-bar-inner {
  height: 100% !important;
  width: 0% !important;
  background: #4CAF50 !important;
  transition: width 0.3s ease !important;
}

.translation-progress-text {
  position: fixed !important;
  top: 10px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  background: rgba(0, 0, 0, 0.8) !important;
  color: white !important;
  padding: 5px 15px !important;
  border-radius: 15px !important;
  font-size: 14px !important;
  z-index: 9999999 !important;
}

.selection-translate-icon {
  position: fixed !important;
  width: 32px !important;
  height: 32px !important;
  background: #4CAF50 !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  z-index: 2147483647 !important;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
  transition: transform 0.2s !important;
  user-select: none !important;
}

.selection-translate-icon:hover {
  transform: scale(1.1) !important;
}

.selection-translate-icon::before {
  content: "译" !important;
  color: white !important;
  font-size: 14px !important;
  font-weight: bold !important;
}

.selection-translate-popup {
  position: fixed !important;
  min-width: 200px !important;
  max-width: 400px !important;
  padding: 16px !important;
  border-radius: 8px !important;
  z-index: 2147483647 !important;
  font-size: 14px !important;
  line-height: 1.6 !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
  transition: opacity 0.2s !important;
  opacity: 0 !important;
  pointer-events: auto !important;
}

.selection-translate-popup.light {
  background: white !important;
  color: #333 !important;
  border: 1px solid #eee !important;
}

.selection-translate-popup.dark {
  background: #2d2d2d !important;
  color: #fff !important;
  border: 1px solid #444 !important;
}

.selection-translate-popup.show {
  opacity: 1 !important;
}

.selection-translate-popup .original-text {
  margin-bottom: 12px !important;
  padding-bottom: 12px !important;
  opacity: 0.7 !important;
  font-size: 13px !important;
  white-space: pre-wrap !important;
}

.selection-translate-popup.light .original-text {
  border-bottom: 1px solid #eee !important;
}

.selection-translate-popup.dark .original-text {
  border-bottom: 1px solid #444 !important;
}

.selection-translate-popup .translated-text {
  font-weight: 500 !important;
  white-space: pre-wrap !important;
}

.selection-translate-popup .close-btn {
  position: absolute !important;
  top: 8px !important;
  right: 8px !important;
  width: 20px !important;
  height: 20px !important;
  cursor: pointer !important;
  opacity: 0.6 !important;
  transition: opacity 0.2s !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.selection-translate-popup .close-btn:hover {
  opacity: 1 !important;
}

.selection-translate-popup .close-btn::before,
.selection-translate-popup .close-btn::after {
  content: '' !important;
  position: absolute !important;
  width: 2px !important;
  height: 16px !important;
  background: currentColor !important;
}

.selection-translate-popup .close-btn::before {
  transform: rotate(45deg) !important;
}

.selection-translate-popup .close-btn::after {
  transform: rotate(-45deg) !important;
}

.translation-stats {
  position: fixed !important;
  top: 10px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  background: rgba(0, 0, 0, 0.8) !important;
  color: white !important;
  padding: 8px 16px !important;
  border-radius: 20px !important;
  font-size: 14px !important;
  z-index: 9999999 !important;
  display: flex !important;
  gap: 16px !important;
  opacity: 0 !important;
  transition: opacity 0.3s ease !important;
  backdrop-filter: blur(5px) !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
}

.translation-stats.show {
  opacity: 1 !important;
}

.translation-stats span {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
}

.translation-stats .token-icon {
  width: 16px !important;
  height: 16px !important;
  background: linear-gradient(45deg, #4CAF50, #45a049) !important;
  border-radius: 50% !important;
  display: inline-block !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

.translation-stats .count {
  font-weight: 500 !important;
  color: #4CAF50 !important;
}
`;

// 检测是否为暗色模��
function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// 为元素添加唯一标识
function addUniqueId(element, index) {
  element.dataset.translationId = `trans-${index}`;
  return element;
}

let translationUI = null;  // 保存翻译界面的引用

// 创建翻译界面
function createTranslationUI() {
  // 注入样式
  if (!document.querySelector('#translation-styles')) {
    const style = document.createElement('style');
    style.id = 'translation-styles';
    style.textContent = TRANSLATION_STYLES;
    document.head.appendChild(style);
  }

  // 创建容器
  const container = document.createElement('div');
  container.className = 'translation-container';
  if (isDarkMode()) {
    container.classList.add('dark');
  }

  // 创建进度条
  const progressBar = document.createElement('div');
  progressBar.className = 'translation-progress-bar';
  const progressBarInner = document.createElement('div');
  progressBarInner.className = 'translation-progress-bar-inner';
  progressBar.appendChild(progressBarInner);

  // 创建进度文本
  const progressText = document.createElement('div');
  progressText.className = 'translation-progress-text';
  progressText.style.display = 'none';

  // 创建左栏（原文）
  const leftColumn = document.createElement('div');
  leftColumn.className = 'translation-column left';
  
  // 创建右栏（译文）
  const rightColumn = document.createElement('div');
  rightColumn.className = 'translation-column right';

  // 克隆页面内容
  const originalContent = document.body.cloneNode(true);
  const translatedContent = document.body.cloneNode(true);

  // 处理原始内容的样式
  function processContent(content) {
    // 移除不需要的元素
    content.querySelectorAll('script, noscript, style, iframe[src*="ads"], iframe[src*="advertisement"]').forEach(el => el.remove());

    // 移除可能影响布局的固定定位元素
    content.querySelectorAll('*').forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.position === 'fixed' || style.position === 'sticky') {
        el.style.position = 'relative';
      }
    });
  }

  // 处理两个内容区域
  processContent(originalContent);
  processContent(translatedContent);

  leftColumn.appendChild(originalContent);
  rightColumn.appendChild(translatedContent);

  // 创建控制按钮组
  const controls = document.createElement('div');
  controls.className = 'translation-controls';

  // 切换暗色模式按钮
  const darkModeButton = document.createElement('button');
  darkModeButton.textContent = 'Toggle Dark Mode';
  darkModeButton.onclick = () => {
    container.classList.toggle('dark');
  };
  controls.appendChild(darkModeButton);

  // 创建关闭按钮
  const closeButton = document.createElement('button');
  closeButton.className = 'translation-close';
  closeButton.textContent = 'Close';
  closeButton.onclick = () => {
    container.remove();
    document.querySelector('#translation-styles').remove();
    cleanupTranslation();  // 清理引用
  };

  // 创建统计信息显示
  const statsDiv = document.createElement('div');
  statsDiv.className = 'translation-stats';
  
  const inputTokens = document.createElement('span');
  inputTokens.innerHTML = '<span class="token-icon"></span>Input: <span class="input-count count">0</span> tokens';
  
  const outputTokens = document.createElement('span');
  outputTokens.innerHTML = '<span class="token-icon"></span>Output: <span class="output-count count">0</span> tokens';
  
  const totalTokens = document.createElement('span');
  totalTokens.innerHTML = '<span class="token-icon"></span>Total: <span class="total-count count">0</span> tokens';
  
  statsDiv.appendChild(inputTokens);
  statsDiv.appendChild(outputTokens);
  statsDiv.appendChild(totalTokens);
  
  // 添加到容器
  container.appendChild(statsDiv);

  // 添加新的控制按钮
  const syncScrollButton = document.createElement('button');
  syncScrollButton.textContent = 'Sync Scroll';
  syncScrollButton.classList.add('active');
  syncScrollButton.onclick = () => {
    syncScrollButton.classList.toggle('active');
    translationUI.syncScroll = syncScrollButton.classList.contains('active');
  };
  controls.appendChild(syncScrollButton);

  const fontSizeButton = document.createElement('button');
  fontSizeButton.textContent = 'Font Size';
  fontSizeButton.onclick = () => {
    const size = prompt('Enter font size (in px)', '16');
    if (size) {
      leftColumn.style.fontSize = size + 'px';
      rightColumn.style.fontSize = size + 'px';
    }
  };
  controls.appendChild(fontSizeButton);

  // 组装界面
  container.appendChild(progressBar);
  container.appendChild(progressText);
  container.appendChild(leftColumn);
  container.appendChild(rightColumn);
  container.appendChild(controls);
  container.appendChild(closeButton);
  document.body.appendChild(container);

  // 同步滚动
  leftColumn.addEventListener('scroll', () => {
    if (translationUI.syncScroll) {
      rightColumn.scrollTop = leftColumn.scrollTop;
    }
  });
  rightColumn.addEventListener('scroll', () => {
    if (translationUI.syncScroll) {
      leftColumn.scrollTop = rightColumn.scrollTop;
    }
  });

  // 添加窗口大小变化监听
  window.addEventListener('resize', () => {
    if (translationUI) {
      processContent(translationUI.originalContent);
      processContent(translationUI.translatedContent);
    }
  });

  return { 
    originalContent, 
    translatedContent, 
    progressBarInner,
    progressText,
    statsDiv,
    inputTokens: inputTokens.querySelector('.input-count'),
    outputTokens: outputTokens.querySelector('.output-count'),
    totalTokens: totalTokens.querySelector('.total-count'),
    syncScroll: true
  };
}

// 获取需要翻译的文本节点
function shouldMergeNode(node) {
  if (!node || !node.parentElement) return false;
  
  // 获取元素的display属性
  const style = window.getComputedStyle(node.parentElement);
  const display = style.display;
  
  // 检查是否包含换行符
  const hasLineBreak = node.textContent.includes('\n');
  
  // 检查是否在段落或块级元素内
  let parent = node.parentElement;
  let isInBlock = false;
  let isInListItem = false;
  while (parent && !isInBlock) {
    const parentStyle = window.getComputedStyle(parent);
    if (parent.tagName === 'LI') {
      isInListItem = true;
      isInBlock = true;
    } else if (parentStyle.display.includes('block') || parent.tagName === 'P') {
      isInBlock = true;
    }
    parent = parent.parentElement;
  }

  // 如果是内联元素且在同一个块级元素内，则合并
  // 但如果在列表项内，只合并列表项内的内容
  return (display === 'inline' || display === 'inline-block') && 
         !hasLineBreak && 
         isInBlock;
}

function getTranslatableNodes(root) {
  const textNodes = [];
  let currentGroup = null;
  let index = 0;
  let currentBlockParent = null;

  function findCommonBlockParent(node) {
    let parent = node.parentElement;
    while (parent) {
      const style = window.getComputedStyle(parent);
      // 检查是否是列表项或其他需要单独翻译的块级元素
      if (parent.tagName === 'LI' || // 列表项
          parent.tagName === 'P' ||  // 段落
          (style.display.includes('block') && parent.tagName !== 'UL' && parent.tagName !== 'OL')) { // 其他块级元素，但排除列表容器
        return parent;
      }
      // 如果遇到列表容器，直接返回当前节点的父元素
      if (parent.tagName === 'UL' || parent.tagName === 'OL') {
        return node.parentElement;
      }
      parent = parent.parentElement;
    }
    return null;
  }

  // 从元素中提取完整文本，包括所有子元素的文本
  function extractFullText(element) {
    let text = '';
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (node.parentElement.tagName === 'SCRIPT' || 
              node.parentElement.tagName === 'STYLE' || 
              node.parentElement.tagName === 'NOSCRIPT') {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    while (node = walker.nextNode()) {
      text += node.textContent.trim() + ' ';
    }
    return text.trim();
  }

  function startNewGroup(blockParent) {
    if (currentGroup) {
      // 保存当前组
      const text = extractFullText(currentGroup.blockParent);
      if (text.trim()) {
        textNodes.push({
          node: currentGroup.firstNode,
          text: text,
          index: index++,
          groupNodes: currentGroup.nodes,
          blockParent: currentGroup.blockParent
        });
      }
    }
    
    // 创建新组
    currentGroup = {
      firstNode: null,
      nodes: [],
      blockParent: blockParent
    };
  }

  // 添加一个函数来检查文本是否只包含标点符号和特殊字符
  function isOnlyPunctuationOrSpecialChars(text) {
    // 移除所有空白字符后检查
    const trimmed = text.trim();
    // 如果是空文本，返回true
    if (!trimmed) return true;
    
    // 使用正则表达式匹配任何字母、数字或CJK字符
    const hasLetterNumberOrCJK = /[A-Za-z0-9\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/.test(trimmed);
    
    // 如果不包含任何字母、数字或CJK字符，说明只包含标点符号或特殊字符
    return !hasLetterNumberOrCJK;
  }

  // 在walk函数的acceptNode中添加过滤条件
  const walk = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        // 排除脚本和样式
        if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentElement.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        // 排除空文本
        if (!node.textContent.trim()) {
          return NodeFilter.FILTER_REJECT;
        }
        // 排除只包含标点符号和特殊字符的文本
        if (isOnlyPunctuationOrSpecialChars(node.textContent)) {
          return NodeFilter.FILTER_REJECT;
        }
        // 排除隐藏元素
        let parent = node.parentElement;
        while (parent) {
          const style = window.getComputedStyle(parent);
          if (style.display === 'none' || style.visibility === 'hidden') {
            return NodeFilter.FILTER_REJECT;
          }
          parent = parent.parentElement;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  let node;
  while (node = walk.nextNode()) {
    const blockParent = findCommonBlockParent(node);
    if (!blockParent) continue;

    if (!currentGroup || currentBlockParent !== blockParent) {
      startNewGroup(blockParent);
      currentBlockParent = blockParent;
      currentGroup.firstNode = node;
    }
    
    currentGroup.nodes.push(node);
  }

  // 保存最后一个组
  if (currentGroup) {
    const text = extractFullText(currentGroup.blockParent);
    if (text.trim()) {
      textNodes.push({
        node: currentGroup.firstNode,
        text: text,
        index: index++,
        groupNodes: currentGroup.nodes,
        blockParent: currentGroup.blockParent
      });
    }
  }

  // 为所有相关元素添加唯一标识
  textNodes.forEach(item => {
    item.groupNodes.forEach(node => {
      addUniqueId(node.parentElement, item.index);
    });
  });

  return textNodes;
}

// 更新翻译进度
function updateProgress(progressBarInner, progressText, current, total) {
  const percentage = (current / total) * 100;
  progressBarInner.style.width = `${percentage}%`;
  progressText.style.display = 'block';
  progressText.textContent = `Translating... ${current}/${total} (${Math.round(percentage)}%)`;
}

// 将翻译后的内容应用到页面
async function applyTranslation(translatedText, tokenStats) {
  const translations = JSON.parse(translatedText);

  // 如果界面不存在，创建界面
  if (!translationUI) {
    translationUI = createTranslationUI();
    // 获取需要翻译的节点
    const originalNodes = getTranslatableNodes(translationUI.originalContent);
    const translatedNodes = getTranslatableNodes(translationUI.translatedContent);

    // 保存节点引用
    translationUI.originalNodes = originalNodes;
    translationUI.translatedNodes = translatedNodes;

    // 设置初始进度
    updateProgress(translationUI.progressBarInner, translationUI.progressText, 0, originalNodes.length);
  }

  // 更新翻译内容并添加交互
  translations.forEach((translation, index) => {
    if (translationUI.translatedNodes[index]) {
      const originalNode = translationUI.originalNodes[index];
      const translatedNode = translationUI.translatedNodes[index];
      
      // 更新所有分组节点的文本
      if (translatedNode.groupNodes && translatedNode.groupNodes.length > 1) {
        // 如果是分组节点，将翻译结果应用到第一个节点
        translatedNode.groupNodes[0].textContent = translation.text;
        // 清空其他节点
        for (let i = 1; i < translatedNode.groupNodes.length; i++) {
          translatedNode.groupNodes[i].textContent = '';
        }
      } else {
        // 单个节点的情况
        translatedNode.node.textContent = translation.text;
      }
      
      // 为每个分组中的元素添加交互
      originalNode.groupNodes.forEach((origNode, i) => {
        const transNode = translatedNode.groupNodes[i];
        if (origNode && transNode) {
          const origParent = origNode.parentElement;
          const transParent = transNode.parentElement;
          if (origParent && transParent) {
            addInteractionHandlers(origParent, transParent);
          }
        }
      });
      
      // 更新进度
      updateProgress(translationUI.progressBarInner, translationUI.progressText, index + 1, translationUI.translatedNodes.length);
    }
  });

  // 如果是最后一个翻译，显示完成状态和 token 统计
  if (translations.length === translationUI.translatedNodes.length) {
    setTimeout(() => {
      translationUI.progressBarInner.style.width = '100%';
      translationUI.progressText.textContent = 'Translation completed!';
      
      if (tokenStats) {
        updateStats(translationUI, tokenStats);
      }
      
      setTimeout(() => {
        translationUI.progressText.style.display = 'none';
        translationUI.progressBarInner.style.display = 'none';
      }, 2000);
    }, 500);
  }
}

// 清理翻译界面
function cleanupTranslation() {
  if (translationUI) {
    translationUI = null;
  }
}

// 获取页面内容
function getMainContent() {
  const nodes = getTranslatableNodes(document.body);
  return {
    content: JSON.stringify(nodes.map(node => ({
      text: node.text,
      index: node.index
    }))),
    nodes: nodes
  };
}

// 处理日志消息
function handleLog(logType, message) {
  if (logType === 'group') {
    console.group(message);
  } else if (logType === 'groupEnd') {
    console.groupEnd();
  } else if (logType === 'error') {
    if (typeof message === 'object' && message.label) {
      console.error(message.label + ':', message.content);
    } else {
      console.error(message);
    }
  } else {
    if (typeof message === 'object' && message.label) {
      console.log(message.label + ':', message.content);
    } else {
      console.log(message);
    }
  }
}

// 监听来自background.js的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'translate') {
    const { content } = getMainContent();
    sendResponse({ content });
  } else if (request.action === 'applyTranslation') {
    applyTranslation(request.translatedText, request.tokenStats);
    sendResponse({ success: true });
  } else if (request.action === 'log') {
    handleLog(request.logType, request.message);
    sendResponse({ success: true });
  }
  return true;
});

// 添加划词翻译相关的变量
let selectionIcon = null;
let selectionPopup = null;
let currentSelection = '';

// 创建翻译图标
function createTranslationIcon() {
  const icon = document.createElement('div');
  icon.className = 'selection-translate-icon';
  icon.style.display = 'none';
  document.body.appendChild(icon);
  return icon;
}

// 创建翻译弹出框
function createTranslationPopup() {
  const popup = document.createElement('div');
  popup.className = 'selection-translate-popup ' + (isDarkMode() ? 'dark' : 'light');
  
  const closeBtn = document.createElement('div');
  closeBtn.className = 'close-btn';
  closeBtn.onclick = () => hideTranslationPopup();
  
  const originalText = document.createElement('div');
  originalText.className = 'original-text';
  
  const translatedText = document.createElement('div');
  translatedText.className = 'translated-text';
  
  popup.appendChild(closeBtn);
  popup.appendChild(originalText);
  popup.appendChild(translatedText);
  popup.style.display = 'none';
  document.body.appendChild(popup);
  
  return popup;
}

// 显示翻译图标
function showTranslationIcon(x, y) {
  if (!selectionIcon) {
    selectionIcon = createTranslationIcon();
  }

  // 确保图标可见
  selectionIcon.style.left = `${x}px`;
  selectionIcon.style.top = `${y}px`;
  selectionIcon.style.display = 'flex';
  selectionIcon.style.opacity = '1';

  // 移除旧的事件监听器
  const newIcon = selectionIcon.cloneNode(true);
  selectionIcon.parentNode.replaceChild(newIcon, selectionIcon);
  selectionIcon = newIcon;
  
  // 添加鼠标悬停事件
  selectionIcon.addEventListener('mouseenter', () => {
    if (window.translationIconTimer) {
      clearTimeout(window.translationIconTimer);
    }
  });
  
  selectionIcon.addEventListener('mouseleave', () => {
    // 检查是否仍有文本被选中
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (!selectedText) {
      window.translationIconTimer = setTimeout(() => {
        hideTranslationIcon();
      }, 1000);
    }
  });
}

// 隐藏翻译图标
function hideTranslationIcon() {
  if (selectionIcon) {
    selectionIcon.style.display = 'none';
  }
  if (window.translationIconTimer) {
    clearTimeout(window.translationIconTimer);
    window.translationIconTimer = null;
  }
}

// 显示翻译弹出框
function showTranslationPopup(x, y, original, translated) {
  // 立即隐藏翻译图标
  hideTranslationIcon();
  
  if (!selectionPopup) {
    selectionPopup = createTranslationPopup();
  }
  
  // 更新内容
  selectionPopup.querySelector('.original-text').textContent = original;
  selectionPopup.querySelector('.translated-text').textContent = translated;
  
  // 重置样式
  selectionPopup.style.display = 'block';
  selectionPopup.style.opacity = '0';
  selectionPopup.classList.remove('show');
  
  // 计算位置
  const rect = selectionPopup.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // 优先尝试在标右侧显示
  let popupX = x + 10;
  let popupY = y;
  
  // 如果右侧空间不足，尝试左侧
  if (popupX + rect.width > viewportWidth - 20) {
    popupX = x - rect.width - 10;
  }
  
  // 如果左侧也不足，居中显示
  if (popupX < 10) {
    popupX = Math.max(10, (viewportWidth - rect.width) / 2);
  }
  
  // 垂直位置整
  if (popupY + rect.height > viewportHeight - 20) {
    popupY = Math.max(10, viewportHeight - rect.height - 20);
  }
  
  // 应用位置
  selectionPopup.style.left = `${popupX}px`;
  selectionPopup.style.top = `${popupY}px`;
  
  // 添加显示动画
  requestAnimationFrame(() => {
    selectionPopup.classList.add('show');
  });

  // 清除当前选中文本和定时器
  currentSelection = '';
  if (window.translationIconTimer) {
    clearTimeout(window.translationIconTimer);
    window.translationIconTimer = null;
  }
}

// 隐藏翻译弹出框
function hideTranslationPopup() {
  if (selectionPopup) {
    selectionPopup.classList.remove('show');
    setTimeout(() => {
      selectionPopup.style.display = 'none';
    }, 200);
  }
}

// 修改处理选中文本的函数
function handleSelection(event) {
  // 忽略来自翻译弹窗和图标的择
  if (event.target.closest('.selection-translate-popup') || 
      event.target.closest('.selection-translate-icon')) {
    return;
  }

  // 获取选中文本
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  // 如果没有选中文本，隐藏图标并清除选中状态
  if (!selectedText) {
    currentSelection = '';
    hideTranslationIcon();
    return;
  }

  // 如果是新的选中文本，长度大于1
  if (selectedText.length > 1) {
    // 立即新当前选中的文本
    currentSelection = selectedText;
    
    // 使用标事件的坐标
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    // 确保图标完全在视口内
    const iconX = Math.min(mouseX + 5, window.innerWidth - 40);
    const iconY = Math.min(Math.max(mouseY - 20, 10), window.innerHeight - 40);
    
    showTranslationIcon(iconX, iconY);

    // 设置自动隐藏定时器
    if (window.translationIconTimer) {
      clearTimeout(window.translationIconTimer);
    }
    window.translationIconTimer = setTimeout(() => {
      if (!selectionPopup || selectionPopup.style.display === 'none') {
        hideTranslationIcon();
      }
    }, 3000);
  }
}

// 修改处理点击事件的函数
function handleClick(event) {
  // 如果点击的弹内部，不做处理
  if (event.target.closest('.selection-translate-popup')) {
    return;
  }
  
  // 如果点击的是翻译图标
  const iconElement = event.target.closest('.selection-translate-icon');
  if (iconElement) {
    event.preventDefault();
    event.stopPropagation();
    
    // 重新获取当前选中的文本
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    // 用最新的选中文本或保存的文本
    const textToTranslate = selectedText || currentSelection;
    
    if (!textToTranslate) {
      alert('Please select text to translate');
      hideTranslationIcon();
      return;
    }

    const iconRect = iconElement.getBoundingClientRect();
    translateSelectedText(textToTranslate, iconRect.left, iconRect.top);
    // 开始翻译时就隐藏图标
    hideTranslationIcon();
    return;
  }
  
  // 点击其他区域，检查是否仍有文本被选中
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();
  
  if (!selectedText) {
    // 只有在没有文本被选中时才隐藏图标和弹窗
    hideTranslationIcon();
    hideTranslationPopup();
    currentSelection = '';
  }
}

// 修改翻译选中的文本函数
async function translateSelectedText(text, x, y) {
  try {
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      hideTranslationIcon();
      throw new Error('没有选中有效的文本内容');
    }

    const textToTranslate = text.trim();
    
    // 添加重试机制
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        const response = await chrome.runtime.sendMessage({
          action: 'translateSelection',
          text: textToTranslate
        });

        if (!response) {
          throw new Error('未收到响应');
        }

        if (!response.success) {
          throw new Error(response.error || '翻译失败');
        }

        showTranslationPopup(x, y, textToTranslate, response.translatedText.translatedText);
        return;
      } catch (err) {
        retryCount++;
        if (retryCount === maxRetries) {
          throw err;
        }
        // 等待一段时间后重试
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  } catch (error) {
    console.error('Translation error:', error);
    hideTranslationIcon();
    
    // 处理扩展上下文失效的情况
    if (error.message.includes('Extension context invalidated')) {
      cleanup();
      initializeSelectionTranslation();
      showError('扩展要重新加载，请刷新页面后重试');
    } else {
      showError('翻译失败: ' + error.message);
    }
  }
}

// 添加错误提示函数
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    z-index: 999999999;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  `;
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);
  
  setTimeout(() => {
    errorDiv.style.opacity = '0';
    errorDiv.style.transition = 'opacity 0.3s ease';
    setTimeout(() => errorDiv.remove(), 300);
  }, 3000);
}

// 添加清理函数
function cleanup() {
  if (selectionIcon) {
    selectionIcon.remove();
    selectionIcon = null;
  }
  if (selectionPopup) {
    selectionPopup.remove();
    selectionPopup = null;
  }
  if (window.translationIconTimer) {
    clearTimeout(window.translationIconTimer);
    window.translationIconTimer = null;
  }
  currentSelection = '';
}

// 修改初始化函数
function initializeSelectionTranslation() {
  cleanup(); // 清理可能存在的旧实例
  
  // 注入样式
  if (!document.querySelector('#translation-styles')) {
    const style = document.createElement('style');
    style.id = 'translation-styles';
    style.textContent = TRANSLATION_STYLES;
    document.head.appendChild(style);
  }

  // 添加事件监听
  document.addEventListener('mouseup', handleSelection);
  document.addEventListener('click', handleClick);
  
  // 添加清理监听
  window.addEventListener('beforeunload', cleanup);
}

// 在页面加载完成后初始化划词翻译
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSelectionTranslation);
} else {
  initializeSelectionTranslation();
}

// 添加文档级别的鼠标移动监听
document.addEventListener('mousemove', (event) => {
  // 如果鼠标不在翻译图标或弹窗上，且移动距离超过一定范围，就隐藏图标
  if (!event.target.closest('.selection-translate-popup') && 
      !event.target.closest('.selection-translate-icon')) {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (!selectedText) {
      hideTranslationIcon();
    }
  }
});

// 添加快捷键监听
document.addEventListener('keydown', function(event) {
  // 检查是否按下了 Ctrl + M
  if (event.ctrlKey && event.key.toLowerCase() === 'm') {
    event.preventDefault(); // 阻止默认行为
    
    // 如果已经存在翻译界面，关闭它
    if (translationUI) {
      const container = document.querySelector('.translation-container');
      if (container) {
        container.remove();
        document.querySelector('#translation-styles')?.remove();
        cleanupTranslation();
      }
      return;
    }

    // 否则，触发翻译
    const { content } = getMainContent();
    chrome.runtime.sendMessage(
      { action: 'translate', content },
      response => {
        if (response && response.content) {
          console.log('Translation started');
        }
      }
    );
  }
}); 

// 修改显示翻译统计信息的样式
const TRANSLATION_STATS_STYLES = `
.translation-stats {
  position: fixed !important;
  top: 10px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  background: rgba(0, 0, 0, 0.8) !important;
  color: white !important;
  padding: 8px 16px !important;
  border-radius: 20px !important;
  font-size: 14px !important;
  z-index: 9999999 !important;
  display: flex !important;
  gap: 16px !important;
  opacity: 0 !important;
  transition: opacity 0.3s ease !important;
  backdrop-filter: blur(5px) !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
}

.translation-stats.show {
  opacity: 1 !important;
}

.translation-stats span {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
}

.translation-stats .token-icon {
  width: 16px !important;
  height: 16px !important;
  background: linear-gradient(45deg, #4CAF50, #45a049) !important;
  border-radius: 50% !important;
  display: inline-block !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

.translation-stats .count {
  font-weight: 500 !important;
  color: #4CAF50 !important;
}
`;

// 修改创建统计信息显示的函数
function createStatsDisplay() {
  const statsDiv = document.createElement('div');
  statsDiv.className = 'translation-stats';
  
  const inputTokens = document.createElement('span');
  inputTokens.innerHTML = '<span class="token-icon"></span>Input: <span class="input-count count">0</span> tokens';
  
  const outputTokens = document.createElement('span');
  outputTokens.innerHTML = '<span class="token-icon"></span>Output: <span class="output-count count">0</span> tokens';
  
  const totalTokens = document.createElement('span');
  totalTokens.innerHTML = '<span class="token-icon"></span>Total: <span class="total-count count">0</span> tokens';
  
  statsDiv.appendChild(inputTokens);
  statsDiv.appendChild(outputTokens);
  statsDiv.appendChild(totalTokens);
  
  return {
    statsDiv,
    inputTokens: inputTokens.querySelector('.input-count'),
    outputTokens: outputTokens.querySelector('.output-count'),
    totalTokens: totalTokens.querySelector('.total-count')
  };
}

// 修改更新统计信息的函数
function updateStats(statsElements, tokenStats) {
  if (tokenStats && statsElements) {
    statsElements.inputTokens.textContent = tokenStats.inputTokens.toLocaleString();
    statsElements.outputTokens.textContent = tokenStats.outputTokens.toLocaleString();
    statsElements.totalTokens.textContent = (tokenStats.inputTokens + tokenStats.outputTokens).toLocaleString();
    statsElements.statsDiv.classList.add('show');
  }
}

// 添加交互处理函数
function addInteractionHandlers(originalElement, translatedElement) {
  if (!originalElement || !translatedElement || !originalElement.parentNode || !translatedElement.parentNode) {
    console.warn('Invalid elements provided to addInteractionHandlers');
    return;
  }

  let connectionLine = null;

  function createConnectionLine() {
    if (!connectionLine) {
      connectionLine = document.createElement('div');
      connectionLine.className = 'translation-connection-line';
      document.body.appendChild(connectionLine);
    }
    return connectionLine;
  }

  function updateConnectionLine(fromElement, toElement) {
    if (!fromElement || !toElement) return;
    
    const line = createConnectionLine();
    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();

    const fromX = fromRect.right;
    const fromY = fromRect.top + fromRect.height / 2;
    const toX = toRect.left;
    const toY = toRect.top + toRect.height / 2;

    const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
    const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;

    line.style.width = `${length}px`;
    line.style.left = `${fromX}px`;
    line.style.top = `${fromY}px`;
    line.style.transform = `rotate(${angle}deg)`;
    
    requestAnimationFrame(() => line.classList.add('show'));
  }

  function removeConnectionLine() {
    if (connectionLine) {
      connectionLine.classList.remove('show');
      setTimeout(() => {
        if (connectionLine && connectionLine.parentNode) {
          connectionLine.remove();
        }
        connectionLine = null;
      }, 400);
    }
  }

  function handleHover(sourceElement, targetElement, isEnter) {
    if (!sourceElement || !targetElement) return;

    if (isEnter) {
      sourceElement.classList.add('translation-highlight', 'active');
      targetElement.classList.add('active');
      updateConnectionLine(originalElement, translatedElement);
      
      // 确保元素在视图中可见
      const targetRect = targetElement.getBoundingClientRect();
      if (targetRect.top < 0 || targetRect.bottom > window.innerHeight) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      sourceElement.classList.remove('translation-highlight', 'active');
      targetElement.classList.remove('active');
      removeConnectionLine();
    }
  }

  function handleClick(sourceElement, targetElement) {
    if (!sourceElement || !targetElement) return;

    // 移除其他元素的高亮
    document.querySelectorAll('.translation-highlight').forEach(el => {
      el.classList.remove('translation-highlight', 'active');
    });
    document.querySelectorAll('.hoverable.active').forEach(el => {
      el.classList.remove('active');
    });

    // 添加高亮动画
    sourceElement.classList.add('translation-highlight', 'active', 'translation-pulse');
    targetElement.classList.add('active');
    updateConnectionLine(originalElement, translatedElement);

    setTimeout(() => {
      if (sourceElement) {
        sourceElement.classList.remove('translation-pulse');
      }
    }, 1200);

    // 平滑滚动到对应位置
    targetElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center'
    });
  }

  // 直接添加事件监听器，不再克隆元素
  translatedElement.addEventListener('mouseenter', () => handleHover(originalElement, translatedElement, true));
  translatedElement.addEventListener('mouseleave', () => handleHover(originalElement, translatedElement, false));
  translatedElement.addEventListener('click', () => handleClick(originalElement, translatedElement));

  originalElement.addEventListener('mouseenter', () => handleHover(originalElement, translatedElement, true));
  originalElement.addEventListener('mouseleave', () => handleHover(originalElement, translatedElement, false));
  originalElement.addEventListener('click', () => handleClick(originalElement, translatedElement));

  // 添加可交互类
  originalElement.classList.add('hoverable');
  translatedElement.classList.add('hoverable');
} 