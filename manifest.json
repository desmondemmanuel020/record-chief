const fs   = require('fs');
const path = require('path');

process.chdir(__dirname);

const babel = require('@babel/core');

console.log('Compiling Record Chief...');
const src = fs.readFileSync('app.jsx', 'utf8');

const result = babel.transformSync(src, {
  plugins: ['@babel/plugin-transform-react-jsx'],
  filename: 'app.jsx',
});

// Vercel serves from /public by default when using a build script
const out = path.join(__dirname, 'public');
if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true });

// Copy icons
const iconsDst = path.join(out, 'icons');
if (!fs.existsSync(iconsDst)) fs.mkdirSync(iconsDst, { recursive: true });
fs.readdirSync('icons').forEach(f =>
  fs.copyFileSync(path.join('icons', f), path.join(iconsDst, f))
);

// Write app.js
fs.writeFileSync(path.join(out, 'app.js'), result.code);

// Copy manifest + sw
['manifest.json', 'sw.js'].forEach(f => {
  if (fs.existsSync(f)) fs.copyFileSync(f, path.join(out, f));
});

// Write index.html
fs.writeFileSync(path.join(out, 'index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
  <meta http-equiv="Pragma" content="no-cache"/>
  <meta http-equiv="Expires" content="0"/>

  <!-- Viewport — fullscreen, no zoom -->
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,viewport-fit=cover,user-scalable=no"/>

  <!-- PWA — makes Chrome show "Add to Home Screen" prompt -->
  <link rel="manifest" href="manifest.json"/>
  <meta name="theme-color" content="#0A0F1E"/>
  <meta name="mobile-web-app-capable" content="yes"/>

  <!-- iOS Safari — fullscreen with no browser bar -->
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
  <meta name="apple-mobile-web-app-title" content="Record Chief"/>
  <link rel="apple-touch-icon" href="icons/icon-192.png"/>
  <link rel="apple-touch-icon" sizes="152x152" href="icons/icon-192.png"/>
  <link rel="apple-touch-icon" sizes="167x167" href="icons/icon-192.png"/>
  <link rel="apple-touch-icon" sizes="180x180" href="icons/icon-192.png"/>
  <link rel="apple-touch-startup-image" href="icons/icon-512.png"/>

  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="icons/icon-32.png"/>
  <link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192.png"/>

  <!-- Social sharing -->
  <meta property="og:title" content="Record Chief"/>
  <meta property="og:description" content="Track shop sales, farm expenses and debt — built for Nigerian businesses."/>
  <meta property="og:image" content="icons/icon-512.png"/>
  <meta property="og:type" content="website"/>
  <meta name="twitter:card" content="summary"/>
  <meta name="twitter:title" content="Record Chief"/>
  <meta name="twitter:description" content="Business records for Nigerian entrepreneurs"/>

  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"/>
  <title>Record Chief</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:sans-serif;background:#1E3A8A}
    #root{min-height:100vh;background:#F8FAFC}
    #splash{position:fixed;inset:0;z-index:9999;background:linear-gradient(145deg,#1E3A8A,#1D4ED8,#2563EB);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;transition:opacity .5s}
    #splash.done{opacity:0;pointer-events:none}
    #si{font-size:64px;margin-bottom:16px;animation:p 1.5s ease-in-out infinite}
    #st{font-size:28px;font-weight:800;font-family:monospace;letter-spacing:-0.5px}
    #ss{font-size:13px;opacity:.65;margin-top:8px}
    #sl{width:120px;height:3px;background:rgba(255,255,255,.2);border-radius:2px;margin-top:24px;overflow:hidden}
    #slb{height:100%;background:#fff;border-radius:2px;animation:l 1.5s ease forwards}
    @keyframes p{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
    @keyframes l{0%{width:0}100%{width:100%}}
  </style>
</head>
<body>
  <div id="splash">
    <div id="si">📒</div>
    <div id="st">Record Chief</div>
    <div id="ss">Your business records, organized</div>
    <div id="sl"><div id="slb"></div></div>
  </div>
  <div id="root"></div>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="app.js"></script>
  <script>
    var s=document.getElementById('splash');
    if(s){s.classList.add('done');setTimeout(function(){s.parentNode&&s.parentNode.removeChild(s)},600)}
    // Pre-cache fonts when online
    if (navigator.onLine) {
      fetch('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap')
        .catch(() => {});
    }
    if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').then(reg => {
          setInterval(() => reg.update(), 30000);
          reg.addEventListener('updatefound', () => {
            const w = reg.installing;
            w.addEventListener('statechange', () => {
              if (w.state === 'installed' && navigator.serviceWorker.controller) {
                w.postMessage({ type: 'SKIP_WAITING' });
              }
            });
          });
        }).catch(() => {});
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!refreshing) { refreshing = true; window.location.reload(); }
        });
  </script>
</body>
</html>`);

console.log('Done! Output in /public');
