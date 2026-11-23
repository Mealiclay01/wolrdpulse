const https = require('https');

const host = "wolrdpulse.app";
const key = "0b82e987c12f46e3a0937da931980838";
const keyLocation = `https://${host}/${key}.txt`;

const locales = ["en", "ar", "fr", "de", "ru", "zh", "ko", "ja", "es"];
const routes = ["", "/features", "/developer", "/privacy", "/terms"];

const urlList = [];
locales.forEach(loc => {
  routes.forEach(r => {
    urlList.push(`https://${host}/${loc}${r}`);
  });
});

const payload = JSON.stringify({
  host: host,
  key: key,
  keyLocation: keyLocation,
  urlList: urlList
});

console.log(`Submitting ${urlList.length} clean URLs to IndexNow...`);

function submitToIndexNow(endpoint) {
  const url = new URL(endpoint);
  const options = {
    hostname: url.hostname,
    port: 443,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload),
      'User-Agent': 'WolrdPulse-IndexNow/1.0'
    }
  };

  const req = https.request(options, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log(`[${url.hostname}] Status: ${res.statusCode} - ${res.statusMessage || ''}`);
      if (body) console.log(`Response: ${body}`);
    });
  });

  req.on('error', (e) => {
    console.error(`[${url.hostname}] Error:`, e.message);
  });

  req.write(payload);
  req.end();
}

submitToIndexNow("https://api.indexnow.org/indexnow");
submitToIndexNow("https://www.bing.com/indexnow");
submitToIndexNow("https://yandex.com/indexnow");
