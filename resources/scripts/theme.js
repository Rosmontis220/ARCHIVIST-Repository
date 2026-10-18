  (function () {
    const THEMES = ['dark', 'light'];
    const NAMES = { dark: '暗色', light: '亮色' };
    const ICONS = { dark: '🌙', light: '☀️' };
    /* 主题曲随主题切换：暗色 Soul Sanctum / 亮色 Whispering Vaults */
    const TRACKS = {
      dark: 'resources/music/Soul Sanctum.mp3',
      light: 'resources/music/Whispering Vaults.mp3'
    };
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const music = document.getElementById('archive-music');

    const current = () => THEMES.find((t) => root.classList.contains(t)) || 'light';

    const applyTrack = (theme) => {
      const file = TRACKS[theme] || TRACKS.light;
      if (!music || (music.getAttribute('src') || '').indexOf(file) !== -1) return;
      const wasPlaying = !music.paused && !music.muted && window.__archiveSoundAllowed !== false;
      music.setAttribute('src', file);
      try { music.load(); } catch (e) { /* load unavailable */ }
      if (wasPlaying) {
        const attempt = music.play();
        if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
      }
    };

    const apply = (theme, persist) => {
      THEMES.forEach((t) => root.classList.toggle(t, t === theme));
      if (icon) icon.textContent = ICONS[theme] || ICONS.dark;
      if (toggle) toggle.setAttribute('aria-label', '切换主题（当前：' + (NAMES[theme] || theme) + '）');
      if (persist) {
        try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
      }
      applyTrack(theme);
    };

    apply(current(), false);

    if (toggle) {
      toggle.addEventListener('click', () => {
        const i = THEMES.indexOf(current());
        apply(THEMES[(i + 1) % THEMES.length], true);
      });
    }
  })();
