import fs from 'fs';
import Huffman from './Huffman.js';



// Function to read the content of a text file
function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

// Function to write content to a file
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf-8');
}

// Function to compress a text file using Huffman coding
function compressFile(inputFilePath, outputFilePath) {
  // Read the content of the text file
  const inputData = readFile(inputFilePath);

  // Create an instance of the Huffman class
  const huffman = new Huffman();

  // Encode the data
  const [compressedData, outputMessage] = huffman.encode(inputData);

  // Write the compressed data to a new file
  writeFile(outputFilePath, compressedData);

  // Output compression information
  console.log(outputMessage);
}

export { compressFile };