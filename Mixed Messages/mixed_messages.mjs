// End goal is to have the following features:
// A main menu consisting of two options. Generate a new set of messages, and exit.

import { createInterface } from "readline";

// Create readline interface
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  "\nWelcome to the daily dose of wit! This program generates the following three texts at random: ",
);

function mainMenu(message) {
  // If there is a message argument, display it.

  console.log(`
1) A quote from a philosopher
2) A interesting fact
3) A joke
\nChoose an option:
1) Generate a new set of messages
2) Exit`,
  );

  // Ask for user input
  rl.question("\nEnter your choice: ", (choice) => {
    console.log(choice);
  });
}

function generateMessages() {
  // Random quote
  // Random fact
  // Random joke
}

// display main menu
mainMenu();

// Validate user input
// Produce message
