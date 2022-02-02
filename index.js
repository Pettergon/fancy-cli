#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

let user = "User";

const welcome = async () => {
  //  const rainbowTitle = chalkAnimation.rainbow("Hello World");

  //  await sleep();
  //  rainbowTitle.stop();
  const msg = `Welcome ${user}, Happy hacking`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
};

const askName = async () => {
  const answers = await inquirer.prompt({
    name: "userName",
    type: "input",
    message: "What is your name?",
    default() {
      return "User";
    },
  });

  user = answers.userName;
};

const task = async () => {
  const options = await inquirer.prompt({
    name: "options",
    type: "list",
    message: `What do you want to do ${user} \n`,
    choices: ["turtle", "turtle", "turtle", "turtle"],
  });

  return handleAnswer(options.choices == "turle");
};

const handleAnswer = async (isCorrect) => {
  const spinner = createSpinner("Processing...").start();
  await sleep();
  spinner.success({
    text: "Here are your turtles: \n 🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢",
  });
};

await welcome();
await sleep(100);
await askName();
await task();
