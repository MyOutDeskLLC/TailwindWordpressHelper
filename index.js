const fs = require('fs');
const fetch = require('node-fetch');
const { program } = require('commander');
const { exec } = require("child_process");

// Setup available command line args
program.option('-c, --code <code>', 'hash on the back of the tailwind play URL, example: 8nPf72BlVa');
program.parse(process.argv);

function getCodeAndRunTailwind(code) {
    console.log('Loading: ' + code);
    fetch('https://play.tailwindcss.com/' + code)
    .then(res => res.text())
    .then(body => {
        console.log('got response, parsing');
      let regex = /<script id="__NEXT_DATA__" type="application\/json">(?<code>(?:(?!<\/script>).)*)/gim;
      let m;
      while((m = regex.exec(body)) !== null) {
            let htmlCode = JSON.parse(m.groups.code);
            fs.writeFileSync('./src/html/play.html', htmlCode.props.pageProps.initialContent.html);
            exec('npm run build', (error, stdout, stderr) => {
                console.log(stdout);
            });
            break;
        }
    }).catch(e => {
        console.log(e);
    });
}

if(program.code) {
    getCodeAndRunTailwind(program.code);
} else {
    console.log('missing tailwind share URL');
}