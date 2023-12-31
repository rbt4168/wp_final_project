import { arrayMoveImmutable } from "array-move";
import { publicEnv } from "./env/public";

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

export function generateRandomString(length:number) {
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

export const PICTURE_SERVER_URL = publicEnv.NEXT_PUBLIC_API_URL;

//"http://rbt4168.csie.org:4321/get/";

export const default_tags = ["Happy", "Sad", "Angry", "Excited", "Anxious", "Relaxed", "Confident", "Nervous", "Playful", "Thoughtful", "Content", "Bored", "Energetic", "Tired", "Curious", "Surprised", "Motivated", "Inspired", "Grateful", "Hopeful", "Enthusiastic", "Pensive", "Reflective", "Inquisitive", "Amused", "Disappointed", "Overwhelmed", "Peaceful", "Irritated", "Proud", "Guilty", "Jealous", "Apathetic", "Sentimental", "Optimistic", "Melancholic", "Frustrated", "Sympathetic", "Anticipating", "Cautious", "Disgusted", "Amazed", "Blissful", "Defiant", "Humble", "Insecure", "Regretful", "Satisfied", "Serious", "Whimsical"];


export const url_regex = /((http[s]?|ftp):\/)\/?([^:/\s]+)(?::([0-9]+))?((\/\w+)*\/)?([\w\-.]*)?([#?\w=]+)?([&\w=\w]+.*)?([\w+\-/%]*)?[A-Za-z0-9_/]/g;
