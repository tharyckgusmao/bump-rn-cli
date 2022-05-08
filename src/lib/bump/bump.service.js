import chalk from "chalk";
import BumpFileManager from "./bump.manager";

export const bumpVersion = async (
  versionName = null,
  versioncode = null,
  projectName = null
) => {
  try {
    const fileBump = new BumpFileManager("android", projectName);
    await fileBump.init();
    if (versionName) await fileBump.bump("name", versionName);
    if (versioncode) await fileBump.bump("code", versioncode);
    await fileBump.showBump();

    const fileBumpIos = new BumpFileManager("ios", projectName);
    await fileBumpIos.init();
    if (versionName) await fileBumpIos.bump("name", versionName);
    if (versioncode) await fileBumpIos.bump("code", versioncode);
    await fileBumpIos.showBump();
  } catch (error) {
    console.log(chalk.bold.red("ERROR"));
    console.log(error);
  }
};

export const getVersion = async (projectName = null) => {
  const fileBump = new BumpFileManager("android", projectName);
  await fileBump.init();
  await fileBump.showBump();
  const fileBumpIos = new BumpFileManager("ios", projectName);
  await fileBumpIos.init();
  await fileBumpIos.showBump();
};

export default bumpVersion;
