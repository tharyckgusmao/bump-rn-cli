"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _fs = require("../../utils/fs");

var _bump = require("./bump.const");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BumpFileManager {
  constructor(platform = "android", nameProject = null) {
    this.nameProject = nameProject;
    this.platform = platform;
    this.isAndroid = platform === "android";
    this.isIos = platform === "ios";
    this.content = null;
  }

  async init() {
    var _this$paramaters, _this$paramaters$code, _this$paramaters2, _this$paramaters2$nam;

    this.path = this.isAndroid ? _bump.PATH_ANDROID : _bump.PATH_IOS.replace("<projectname>", this.nameProject);
    this.paramaters = this.isAndroid ? {
      code: _bump.REGEX_ANDROID_VERSIONCODE,
      name: _bump.REGEX_ANDROID_VERSIONNAME
    } : {
      code: _bump.REGEX_IOS_APPBUILD,
      name: _bump.REGEX_IOS_APPVERSION
    };
    await this.read();
    this.version = {
      code: this.matchFirst((_this$paramaters = this.paramaters) === null || _this$paramaters === void 0 ? void 0 : (_this$paramaters$code = _this$paramaters.code) === null || _this$paramaters$code === void 0 ? void 0 : _this$paramaters$code.regex),
      name: this.matchFirst((_this$paramaters2 = this.paramaters) === null || _this$paramaters2 === void 0 ? void 0 : (_this$paramaters2$nam = _this$paramaters2.name) === null || _this$paramaters2$nam === void 0 ? void 0 : _this$paramaters2$nam.regex)
    };
    this.bumpVersion = {
      code: null,
      name: null
    };
  }

  matchFirst(regex = null) {
    var _this$content$match;

    return ((_this$content$match = this.content.match(regex)) === null || _this$content$match === void 0 ? void 0 : _this$content$match[0]) || null;
  }

  async read() {
    if (!this.content) {
      this.content = await (0, _fs.readFile)(this.path);
    }

    return this.content;
  }

  async bump(mode = "name", value = 0) {
    var _this$paramaters3, _this$paramaters3$, _this$paramaters4, _this$paramaters4$mod;

    this.content = this.content.replace((_this$paramaters3 = this.paramaters) === null || _this$paramaters3 === void 0 ? void 0 : (_this$paramaters3$ = _this$paramaters3[`${mode}`]) === null || _this$paramaters3$ === void 0 ? void 0 : _this$paramaters3$.regex, // eslint-disable-next-line security/detect-object-injection
    `${(_this$paramaters4 = this.paramaters) === null || _this$paramaters4 === void 0 ? void 0 : (_this$paramaters4$mod = _this$paramaters4[mode]) === null || _this$paramaters4$mod === void 0 ? void 0 : _this$paramaters4$mod.preffix}${this.isAndroid && mode !== "code" ? `"${value}"` : value}`);
    await this.write();
  }

  async extractBump() {
    var _this$paramaters5, _this$paramaters5$cod, _this$paramaters6, _this$paramaters6$nam;

    this.bumpVersion = {
      code: this.matchFirst((_this$paramaters5 = this.paramaters) === null || _this$paramaters5 === void 0 ? void 0 : (_this$paramaters5$cod = _this$paramaters5.code) === null || _this$paramaters5$cod === void 0 ? void 0 : _this$paramaters5$cod.regex),
      name: this.matchFirst((_this$paramaters6 = this.paramaters) === null || _this$paramaters6 === void 0 ? void 0 : (_this$paramaters6$nam = _this$paramaters6.name) === null || _this$paramaters6$nam === void 0 ? void 0 : _this$paramaters6$nam.regex)
    };
  }

  async showBump() {
    await this.extractBump();
    console.log(_chalk.default.bold.red("==========SHOW BUMP=========="));
    console.log(_chalk.default.bold.green(`${this.isAndroid ? "Android" : "IOS"}`));
    console.log(_chalk.default.bold.blue("*********************************"));
    console.log(`${_chalk.default.blue(this.version.code)}${_chalk.default.green(`  ~>  ${this.bumpVersion.code}`)}`);
    console.log(`${_chalk.default.blue(this.version.name)}${_chalk.default.green(`  ~>  ${this.bumpVersion.name}`)}`);
    console.log(_chalk.default.blue("*********************************"));
  }

  async write() {
    if (this.content) {
      (0, _fs.writeFile)(this.path, this.content);
    }
  }

}

var _default = BumpFileManager;
exports.default = _default;