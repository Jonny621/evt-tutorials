# EVT Tutorials

## Summary
In this tutorial, you can use some simple shell command line to **deploy contract**, **create EVT**, call **EVT Encryption** functions, call **EVT Variable** functions. etc.

## EVT Specs
- **Base Interfaces**
    ```solidity
    interface IEVT {
        function balanceOf(address _owner) external view returns (uint256);
        function ownerOf(uint256 _tokenId) external view returns (address);
        function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
        function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
        function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
        function approve(address _approved, uint256 _tokenId) external payable;
        function setApprovalForAll(address _operator, bool _approved) external;
        function getApproved(uint256 _tokenId) external view returns (address);
        function isApprovedForAll(address _owner, address _operator) external view returns (bool);
    }
    ```
- **Encryption Interfaces**
    ```solidity
    interface EVTEncryption {
        function registerEncryptedKey(uint256 _tokenId, bytes32 _encryptedKeyId) external payable;
        function addPermission(uint256 _tokenId, bytes32 _encryptedKeyId, address _licensee) external payable;
        function removePermission(uint256 _tokenId, bytes32 _encryptedKeyId, address _licensee) external;
        function hasPermission(uint256 _tokenId, bytes32 _encryptedKeyId, address _licensee) external view returns (bool);
    }
    ```
- **Variable Interfaces**
  ```solidity
  interface EVTVariable {
      function addDynamicProperty(bytes32 _propertyId) external payable;
      function setDynamicProperty(uint256 _tokenId, bytes32 _propertyId, bytes _propertyValue) external payable;
      function setDynamicProperties(uint256 _tokenId, bytes _message) external payable;
      function getDynamicProperty(uint256 _tokenId, bytes32 _propertyId) external view returns (bytes);
      function getDynamicProperties(uint256 _tokenId) external view returns (bytes32[], bytes[]);
      function supportsProperty(bytes32 _propertyId) external view returns (bool);
  }
  ```

## Development with EVT

### Prerequisites
1. Node.js installed on your local machine.
2. Get RPC Endpoint and ChainId which you want to try.
3. Own an Address and PrivateKey

### Get source code and Install
    ```bash
    git clone https://github.com/Jonny621/evt-tutorials && cd evt-tutorials/dev

    cd evt-tutorials
    chmod -R 777 dev
    cd dev
    cp .env.example .env
    # in .env, we provide Newton testnet configuration
    # you can also set new CHAIN_ID, RPC_URL, ACCOUNT_PRIVATE_KEY

    npm install
    ```

### Use EVT and EVTA
1. Deploy Contract
    ```bash
    ./scripts/evt/evt.sh deploy
    ```
2. Create
   1. EVT
        ```bash
            # open log file
            tail -f ./devdata/logs/evt.log

            # mint EVT
            ./scripts/evt/evt.sh call mintEVT
            # you can get EVT_ADDRESS and EVTA_ADDRESS in log file
            # copy contract addresses to .env file
            # the token will be owned by your address
        ```
   2. EVTA
        ```bash
            # mint EVTA. quantity: the amount you want to mint
            ./scripts/evt/evt.sh call mintEVTA quantity
            # the tokens will be owned by your address
        ```

By run Deploy and Mint, you can check your contract and EVT in blockchain explorar.

If you use Newchain testnet configuration, you can see in [Newton Testnet Explorar](http://e.testnet.diynova.com/) with EVT_ADDRESS, EVTA_ADDRESS or ACCOUNT.

### Use EVT Encryption

We provide an open source project `NewKeeper` to combine with EVT Encryption.

1. Run NewKeeper
    ```bash
    # pull newkeeper-dev v0.1
    docker pull pschy/newkeeper-dev

    # run newkeeper with a PORT
    docker run -it -d -p `PORT`:8000 --name newkeeper pschy/newkeeper-dev

    # check status and get CONTAINER ID
    docker ps

    # show logs
    docker logs -f `CONTAINER ID`

    # set NEWKEEPER url in .env file 
    ```

2. Deploy Contract
    ```bash
    # open log file
    tail -f ./devdata/logs/encryption.log

    # deploy contract
    /scripts/encryption/encryption.sh deploy
    # get TOKEN_ADDRESS and CONTRACT_ADDRESS, set in .env file
    ```
3. Call Functions
    ```bash
    # call contract functions with params
    ./scripts/encryption/encryption.sh call functions params
    ```
    Use the shell common line to call Below functions. you can get returns in ./devdata/logs/encryption.log file

    #### **Functions**
    - mint_EVT()
        - desc
        
            mint a Token for encryption key register permission.
    - mint_token()
        - desc

            mint a new EVT
    - get_balance()
        - desc

            check address token balance, the permission for Key register
        - returns

            balance
    - generator()
        - desc

            call Newkeeper to generator KeyId
        - returns

            peerPrivateKey, keyId, privateKey, peer, prime, peerPublicKey
    - register_encrypted_key(params)
        - desc

            Use a keyId to encrypted a Token.
        - params

            tokenId, keyId
    - add_permission(params)
        - desc

            Add permission to an Address with a keyId
        - params

            tokenId, keyId, licensee(an address)
    - has_permission(params)
        - desc

            Check the permission
        - params

            tokenId, keyId, licensee(an address)
        - returns

            result
    - register(params)
        - desc

            Bind keyId, tokenId, Contract in NewKeeper
        - params

            tokenId, KeyId, peerPrivateKey, privateKey (you can get these from generator function)
    - get_key(params)
        - desc

            Get PrivateKey
        - params
            prime, peerSwapKey, KeyId


You can also run a commond line to test EVT encryption:
```bash
./scripts/encryption/encryption.sh test
```
It will deploy contracts, mint token and evt, generate key with Newkeeper etc.


### Use EVT Variable

1. Deploy Contract
    ```bash
    # open log file
    tail -f ./devdata/logs/variable.log

    # deploy contract
    ./scripts/encryption/variable.sh deploy
    # get TOKEN_ADDRESS and CONTRACT_ADDRESS, set in .env file
    ```
2. Call functions

    ```bash
    # Mint evt
    ./scripts/encryption/variable.sh call mint

    # Add a Property. like: height, with, age. etc.
    ./scripts/encryption/variable.sh call addProperty propertyName

    # Set Property to a EVT
    # ex.: ./scripts/encryption/variable.sh call setProperty 0 age 30
    ./scripts/encryption/variable.sh call setProperty tokenId propertyName propertyValue

    # Get Property
    # ex.: ./scripts/encryption/variable.sh call getProperty 0 age
    ./scripts/encryption/variable.sh call getProperty tokenId propertyName
    ```