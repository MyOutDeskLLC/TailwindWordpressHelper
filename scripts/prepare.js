const packageJson = require('../package.json');
const path = require('path');
const fs = require('fs');
const tailwindClassRegexWrapper = new RegExp(packageJson.regex, 'gi');

let originalContent = path.resolve(__dirname, "./../src/html/play.html");
let outputPath = path.resolve(__dirname, './../out');
let tailwindPlayHtml = fs.readFileSync(originalContent, 'utf-8');
let newlyScopedHtml = tailwindPlayHtml;


let matches;
while ((matches = tailwindClassRegexWrapper.exec(tailwindPlayHtml)) !== null) {
    if (matches.index === tailwindClassRegexWrapper.lastIndex) {
        regex.lastIndex++;
    }
    matches.forEach((match, groupIndex) => {
        if(groupIndex !== 1) {
            return;
        }
        let updatedClassName = '';
        match.split(' ').forEach((item) => {
            let potentialPseudo = item.split(':');
            if(potentialPseudo[0] === 'sm' || potentialPseudo[0] === 'md' || potentialPseudo[0] === 'lg' || potentialPseudo[0] === 'xl') {
                updatedClassName += `${potentialPseudo[0]}:${packageJson.wrapperClass}-${potentialPseudo[1]}`;
                return;    
            }
            updatedClassName += ('mod-' + item + ' ')
        })
        newlyScopedHtml = newlyScopedHtml.replace(match, updatedClassName);
    });
}

// Write the new HTML lead in
let finalHtml = `
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="./../src/css/main.css" rel="stylesheet">
    </head>
    <body>
        ${newlyScopedHtml}
    </body>
</html>`;


if(!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
}
fs.writeFileSync(`${outputPath}/play.html`, finalHtml);