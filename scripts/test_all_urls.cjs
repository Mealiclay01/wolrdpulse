const https = require('https');

const host = "https://wolrdpulse.app";
const locales = ["ar", "en", "fr", "de", "ru", "zh", "ko", "ja", "es"];
const routes = ["", "/features", "/developer", "/privacy", "/terms"];
const flatRoutes = ["/features", "/developer", "/privacy", "/terms", "/robots.txt", "/sitemap.xml", "/llms.txt", "/api/status", "/api/mcp", "/api/dns?name=google.com", "/api/ssl?domain=google.com", "/api/ping?url=https://google.com"];

const allUrls = [];
locales.forEach(loc => {
  routes.forEach(r => {
    allUrls.push(`${host}/${loc}${r}`);
  });
});
allUrls.push(host);
flatRoutes.forEach(r => allUrls.push(`${host}${r}`));

console.log(`Testing ${allUrls.length} live URLs on wolrdpulse.app...`);

let done = 0;
let errors = [];
let redirects = [];
let success = [];

function checkUrl(url) {
  https.get(url, (res) => {
    const status = res.statusCode;
    if (status >= 500) {
      errors.push({ url, status, headers: res.headers });
    } else if (status >= 300 && status < 400) {
      redirects.push({ url, status, location: res.headers.location });
    } else if (status === 200) {
      success.push({ url, status });
    } else {
      errors.push({ url, status });
    }
    done++;
    if (done === allUrls.length) {
      console.log(`\n=== RESULTS ===`);
      console.log(`Success (200): ${success.length}`);
      console.log(`Redirects (3xx): ${redirects.length}`);
      console.log(`Errors/404s/5xx: ${errors.length}`);
      if (redirects.length > 0) {
        console.log(`\n--- Redirects ---`);
        redirects.forEach(r => console.log(`${r.status} ${r.url} -> ${r.location}`));
      }
      if (errors.length > 0) {
        console.log(`\n--- Errors ---`);
        errors.forEach(e => console.log(`${e.status} ${e.url}`));
      }
    }
  }).on('error', (err) => {
    errors.push({ url, status: 'CONN_ERR', error: err.message });
    done++;
    if (done === allUrls.length) {
      console.log(`\nDone with errors.`);
    }
  });
}

allUrls.forEach(checkUrl);
