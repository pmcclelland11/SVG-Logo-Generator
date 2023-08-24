const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

async function getUserInput() {
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo:',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color (color keyword or hexadecimal number):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['Triangle', 'Circle', 'Square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color (color keyword or hexadecimal number):',
    },
  ]);

  return userInput;
}

async function generateLogo() {
    const userInput = await getUserInput();
    const { text, textColor, shape, shapeColor } = userInput;
  
    const selectedShape = new (eval(shape))();
    selectedShape.setColor(shapeColor);
  
    let x, y;
    
    if (shape === 'Triangle') {
      x = 150; 
      y = 125; 
    } else if (shape === 'Circle') {
      x = 150; 
      y = 100; 
    } else if (shape === 'Square') {
      x = 150; 
      y = 150; 
    }
  
    const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${selectedShape.render()}
      <text x="${x}" y="${y}" font-family="Calibri" font-weight="bold" font-size="24" fill="${textColor}" text-anchor="middle" alignment-baseline="middle">${text}</text>
    </svg>
  `;
  
    fs.writeFileSync('logo.svg', svgContent);
    console.log('Generated logo.svg');
  }
  
  generateLogo();