import type { ErrorProps } from "../@types/types";
import { COMMANDS } from "../constants";
import { run } from "./run.service";

export async function errorHandler(error: ErrorProps) {
  switch (error.code) {
    case 1:
      console.error("\nVocê não tem nada para commitar 🤔\n");
      const { response } = await run(COMMANDS.GIT_STATUS);
      console.log(response);
      break;
    default:
      console.error("\nAlgo deu errado ao tentar fazer o commit 😢");
  }
}
