import { arrayMoveImmutable } from "array-move";

export function generateRandomColor() {
  // Generate a random number between 0 and 16777215 (0xFFFFFF in decimal)
  let randomColor = Math.floor(Math.random() * 16777216).toString(16);
  // Pad the hexadecimal number with zeros to ensure it is 6 digits
  while (randomColor.length < 6) {
      randomColor = '0' + randomColor;
  }
  return "#"+randomColor;
}

export function dnd_handler(arr:any[], fr_idx:number, to_idx:number) {
  return arrayMoveImmutable(arr, fr_idx, to_idx);
}

export function chunkArray(array:any[], chunkSize:number) {
  const result = [];
  if(array) {
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
  }
  return result;
}

export var default_tags = ["Happy", "Sad", "Angry", "Excited", "Anxious", "Relaxed", "Confident", "Nervous", "Playful", "Thoughtful", "Content", "Bored", "Energetic", "Tired", "Curious", "Surprised", "Motivated", "Inspired", "Grateful", "Hopeful", "Enthusiastic", "Pensive", "Reflective", "Inquisitive", "Amused", "Disappointed", "Overwhelmed", "Peaceful", "Irritated", "Proud", "Guilty", "Jealous", "Apathetic", "Sentimental", "Optimistic", "Melancholic", "Frustrated", "Sympathetic", "Anticipating", "Cautious", "Disgusted", "Amazed", "Blissful", "Defiant", "Humble", "Insecure", "Regretful", "Satisfied", "Serious", "Whimsical"];
  