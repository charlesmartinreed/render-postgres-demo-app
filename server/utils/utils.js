import path from "path";

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

  return names[Math.floor(Math.random() * (names.length - 1 - 0) + 0)];
};
