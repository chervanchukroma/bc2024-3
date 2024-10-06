const fs = require('fs');
const path = require('path');
const { Command } = require('commander');

const program = new Command();

// Додайте аргументи командного рядка
program
  .option('-i, --input <path>', 'Path to the input JSON file', '')
  .option('-o, --output <path>', 'Path to the output file', '')
  .option('-d, --display', 'Display results in console');

program.parse(process.argv);

// Отримайте значення аргументів
const options = program.opts();

// Перевірка обов'язкового параметра
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

// Читання даних з файлу
let data;
try {
  const rawData = fs.readFileSync(path.resolve(options.input));
  data = JSON.parse(rawData);
} catch (error) {
  console.error('Cannot find input file');
  process.exit(1);
}

// Фільтрація даних
const result = [];
data.forEach(item => {
  if (item.ku > 13 && item.value > 5) {
    result.push(item.value);
  }
});

// Вивід результатів
if (options.display) {
  console.log(result);
}

// Запис результатів у файл, якщо вказано
if (options.output) {
  fs.writeFileSync(path.resolve(options.output), JSON.stringify(result, null, 2));
}
