import chalk from "chalk";
import { Command } from "commander";
import { bumpVersion, getVersion } from "./lib/bump/bump.service";

const program = new Command();

const run = async () => {
  program
    .option("-n, --change:versionname <name>", "Change versionName")
    .option("-c, --change:versioncode <code>", "Change versionCode")
    .option("-p, --project <project>", "Input Project Name")
    .option("-s, --debug", "Input Project Name");

  program.version("0.0.1");
  program.parse(process.argv);

  const opts = program.opts();
  if (Object.keys(opts)?.length) {
    if (!opts.debug) {
      bumpVersion(
        opts["change:versionname"],
        opts["change:versioncode"],
        opts.project
      );
    } else {
      getVersion(opts.project);
    }
  } else {
    console.log(chalk.bold.red(`-- Parameter not informed --`));
  }
};

run();
