const fs = require('fs');
// Try to require the specific CJS file
const pdf = require('./node_modules/pdf-parse/dist/node/cjs/index.cjs');

let dataBuffer = fs.readFileSync('Profile (1).pdf');

// Check if it's a function or default export
let pdfFunc = pdf;
if (typeof pdf !== 'function' && pdf.default && typeof pdf.default === 'function') {
    pdfFunc = pdf.default;
}

if (typeof pdfFunc === 'function') {
    pdfFunc(dataBuffer).then(function(data) {
        console.log('--- TEXT START ---');
        console.log(data.text);
        console.log('--- TEXT END ---');
    }).catch(err => {
        console.error('Error parsing PDF:', err);
    });
} else {
    console.log('Still not a function. Keys:', Object.keys(pdf));
}
