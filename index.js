#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const user = "Pettersilie";

const welcome = async () => {
  //  const rainbowTitle = chalkAnimation.rainbow("Hello World");

  //  await sleep();
  //  rainbowTitle.stop();
  const msg = `Welcome ${user}, Happy productivity`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
};

await welcome();
