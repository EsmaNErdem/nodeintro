const fs = require('fs');
const axios = require('axios')

function cat(path, out) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR-FS: ", err)
            process.kill(1)
        }
        writeOut(out, data)
        console.log("Reading file: ", data)
    })
}

async function webcat(url, out) {
    try {
        const resp = await axios.get(url)
        console.log(resp)
        writeOut(out, resp.data)
    } catch(err) {
        console.log("ERROR-AXIOS: ", err)
        process.kill(1)
    }
}

function writeOut(out, data) {
    fs.writeFile(out, data, "utf8", err => {
        if(err){
            console.log(err);
            process.exit(1)
        } 
    console.log(`no output, but ${out} contains contents of ${process.argv[4]}`)
    })
}

let path;
let out;

if(process.argv[2] === "--out"){
    out = process.argv[3];
    path = process.argv[4]
} else {
    path = process.argv[2]
}
if (path.substring(0, 4) === 'http'){
    webcat(path, out)
} else {
    cat(path, out)
}