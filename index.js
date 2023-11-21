import { program } from "commander";
import compareObjects from "./src/comparing.js";
import { parseFile } from "./src/parsing.js";
import selectFormatter from "./src/formatters/index.js";

const runProgram = () => {
  program.version("0.0.1", "-V, --version", "output the version number");
  program.argument("<filepath1>");
  program.argument("<filepath2>");
  program.option("-f, --format <type>", "output format", "stylish");
  program.description(
    "Compares two configuration files and shows a difference."
  );
  program.helpOption("-h, --help", "output usage information");
  program.action((filepath1, filepath2, type) => {
    const file1 = parseFile(filepath1);
    const file2 = parseFile(filepath2);
    const filesDifferences = compareObjects(file1, file2);
    const formatter = selectFormatter(type.format);
    console.log(formatter(filesDifferences));
  });

  program.parse();
};

export default runProgram;
