export type ExecProps = (
  command: string,
  callback: (
    error: {
      code: number;
      message: string;
    },
    response: string
  ) => void
) => void;

export type RunProps = {
  command: string;
  response: string;
};

export type ErrorProps = {
  code: number;
  message: string;
  killed: boolean;
  signal: string;
  cmd: string;
};
