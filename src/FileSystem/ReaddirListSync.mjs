import fs from "fs";

const readdirListSync = (base, dir, list) => {
  list = list || [];
  const dirpath = dir ? path.resolve(base, dir) : base;
  fs.readdirSync(dirpath).forEach((file) => {
    const filepath = path.join(dirpath, file);
    if (fs.statSync(filepath).isDirectory())
      list = readdirListSync(base, path.relative(base, filepath), list);
    else
      list.push(dir ? path.posix.join(dir, file) : path.posix.join(file));
  });
  return list;
};

export default readdirListSync;
