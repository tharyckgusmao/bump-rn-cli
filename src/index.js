import chalk from "chalk";
import { Command } from "commander";
import { bumpVersion } from "./lib/bump/bump.service";

const program = new Command();

const run = async () => {
  program
    .option("-N, --change:versionname <name>", "Change versionName")
    .option("-C, --change:versioncode <name>", "Change versionCode")
    .option("-B, --debug:preview", "Show versions in project");

  program.version("0.0.1");
  program.parse(process.argv);

  const opts = program.opts();

  if (Object.keys(opts)?.length) {
    bumpVersion(opts["change:versionname"], opts["change:versioncode"]);
  } else {
    console.log(chalk.bold.red(`-- Parameter not informed --`));
  }
};

run();
