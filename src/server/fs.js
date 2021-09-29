const fs = require('fs/promises');
const syncFs = require('fs');

async function write(pathname, data) {
  const fd = await fs.open(pathname, 'w');
  await fs.writeFile(fd, Buffer.from(data));
  await fd.close();
}

async function read(pathname, data) {
  const fd = await fs.open(pathname, 'r');
  const buffer = await fs.readFile(fd);
  await fd.close();

  return buffer.toString();
}

function find(path) {
  if (syncFs.existsSync(path))
    return true;
  else
    return false;
}

module.exports = {
  write, read, find
};