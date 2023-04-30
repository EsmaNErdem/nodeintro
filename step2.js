const fs = require('fs');
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR-FS: ", err)
            process.kill(1)
        }
        console.log("Reading file: ", data)
    })
}

async function webcat(url) {
    try {
        const resp = await axios.get(url)
        console.log(resp)
    } catch(err) {
        console.log("ERROR-AXIOS: ", err)
        process.kill(1)
    }
}

const path = process.argv[2]

if (path.substring(0, 4) === 'http'){
    webcat(path)
} else {
    cat(path)
}