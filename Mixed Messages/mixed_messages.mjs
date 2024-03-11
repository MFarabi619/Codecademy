// End goal is to have the following features:
// A main menu consisting of two options. Generate a new set of messages, and exit.

import { createInterface } from "readline";
import data from "./messages.json" assert { type: "json" };

// Create readline interface
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  "\nWelcome to the daily dose of wit! This program generates the following three texts at random: ",
);

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function mainMenu() {
  let choice;
  do {
    console.log(
      `\nChoose an option:\n1) Generate a new set of messages\n2) Exit`,
    );
    choice = await question("\nEnter your choice: ");

    switch (choice) {
      case "1":
        console.log("\nGenerating messages...");
        generateMessages();
        break;
      case "2":
        console.log("\nExiting. Goodbye!");
        break;
      default:
        console.log("\nPlease choose a valid input (1 or 2)!");
    }
  } while (choice !== "2");
  rl.close();
}

function generateMessages() {
  // generate random number from zero to length of quote/joke/fact
  function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  }

  // console log for each
  const RANDOMQUOTE=data.quotes[getRandomIndex(data.quotes.length)]
  const RANDOMJOKE=data.jokes[getRandomIndex(data.jokes.length)]
  const RANDOMFACT=data.facts[getRandomIndex(data.facts.length)]
  console.log(`- ${RANDOMQUOTE}`);
  console.log(`- ${RANDOMJOKE}`);
  console.log(`- ${RANDOMFACT}`);
}

// display main menu, entry point of script
mainMenu();
