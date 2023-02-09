import { exec as nodeExec } from "child_process";

import type { ExecProps } from "../@types/types";

export const exec = nodeExec as ExecProps;
