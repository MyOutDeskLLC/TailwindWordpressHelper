const fs = require('fs');
const path = require('path');
const pretty = require('pretty');
const packageJson = require('../package.json');

var stdin = process.openStdin();
let compressedCss = "";

const targetHtmlFile = path.resolve(__dirname, './../out/play.html');

stdin.on('data', function(chunk) {
  compressedCss += chunk;
});
stdin.on('end', function() {
    if(!fs.existsSync(targetHtmlFile)) {
        console.log(`Missing HTML file to update (looked for ${targetHtmlFile})`);
        return;
    }
    // The final built HTML resides here
    let finalData = fs.readFileSync(targetHtmlFile, 'utf-8');

    // A really scuffed way to dump the body as quickly as possible
    finalData = finalData.split("<body>")[1].split("</body>")[0];

    finalData = `
<!-- SCOPED CSS -->
<style>
    ${compressedCss.trim()}
</style>

<!-- HTML -->
<div class="${packageJson.wrapperClass}">
    ${pretty(finalData)}
</div>
    `
    fs.writeFileSync(targetHtmlFile, finalData);
    console.log(finalData);
});