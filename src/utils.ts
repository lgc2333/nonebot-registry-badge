export function trim(str: string, char: string): string {
  while (str.startsWith(char)) str = str.substring(1)
  while (str.endsWith(char)) str = str.substring(0, str.length - 1)
  return str
}
