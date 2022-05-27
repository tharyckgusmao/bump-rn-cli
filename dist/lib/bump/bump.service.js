"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVersion = exports.default = exports.bumpVersion = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _bump = _interopRequireDefault(require("./bump.manager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bumpVersion = async (versionName = null, versioncode = null, projectName = null) => {
  try {
    const fileBump = new _bump.default("android", projectName);
    await fileBump.init();
    if (versionName) await fileBump.bump("name", versionName);
    if (versioncode) await fileBump.bump("code", versioncode);
    await fileBump.showBump();
    const fileBumpIos = new _bump.default("ios", projectName);
    await fileBumpIos.init();
    if (versionName) await fileBumpIos.bump("name", versionName);
    if (versioncode) await fileBumpIos.bump("code", versioncode);
    await fileBumpIos.showBump();
  } catch (error) {
    console.log(_chalk.default.bold.red("ERROR"));
    console.log(error);
  }
};

exports.bumpVersion = bumpVersion;

const getVersion = async (projectName = null) => {
  const fileBump = new _bump.default("android", projectName);
  await fileBump.init();
  await fileBump.showBump();
  const fileBumpIos = new _bump.default("ios", projectName);
  await fileBumpIos.init();
  await fileBumpIos.showBump();
};

exports.getVersion = getVersion;
var _default = bumpVersion;
exports.default = _default;