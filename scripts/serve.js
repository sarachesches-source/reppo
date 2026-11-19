// Tiny zero-dependency static server for local testing: `npm start`, then open http://localhost:5173
// To try it on your phone over Wi-Fi, open http://<your-PC's-local-IP>:5173 (install and offline
// mode need HTTPS, so use the deployed site for those).
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT) || 5173;
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

http
  .createServer((req, res) => {
    let urlPath;
    try {
      urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    } catch {
      res.writeHead(400).end("Bad request");
      return;
    }
    let file = path.resolve(root, "." + urlPath);
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    if (urlPath.endsWith("/")) file = path.join(file, "index.html");
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404).end("Not found");
        return;
      }
      res.writeHead(200, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
        "Cache-Control": "no-cache",
      });
      res.end(data);
    });
  })
  .listen(port, () => console.log(`Reppo running at http://localhost:${port}`));
