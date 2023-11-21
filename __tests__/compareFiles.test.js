import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import yaml from "js-yaml";
import compareObjects from "../src/comparing.js";
import stylish from "../src/formatters/stylish.js";
import plain from "../src/formatters/plain.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), "utf-8");

const file1Read = readFile("file1.json");
const file1 = JSON.parse(file1Read);
const file2Read = readFile("file2.json");
const file2 = JSON.parse(file2Read);
const compareJSON = compareObjects(file1, file2);
const expectStylish = readFile("resultStylish.txt");
const expectPlain = readFile("resultPlain.txt");

const file1ReadYaml1 = yaml.load(readFile("filepath1.yml"));
const file2ReadYaml2 = yaml.load(readFile("filepath2.yml"));
const compareYML = compareObjects(file1ReadYaml1, file2ReadYaml2);

test.each([
  { file: plain(compareJSON), expected: expectPlain },
  { file: plain(compareYML), expected: expectPlain },
])("test plain formatter", ({ file, expected }) => {
  expect(file).toBe(expected);
});

test.each([
  { file: stylish(compareJSON), expected: expectStylish },
  { file: stylish(compareYML), expected: expectStylish },
])("test stylish formatter", ({ file, expected }) => {
  expect(file).toBe(expected);
});
