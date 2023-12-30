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

function generateRandomString(length:number) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
}

export function reverse_array(array:any[]){
  return array.map((item:any,idx:number) => array[array.length-1-idx])
}

export var PICTURE_SERVER_URL = "http://localhost:8000/get/";

export var MONGO_URL="mongodb+srv://rbt4168:dev@cluster0.ikzhlb9.mongodb.net/?retryWrites=true&w=majority"

export var PUSHER_ID="1708261"
export var NEXT_PUBLIC_PUSHER_KEY="b216af17f871b60bb0fb"
export var PUSHER_SECRET="931808d4b933a71b4589"
export var NEXT_PUBLIC_PUSHER_CLUSTER="ap3"

export var default_tags = ["Happy", "Sad", "Angry", "Excited", "Anxious", "Relaxed", "Confident", "Nervous", "Playful", "Thoughtful", "Content", "Bored", "Energetic", "Tired", "Curious", "Surprised", "Motivated", "Inspired", "Grateful", "Hopeful", "Enthusiastic", "Pensive", "Reflective", "Inquisitive", "Amused", "Disappointed", "Overwhelmed", "Peaceful", "Irritated", "Proud", "Guilty", "Jealous", "Apathetic", "Sentimental", "Optimistic", "Melancholic", "Frustrated", "Sympathetic", "Anticipating", "Cautious", "Disgusted", "Amazed", "Blissful", "Defiant", "Humble", "Insecure", "Regretful", "Satisfied", "Serious", "Whimsical"];
  