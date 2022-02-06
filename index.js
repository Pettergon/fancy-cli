#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));

let user = 'User';

const welcome = async () => {
  const msg = `Welcome ${user}, Happy turtle`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
};

const askName = async () => {
  const answers = await inquirer.prompt({
    name: 'userName',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'User';
    }
  });

  user = answers.userName;
};

const task = async () => {
  const options = await inquirer.prompt({
    name: 'options',
    type: 'list',
    message: `What do you want to do ${user}? \n`,
    choices: ['turtle', 'many turtle', 'big turtle', 'turtle banner']
  });

  return handleTaskAnswer(options.options);
};

const handleTaskAnswer = async choice => {
  const spinner = createSpinner('Processing...').start();
  await sleep();
  switch (choice) {
    case 'turle':
      spinner.success({
        text: 'Here is your turtle: 🐢'
      });
      break;
    case 'many turtle':
      spinner.success({
        text: 'Here are your turtles: \n 🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢'
      });
      break;
    case 'big turtle':
      spinner.success({
        text: chalk.green(
          [
            'Here is your big turtle:',
            '  _____    ____',
            ' /      \\ |  o | ',
            '|        |/ ___| ',
            '|_________/',
            '|_|_| |_|_|'
          ].join('\n')
        )
      });
      break;
    case 'turtle banner':
      spinner.success({
        text: 'Here is your turtle banner: '
      });
      figlet('turtle', (err, data) => {
        console.log(gradient('lightgreen', 'green').multiline(data));
      });
      break;
    default:
      spinner.error({
        text: 'No turtle'
      });
  }
};

const endPromt = async () => {
  const rainbowTitle = chalkAnimation.rainbow(
    'Thank you for using turtle-cli.'
  );
  await sleep();
  rainbowTitle.stop();
};

const quiz = async () => {
  const quiz = await inquirer.prompt({
    name: 'quiz',
    type: 'list',
    message: `What is your favourite turtle? \n`,
    choices: ['water turtle', 'land turtle (tortoise)']
  });

  return handleQuizAnswer(quiz.quiz == 'water turtle');
};

const handleQuizAnswer = async isCorrect => {
  const spinner = createSpinner('Processing...').start();
  await sleep();
  isCorrect
    ? spinner.success({
        text: 'That was the correct answer. Here have some turtles: \n 🐢🐢🐢🐢🐢🐢🐢 \n'
      })
    : spinner.error({
        text: 'Wrong. Only water turtles are real turtles. \n  Here have a consolation turtle: 🐢 \n'
      });
};

await welcome();
await sleep(100);
await askName();
await task();
await quiz();
await endPromt();
