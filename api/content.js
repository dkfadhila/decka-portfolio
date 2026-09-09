/**
 * Vercel Serverless Function — POST /api/content
 * Receives full content payload, commits to GitHub, triggers Vercel deploy.
 */

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end(); }
  if (req.method !== 'POST') { res.statusCode = 405; return res.end(JSON.stringify({ error: 'POST only.' })); }

  try {
    // Auth
    const expected = process.env.ADMIN_PASSWORD;
    const provided = req.headers['x-admin-password'];
    if (!expected) { res.statusCode = 500; return res.end(JSON.stringify({ error: 'ADMIN_PASSWORD not set.' })); }
    if (!provided || provided !== expected) { res.statusCode = 401; return res.end(JSON.stringify({ error: 'Invalid password.' })); }

    // Read body manually (Vercel Rust runtime's req.body getter crashes on some payloads)
    const rawBody = await readBody(req);
    let data;
    try {
      data = JSON.parse(rawBody);
    } catch (e) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: 'Invalid JSON body.' }));
    }

    for (const k of ['projects', 'work', 'content', 'creative']) {
      if (!Array.isArray(data[k])) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: `Missing field: ${k}` }));
      }
    }

    // Config
    const REPO = process.env.GITHUB_REPO || 'dkfadhila/decka-portfolio';
    const BRANCH = process.env.GITHUB_BRANCH || 'master';
    const FILE_PATH = process.env.CONTENT_PATH || 'public/content.json';
    const token = process.env.GITHUB_TOKEN;
    if (!token) { res.statusCode = 500; return res.end(JSON.stringify({ error: 'No GITHUB_TOKEN.' })); }

    const payload = {
      version: 1,
      updatedAt: new Date().toISOString(),
      projects: data.projects,
      work: data.work,
      content: data.content,
      creative: data.creative,
    };

    const contentStr = JSON.stringify(payload, null, 2) + '\n';
    const apiBase = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;
    const ghHeaders = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'dktirta-cms-sync',
    };

    // Get current SHA (needed for update)
    let sha = undefined;
    const getRes = await fetch(`${apiBase}?ref=${encodeURIComponent(BRANCH)}`, { headers: ghHeaders });
    if (getRes.status === 200) {
      const meta = await getRes.json();
      sha = meta.sha;
    } else if (getRes.status !== 404) {
      const t = await getRes.text();
      res.statusCode = 502; return res.end(JSON.stringify({ error: `GitHub GET ${getRes.status}: ${t.slice(0, 200)}` }));
    }

    // PUT updated content
    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers: { ...ghHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `cms: sync ${new Date().toISOString().slice(0, 16)} UTC`,
        content: Buffer.from(contentStr, 'utf8').toString('base64'),
        branch: BRANCH,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!putRes.ok) {
      const t = await putRes.text();
      res.statusCode = 502; return res.end(JSON.stringify({ error: `GitHub PUT ${putRes.status}: ${t.slice(0, 200)}` }));
    }

    const put = await putRes.json();
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true, commit: put.commit?.sha?.slice(0, 7) || null }));
  } catch (e) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: `Handler error: ${e?.message || String(e)}` }));
  }
}
