"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

var _commander = require("commander");

var _bump = require("./lib/bump/bump.service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const program = new _commander.Command();

const run = async () => {
  var _Object$keys;

  program.option("-N, --change:versionname <name>", "Change versionName").option("-C, --change:versioncode <name>", "Change versionCode").option("-B, --debug:preview", "Show versions in project");
  program.version("0.0.1");
  program.parse(process.argv);
  const opts = program.opts();

  if ((_Object$keys = Object.keys(opts)) !== null && _Object$keys !== void 0 && _Object$keys.length) {
    (0, _bump.bumpVersion)(opts["change:versionname"], opts["change:versioncode"]);
  } else {
    console.log(_chalk.default.bold.red(`-- Parameter not informed --`));
  }
};

run();