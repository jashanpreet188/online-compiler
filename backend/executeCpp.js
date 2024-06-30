const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}${process.platform === "win32" ? ".exe" : ".out"}`);

  return new Promise((resolve, reject) => {
    const command = process.platform === "win32"
      ? `g++ ${filepath} -o ${outPath} && ${outPath} < ${inputPath}`
      : `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputPath}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};

module.exports = {
  executeCpp,
};
