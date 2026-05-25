const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const standaloneDir = path.join(rootDir, '.next', 'standalone');
const serverPath = path.join(standaloneDir, 'server.js');

const copies = [
  {
    from: path.join(rootDir, '.next', 'static'),
    to: path.join(standaloneDir, '.next', 'static'),
    label: '.next/static',
  },
  {
    from: path.join(rootDir, 'public'),
    to: path.join(standaloneDir, 'public'),
    label: 'public',
  },
];

function assertExists(targetPath, message) {
  if (!fs.existsSync(targetPath)) {
    console.error(message);
    process.exit(1);
  }
}

function copyDirectory({ from, to, label }) {
  assertExists(from, `Missing ${label}. Run "yarn build" before starting standalone preview.`);
  fs.rmSync(to, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true });
  console.log(`Copied ${label} to ${path.relative(rootDir, to)}`);
}

assertExists(serverPath, 'Missing .next/standalone/server.js. Run "yarn build" first.');
copies.forEach(copyDirectory);

const port = process.env.PORT || '3000';
console.log(`Starting standalone Next.js server at http://localhost:${port}`);

const server = spawn(process.execPath, [serverPath], {
  cwd: standaloneDir,
  env: {
    ...process.env,
    PORT: port,
  },
  stdio: 'inherit',
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.kill(signal);
  });
}

server.on('exit', (code, signal) => {
  if (signal) {
    process.exit(0);
  }

  process.exit(code || 0);
});
