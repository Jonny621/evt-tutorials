const call = require('./call')

const fn = process.argv[2];
const args = process.argv.slice(3);

call[fn](...args)
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    })