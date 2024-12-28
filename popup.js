document.addEventListener('DOMContentLoaded', function() {
  // Load saved settings
  chrome.storage.sync.get({
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-3.5-turbo',
    targetLang: 'zh'  // Default to Chinese
  }, function(items) {
    document.getElementById('apiKey').value = items.apiKey;
    document.getElementById('baseUrl').value = items.baseUrl;
    document.getElementById('model').value = items.model;
    document.getElementById('targetLang').value = items.targetLang;
  });

  // Save settings
  document.getElementById('saveSettings').addEventListener('click', function() {
    const apiKey = document.getElementById('apiKey').value;
    const baseUrl = document.getElementById('baseUrl').value;
    const model = document.getElementById('model').value;
    const targetLang = document.getElementById('targetLang').value;

    chrome.storage.sync.set({
      apiKey: apiKey,
      baseUrl: baseUrl,
      model: model,
      targetLang: targetLang
    }, function() {
      // Show success message
      const status = document.createElement('div');
      status.textContent = 'Settings saved';
      status.className = 'success-message';
      document.body.appendChild(status);
      setTimeout(function() {
        status.remove();
      }, 2000);
    });
  });
}); 