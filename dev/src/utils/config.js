const dotenv = require('dotenv').config({path: './.env'});

module.exports = {
    ...dotenv.parsed,
    EVTCOMMON: {
        path: '../contracts/EVT-common.sol',
        name: 'MyEVT'
    },
    EVTACOMMON: {
        path: '../contracts/EVTA-common.sol',
        name: 'MyEVTA'
    },
    EVTENCRYPTION: {
        path: '../contracts/EVT-encryption.sol',
        name: 'EVTEncryptionDemo'
    },
    NFTENCRYPTION: {
        path: '../contracts/NFT-encryption.sol',
        name: 'EncryptionToken'
    },
    EVTVARIABLE: {
        path: '../contracts/EVT-variable.sol',
        name: 'EVTVariableDemo'
    }
}
