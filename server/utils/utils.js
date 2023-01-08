import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const namePaths = {
  First: "data-first-names.txt",
  Last: "data-last-names.txt",
};

export const generateRandomName = (namePath) => {
  let basepath = path.join(__dirname, "../datasets");
  let fullpath = path.join(basepath, namePath);

  let names = fs
    .readFileSync(fullpath, "utf-8", function (err, data) {
      return data;
    })
    .split(",");

  // console.log("got names");

  return names[Math.floor(Math.random() * (names.length - 1 - 0) + 0)];
};

// console.log(generateRandomName(namePaths.First));
// console.log("starting utils");
