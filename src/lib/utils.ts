import { arrayMoveImmutable } from "array-move";

export function generateRandomColor() {
  // Generate a random number between 0 and 16777215 (0xFFFFFF in decimal)
  var randomColor = Math.floor(Math.random() * 16777216).toString(16);
  // Pad the hexadecimal number with zeros to ensure it is 6 digits
  while (randomColor.length < 6) {
      randomColor = '0' + randomColor;
  }
  return "#"+randomColor;
}

export function dnd_handler(arr:any[], fr_idx:number, to_idx:number) {
  return arrayMoveImmutable(arr, fr_idx, to_idx);
}