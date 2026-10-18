    (function () {
      var stored = null;
      // 键名带版本：默认主题由暗改亮时作废旧偏好，让老访客也落到新默认
      try { stored = localStorage.getItem('theme-v2'); } catch (e) { /* storage unavailable */ }
      var theme = stored || 'light'; // 默认亮色
      if (theme === 'light') document.documentElement.classList.add('light');
    })();
  
