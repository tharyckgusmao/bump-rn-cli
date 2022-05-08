"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.bumpVersion = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _bump = _interopRequireDefault(require("./bump.manager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bumpVersion = async (versionName = null, versioncode = null) => {
  try {
    const fileBump = new _bump.default("android", "project");
    await fileBump.init();
    if (versionName) await fileBump.bump("name", versionName);
    if (versioncode) await fileBump.bump("code", versioncode);
    await fileBump.showBump();
    const fileBumpIos = new _bump.default("ios", "project");
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
var _default = bumpVersion;
exports.default = _default;