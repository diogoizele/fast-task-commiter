export function removeEnterKeyPress(command: string) {
  return command.replace("\n", "");
}
