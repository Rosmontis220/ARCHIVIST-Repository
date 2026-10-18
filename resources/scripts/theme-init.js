    (function () {
      var stored = null;
      try { stored = localStorage.getItem('theme'); } catch (e) { /* storage unavailable */ }
      var theme = stored || 'light'; // 默认亮色
      if (theme === 'light') document.documentElement.classList.add('light');
    })();
  
