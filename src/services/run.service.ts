import { exec } from "../utils";

import type { RunProps } from "../@types/types";

export function run(command: string, clean = true): Promise<RunProps> {
  return new Promise((resolve, reject) => {
    try {
      exec(command, (error, response) => {
        if (error) {
          !clean && console.error(`Error code ${error.code}: ${error.message}`);
          reject(error);
          return;
        }

        resolve({
          command,
          response,
        });
      });
    } catch (e) {
      !clean && console.error("Vocé não tem o git instalado");
      reject(e);
    }
  });
}
