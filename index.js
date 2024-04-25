import fs from 'fs'



// Get the file contents before the append operation
console.log("\nFile Contents of file before append:",
 fs.readFileSync("nuevoDocumento.txt", "utf8"));
 
fs.appendFileSync("nuevoDocumento.txt", " - Geeks For Geeks");
 
// Get the file contents after the append operation
console.log("\nFile Contents of file after append:",
       fs.readFileSync("nuevoDocumento.txt", "utf8"));

