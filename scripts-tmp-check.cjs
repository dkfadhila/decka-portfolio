const fs = require('fs');
const auth = JSON.parse(fs.readFileSync('C:/Users/Administrator/AppData/Roaming/xdg.data/com.vercel.cli/auth.json', 'utf8'));
const TOKEN = auth.token;
const https = require('https');

function get(path) {
  return new Promise((resolve, reject) => {
    https.get({ hostname: 'api.vercel.com', path, headers: { Authorization: `Bearer ${TOKEN}` } }, (res) => {
      let s = '';
      res.on('data', (d) => (s += d));
      res.on('end', () => resolve(s));
    }).on('error', reject);
  });
}

(async () => {
  const d = JSON.parse(await get('/v13/deployments/dpl_4dipJiC83K8QZMtWfur7dHw7sybg'));
  console.log('meta:', JSON.stringify(d.meta || {}, null, 1));
  console.log('projectId:', d.projectId || d.meta?.projectId);
})();
