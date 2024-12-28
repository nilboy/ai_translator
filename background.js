// 添加默认配置
const DEFAULT_SETTINGS = {
  apiKey: 'your-openai-api-key-here',
  baseUrl: 'https://api.openai.com/v1',
  model: 'gpt-4'
};

// 添加语言映射
const languageNames = {
  'zh': '中文',
  'en': '英文',
  'ja': '日文',
  'ko': '韩文',
  'fr': '法文',
  'de': '德文',
  'es': '西班牙文',
  'ru': '俄文',
  'it': '意大利文',
  'pt': '葡萄牙文',
  'vi': '越南文',
  'th': '泰文',
  'ar': '阿拉伯文'
};

// 处理快捷键命令
chrome.commands.onCommand.addListener((command) => {
  if (command === 'translate-page') {
    translateCurrentPage();
  }
});

// 将数组分成多个批次
function splitIntoBatches(array, batchSize) {
  const batches = [];
  for (let i = 0; i < array.length; i += batchSize) {
    batches.push(array.slice(i, i + batchSize));
  }
  return batches;
}

// 翻译当前页面
async function translateCurrentPage() {
  try {
    // 获取设置，如果没有则使用默认值
    const settings = await chrome.storage.sync.get(['apiKey', 'baseUrl', 'model', 'targetLang']);
    const config = {
      apiKey: settings.apiKey || DEFAULT_SETTINGS.apiKey,
      baseUrl: (settings.baseUrl || DEFAULT_SETTINGS.baseUrl).replace(/\/$/, ''),
      model: settings.model || DEFAULT_SETTINGS.model,
      targetLang: settings.targetLang || 'zh'  // 添加目标语言设置
    };

    console.log('Current page translation config:', {
      baseUrl: config.baseUrl,
      model: config.model,
      apiKeyLength: config.apiKey.length,
      targetLang: config.targetLang  // 记录目标语言
    });

    if (!config.apiKey) {
      throw new Error('API配置无效');
    }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'translate' });
    const contentArray = JSON.parse(response.content);

    // 创建翻译界面
    await chrome.tabs.sendMessage(tab.id, { 
      action: 'applyTranslation', 
      translatedText: JSON.stringify([])
    });

    const batches = splitIntoBatches(contentArray, 10);
    const translatedArray = new Array(contentArray.length);
    let totalInputTokens = 0;
    let totalOutputTokens = 0;

    // 逐批并发翻译
    for (const batch of batches) {
      const batchPromises = batch.map(async (item) => {
        const result = await translateWithOpenAI(tab.id, item.text, config);
        return {
          text: result.translatedText,
          index: item.index,
          tokens: result.tokens
        };
      });

      const batchResults = await Promise.all(batchPromises);

      // 累加 token 使用量
      batchResults.forEach(result => {
        translatedArray[result.index] = {
          text: result.text,
          index: result.index
        };
        totalInputTokens += result.tokens.input;
        totalOutputTokens += result.tokens.output;
      });

      // 发送当前翻译结果和 token 统计
      await chrome.tabs.sendMessage(tab.id, { 
        action: 'applyTranslation', 
        translatedText: JSON.stringify(translatedArray.filter(Boolean)),
        tokenStats: {
          inputTokens: totalInputTokens,
          outputTokens: totalOutputTokens
        }
      });
    }
  } catch (error) {
    console.error('Translation error:', error);
    alert('翻译失败: ' + error.message);
  }
}

// 使用OpenAI API进行翻译
async function translateWithOpenAI(tabId, text, settings) {
  const config = {
    apiKey: settings.apiKey || DEFAULT_SETTINGS.apiKey,
    baseUrl: (settings.baseUrl || DEFAULT_SETTINGS.baseUrl).replace(/\/$/, ''),
    model: settings.model || DEFAULT_SETTINGS.model,
    targetLang: settings.targetLang || 'zh'
  };

  const targetLanguage = languageNames[config.targetLang] || '中文';

  console.log('Translation request config:', {
    baseUrl: config.baseUrl,
    model: config.model,
    apiKeyLength: config.apiKey.length,
    textLength: text.length
  });

  // 检查是否是短语或单词（不包含句号、感叹号、问号、换行符）
  const isPhrase = !text.match(/[.!?\n]/);
  const systemPrompt = isPhrase
    ? `You are a precise translator. Translate this word/phrase to ${targetLanguage}. Rules:
1. Return ONLY ONE most commonly used translation
2. DO NOT provide multiple meanings or explanations
3. DO NOT use any punctuation marks
4. DO NOT add any additional content
5. ONLY return the translated word/phrase
Example: For "Feature", only return "功能" instead of "特征；特点；特色"`
    : `You are a professional translator. Translate the following text to ${targetLanguage}. Maintain the original format and tone. Ensure accuracy and naturalness. Only return the translated text without any explanations or additional content.`;

  const messages = [
    {
      role: 'system',
      content: systemPrompt
    },
    {
      role: 'user',
      content: text
    }
  ];

  await new Promise(resolve => setTimeout(resolve, Math.random() * 100));

  try {
    console.log('Sending request to:', `${config.baseUrl}/chat/completions`);
    
    const requestBody = {
      model: config.model,
      messages,
      temperature: 0.3,
      max_tokens: 2000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    };
    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: errorText
      });

      let errorMessage = '翻译请求失败';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = `API错误: ${errorJson.error?.message || errorText}`;
        console.error('Parsed error details:', errorJson);
      } catch (e) {
        console.error('Failed to parse error response:', e);
      }

      await chrome.tabs.sendMessage(tabId, {
        action: 'log',
        logType: 'error',
        message: { 
          label: 'API响应错误', 
          content: errorText,
          details: {
            url: `${config.baseUrl}/chat/completions`,
            status: response.status,
            headers: Object.fromEntries(response.headers.entries())
          }
        }
      });
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('API Response data:', {
      model: data.model,
      usage: data.usage,
      choicesLength: data.choices?.length
    });

    const translatedText = data.choices[0].message.content.trim();
    console.log('Translation result length:', translatedText.length);

    return {
      translatedText,
      tokens: {
        input: data.usage.prompt_tokens,
        output: data.usage.completion_tokens
      }
    };
  } catch (error) {
    console.error('Translation error details:', {
      error: error.toString(),
      stack: error.stack,
      config: {
        baseUrl: config.baseUrl,
        model: config.model,
        apiKeyLength: config.apiKey.length
      }
    });
    throw error;
  }
}

// 处理划词翻译请求
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'translateSelection') {
    handleSelectionTranslation(request.text)
      .then(result => {
        sendResponse({ success: true, translatedText: result });
      })
      .catch(error => {
        console.error('Translation error:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true;  // 保持消息通道打开
  }
  return true;
});

// 处理划词翻译
async function handleSelectionTranslation(text) {
  try {
    console.log('Starting selection translation for text length:', text?.length);
    const settings = await chrome.storage.sync.get(['apiKey', 'baseUrl', 'model', 'targetLang']);
    console.log('Loaded settings:', {
      hasApiKey: !!settings.apiKey,
      baseUrl: settings.baseUrl,
      model: settings.model,
      targetLang: settings.targetLang  // 记录目标语言
    });

    const config = {
      apiKey: settings.apiKey || DEFAULT_SETTINGS.apiKey,
      baseUrl: (settings.baseUrl || DEFAULT_SETTINGS.baseUrl).replace(/\/$/, ''),
      model: settings.model || DEFAULT_SETTINGS.model,
      targetLang: settings.targetLang || 'zh'  // 添加目标语言设置
    };

    const targetLanguage = languageNames[config.targetLang] || '中文';

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      console.error('Invalid text input:', { text, type: typeof text });
      throw new Error('没有收到有效的文本内容');
    }

    // 检查是否是短语或单词
    const isPhrase = !text.match(/[.!?\n]/);
    const systemPrompt = isPhrase
      ? `You are a precise translator. Translate this word/phrase to ${targetLanguage}. Rules:
1. Return ONLY ONE most commonly used translation
2. DO NOT provide multiple meanings or explanations
3. DO NOT use any punctuation marks
4. DO NOT add any additional content
5. ONLY return the translated word/phrase
Example: For "Feature", only return "功能" instead of "特征；特点；特色"`
      : `You are a professional translator. Translate the following text to ${targetLanguage}. Maintain the original format and tone. Only return the translated text without any explanations.`;

    const messages = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: isPhrase ? text.trim() : `请翻译以下文本：\n${text.trim()}`
      }
    ];

    console.log('Sending selection translation request to:', `${config.baseUrl}/chat/completions`);
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        temperature: 0.1,
        max_tokens: 2000,
        presence_penalty: 0,
        frequency_penalty: 0,
        top_p: 0.95
      })
    });

    console.log('Selection translation response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Selection translation error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error('翻译请求失败: ' + errorText);
    }

    const data = await response.json();
    console.log('Selection translation response data:', {
      model: data.model,
      usage: data.usage,
      choicesLength: data.choices?.length
    });

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid API response format:', data);
      throw new Error('翻译响应格式错误');
    }

    const translatedText = data.choices[0].message.content
      .trim()
      .replace(/^请翻译以下文本：\n*/i, '')
      .replace(/^翻译结果：\n*/i, '')
      .replace(/^译文：\n*/i, '');

    console.log('Selection translation result length:', translatedText.length);

    return {
      translatedText,
      tokenStats: {
        inputTokens: data.usage.prompt_tokens,
        outputTokens: data.usage.completion_tokens
      }
    };
  } catch (error) {
    console.error('Selection translation error details:', {
      error: error.toString(),
      stack: error.stack,
      text: text?.substring(0, 100) + '...' // 只记录前100个字符
    });
    throw new Error('翻译失败: ' + error.message);
  }
}

// 修改翻译函数，只使用API返回的token统计
async function translateText(text, config) {
  const targetLanguage = languageNames[config.targetLang] || '中文';
  const messages = [
    {
      role: "system",
      content: `你是一个翻译助手。请将文本翻译成${targetLanguage}。保持文本的格式和标点符号风格，确保翻译准确、自然、地道。不要添加任何解释或额外的内容。`
    },
    {
      role: "user",
      content: text
    }
  ];

  console.log('Translation request:', {
    baseUrl: config.baseUrl,
    model: config.model,
    targetLang: targetLanguage,
    text: text.substring(0, 100) + (text.length > 100 ? '...' : '')
  });

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      messages: messages,
      temperature: 0.3,
      max_tokens: 2000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Translation error response:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText
    });
    throw new Error(`翻译请求失败: ${errorText}`);
  }

  const data = await response.json();
  console.log('Translation response data:', {
    model: data.model,
    usage: data.usage,
    choicesLength: data.choices?.length
  });

  const translatedText = data.choices[0].message.content;
  const translatedParagraphs = translatedText.split('\n').filter(p => p.trim());
  
  const result = {
    ...config,
    translatedText: translatedParagraphs[0] || translatedText,
    tokenStats: {
      inputTokens: data.usage.prompt_tokens,
      outputTokens: data.usage.completion_tokens
    }
  };

  // 发送翻译结果和 token 统计
  chrome.tabs.sendMessage(tabId, {
    action: 'applyTranslation',
    translatedText: JSON.stringify(result),
    tokenStats: {
      inputTokens: data.usage.prompt_tokens,
      outputTokens: data.usage.completion_tokens
    }
  });

  return result;
}

// 在获取设置的地方添加targetLang
async function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get({
      apiKey: '',
      baseUrl: 'https://api.openai.com/v1',
      model: 'gpt-3.5-turbo',
      targetLang: 'zh'  // 默认中文
    }, (items) => {
      resolve(items);
    });
  });
} 