"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeFile = exports.renameFile = exports.readFile = exports.readDir = exports.moveDir = exports.makeDir = exports.default = exports.copyFile = exports.copyDir = exports.cleanDir = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _glob = _interopRequireDefault(require("glob"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _rimraf = _interopRequireDefault(require("rimraf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readFile = file => new Promise((resolve, reject) => {
  _fs.default.readFile(file, "utf8", (err, data) => err ? reject(err) : resolve(data));
});

exports.readFile = readFile;

const writeFile = (file, contents) => new Promise((resolve, reject) => {
  _fs.default.writeFile(file, contents, "utf8", err => err ? reject(err) : resolve());
});

exports.writeFile = writeFile;

const renameFile = (source, target) => new Promise((resolve, reject) => {
  _fs.default.rename(source, target, err => err ? reject(err) : resolve());
});

exports.renameFile = renameFile;

const copyFile = (source, target) => new Promise((resolve, reject) => {
  let cbCalled = false;

  function done(err) {
    if (!cbCalled) {
      cbCalled = true;

      if (err) {
        reject(err);
      } else {
        resolve();
      }
    }
  }

  const rd = _fs.default.createReadStream(source);

  rd.on("error", err => done(err));

  const wr = _fs.default.createWriteStream(target);

  wr.on("error", err => done(err));
  wr.on("close", err => done(err));
  rd.pipe(wr);
});

exports.copyFile = copyFile;

const readDir = (pattern, options) => new Promise((resolve, reject) => (0, _glob.default)(pattern, options, (err, result) => err ? reject(err) : resolve(result)));

exports.readDir = readDir;

const makeDir = name => new Promise((resolve, reject) => {
  try {
    _mkdirp.default.sync(name);

    resolve();
  } catch (err) {
    reject(err);
  }
});

exports.makeDir = makeDir;

const moveDir = async (source, target) => {
  const dirs = await readDir("**/*.*", {
    cwd: source,
    nosort: true,
    dot: true
  });
  await Promise.all(dirs.map(async dir => {
    const from = _path.default.resolve(source, dir);

    const to = _path.default.resolve(target, dir);

    await makeDir(_path.default.dirname(to));
    await renameFile(from, to);
  }));
};

exports.moveDir = moveDir;

const copyDir = async (source, target) => {
  const dirs = await readDir("**/*.*", {
    cwd: source,
    nosort: true,
    dot: true
  });
  await Promise.all(dirs.map(async dir => {
    const from = _path.default.resolve(source, dir);

    const to = _path.default.resolve(target, dir);

    await makeDir(_path.default.dirname(to));
    await copyFile(from, to);
  }));
};

exports.copyDir = copyDir;

const cleanDir = (pattern, options) => new Promise((resolve, reject) => (0, _rimraf.default)(pattern, {
  glob: options
}, (err, result) => err ? reject(err) : resolve(result)));

exports.cleanDir = cleanDir;
var _default = {
  readFile,
  writeFile,
  renameFile,
  copyFile,
  readDir,
  makeDir,
  copyDir,
  moveDir,
  cleanDir
};
exports.default = _default;