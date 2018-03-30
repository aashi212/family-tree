#!/usr/bin/env node

const
    cli = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    }),
    inputLabel  = 'Input  :' ,
    outputLabel = 'Output :' ;


// cli.prompt("Input : ");
cli.write("Input : ");

cli.on('line', (line) => {
  let command = line.split(":")[1].trim();
  console.log(command);
  cli.write("Input : ");
});
// cli.prompt();
// }).on('close', () => {
//   console.log('Have a great day!');
// process.exit(0);
// });
