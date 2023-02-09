import { errorHandler, run } from "./services";
import { getSubBranches, removeEnterKeyPress } from "./utils";
import { COMMANDS, CC_TYPES } from "./constants";

(async () => {
  try {
    const { response } = await run(COMMANDS.SHOW_BRANCH);
    const removeEnterCharacter = removeEnterKeyPress(response);
    const subBranches = getSubBranches(removeEnterCharacter);
    const [, , ...rawArgs] = process.argv;
    const hasTaskId = subBranches.find(
      (subBranch) => !isNaN(Number(subBranch))
    );
    const commitContent = rawArgs.join(" ");
    const [type = "", description = ""] = commitContent.split(":");
    const [rawType = "", ...customScope] = type.split(" ");

    let scope = "";
    let commit = commitContent;

    if (customScope.length === 0) {
      if (hasTaskId) scope = `#${hasTaskId}`;
      else {
        for (let i = subBranches.length - 1; i >= 0; i--) {
          const conventionalCommitsTypes = Object.values(CC_TYPES);
          const item = subBranches[i];

          if (!conventionalCommitsTypes.includes(item)) {
            scope = item;
            break;
          }
        }
      }

      commit = `${type.trim()}(${scope.trim()}): ${description.trim()}`;
    } else {
      commit = `${rawType.trim()}(${customScope
        .join("-")
        .trim()}): ${description.trim()}`;
    }

    try {
      const { response } = await run(`git commit -m "${commit}"`);

      console.log("\nCommit realizado com sucesso 🔥:\n");
      console.log(commit, "\n");
      console.log(response);
    } catch (error: any) {
      await errorHandler(error);
    }
  } catch (error: any) {
    console.log("\nAlgo deu errado ao tentar fazer o commit 😢");
  }
})();
