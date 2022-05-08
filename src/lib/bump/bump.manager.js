import chalk from "chalk";
import { readFile, writeFile } from "../../utils/fs";
import {
  PATH_ANDROID,
  PATH_IOS,
  REGEX_ANDROID_VERSIONCODE,
  REGEX_ANDROID_VERSIONNAME,
  REGEX_IOS_APPBUILD,
  REGEX_IOS_APPVERSION,
} from "./bump.const";

class BumpFileManager {
  constructor(platform = "android", nameProject = null) {
    this.nameProject = nameProject;
    this.platform = platform;
    this.isAndroid = platform === "android";
    this.isIos = platform === "ios";

    this.content = null;
  }

  async init() {
    this.path = this.isAndroid
      ? PATH_ANDROID
      : PATH_IOS.replace("<projectname>", this.nameProject);
    this.paramaters = this.isAndroid
      ? {
          code: REGEX_ANDROID_VERSIONCODE,
          name: REGEX_ANDROID_VERSIONNAME,
        }
      : {
          code: REGEX_IOS_APPBUILD,
          name: REGEX_IOS_APPVERSION,
        };

    await this.read();
    this.version = {
      code: this.matchFirst(this.paramaters?.code?.regex),
      name: this.matchFirst(this.paramaters?.name?.regex),
    };
    this.bumpVersion = {
      code: null,
      name: null,
    };
  }

  matchFirst(regex = null) {
    return this.content.match(regex)?.[0] || null;
  }

  async read() {
    if (!this.content) {
      this.content = await readFile(this.path);
    }
    return this.content;
  }

  async bump(mode = "name", value = 0) {
    this.content = this.content.replace(
      this.paramaters?.[`${mode}`]?.regex,
      // eslint-disable-next-line security/detect-object-injection
      `${this.paramaters?.[mode]?.preffix}${
        this.isAndroid && mode !== "code" ? `"${value}"` : value
      }`
    );

    await this.write();
  }

  async extractBump() {
    this.bumpVersion = {
      code: this.matchFirst(this.paramaters?.code?.regex),
      name: this.matchFirst(this.paramaters?.name?.regex),
    };
  }

  async showBump() {
    await this.extractBump();

    console.log(chalk.bold.red("==========SHOW BUMP=========="));
    console.log(chalk.bold.green(`${this.isAndroid ? "Android" : "IOS"}`));
    console.log(chalk.bold.blue("*********************************"));
    console.log(
      `${chalk.blue(this.version.code)}${chalk.green(
        `  ~>  ${this.bumpVersion.code}`
      )}`
    );
    console.log(
      `${chalk.blue(this.version.name)}${chalk.green(
        `  ~>  ${this.bumpVersion.name}`
      )}`
    );
    console.log(chalk.blue("*********************************"));
  }

  async write() {
    if (this.content) {
      writeFile(this.path, this.content);
    }
  }
}

export default BumpFileManager;
