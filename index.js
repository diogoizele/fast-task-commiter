const removeEnterKeyPress = (command) => command.replace("\n", "");

const getSubBranchs = (branch) => branch.split("/");

function run(command, clean = true) {
  const exec = require("child_process").exec;

  return new Promise((resolve, reject) => {
    try {
      exec(command, (error, stdout) => {
        if (error) {
          !clean && console.error(`Error code ${error.code}: ${error.message}`);
          reject(error);
          return;
        }

        resolve({
          command,
          response: stdout,
        });
      });
    } catch (e) {
      !clean && console.error("Vocé não tem o git instalado");
      reject(e);
    }
  });
}

run("git branch --show-current")
  .then(({ response }) => removeEnterKeyPress(response))
  .then((branch) => getSubBranchs(branch) ?? ["master"])
  .then((subBranches) =>
    subBranches.find((subBranch) => !isNaN(Number(subBranch)))
  )
  .then((task) => task ?? "master")
  .then((task) => {
    const [, , ...rawArgs] = process.argv;

    const commitMessage = rawArgs.join(" ");

    const [type, description] = commitMessage.split(":");

    const hasMasterHash = task === "master" ? "" : `#`;

    const commit = `git commit -m "${type}(${hasMasterHash}${task}): ${description.trim()}"`;

    run(commit)
      .then(() => {
        console.log("\nCommit realizado com sucesso 🔥");
      })
      .catch(({ code }) => {
        switch (code) {
          case 1:
            console.error("\nVocê não tem nada para commitar 🤔\n");
            run("git status").then(({ response }) => console.log(response));
            break;
          default:
            console.error("Algo deu errado 😢");
            break;
        }
      });
  });
