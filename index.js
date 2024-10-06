const fs = require('fs');
const { program } = require('commander');

program
  .requiredOption('-i, --input <path>', 'Input file path')  
  .option('-o, --output <path>', 'Output file path')        
  .option('-d, --display', 'Display output in console');    

program.parse(process.argv);  

const options = program.opts();  

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);  
}

try {

  const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));

  
  const filteredData = data.filter(item => item.ku === 13 && item.value > 5);

  
  const result = filteredData.map(item => item.value).join('\n');

  
  if (options.output) {
    fs.writeFileSync(options.output, result, 'utf8');
  }

  
  if (options.display) {
    console.log(result);
  }

  
} catch (error) {
  console.error('Error reading or processing the file:', error);
}
