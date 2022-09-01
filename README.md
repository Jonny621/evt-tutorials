# EVT Tutorials

## EVT interfaces
    - EVT
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
    - Encryption
    ```solidity
        interface EVTEncryption {
            function registerEncryptedKey(uint256 _tokenId, bytes32 _encryptedKeyId) external payable;
            function addPermission(uint256 _tokenId, bytes32 _encryptedKeyId, address _licensee) external payable;
            function removePermission(uint256 _tokenId, bytes32 _encryptedKeyId, address _licensee) external;
            function hasPermission(uint256 _tokenId, bytes32 _encryptedKeyId, address _licensee) external view returns (bool);
        }
    ```
    - Variable
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

### Get source & Install dependence
```bash
git clone https://github.com/Jonny621/evt-tutorials && cd evt-tutorials/dev

npm install
```


## NewKeeper

```bash
# pull newkeeper-dev v0.1
docker pull pschy/newkeeper-dev:0.1

# run newkeeper with a PORT
docker run -it -d -p `PORT`:8000 --name newkeeper pschy/newkeeper-dev:0.1

# check status and get CONTAINER ID
docker ps

# show logs
docker logs -f `CONTAINER ID`

# set NEWKEEPER url in env file 

```


## EVT Developer

### Get source & Install dependence
```bash
git clone https://github.com/Jonny621/evt-tutorials && cd evt-tutorials/dev

npm install

```

### Run

#### Develop with EVT Encryption module
```bash
# set your chain info (CHAIN_ID, RPC_URL, ACCOUNT_PRIVATE_KEY) in env file
# deploy Contracts(TokenContract, EVTEncryptionContract)
./scripts/encryption.sh deploy
# check logs & Get Contract Address
tail -f ./devdata/logs/encryption.log
# copy TOKEN_ADDRESS and CONTRACT_ADDRESS to env file

# call other functions
./scripts/encryption.sh call [function name] [function parameters]

```
encryption function name
- generator
  - returns
    - Peer public key
    - Peer private key
    - Node swap key
    - KeyId
    - PrivateKey
    
- register
  - parameters
    - KeyId
    - Peer private key
    - PrivateKey
  - returns
    - register result

- encryption
  - desc
    one call to generate key and register key

- mint_token
  - desc
    create a NFT for encryption key register permission.

- mint_EVT
  - desc
    create new EVT

- get_balance
  - desc
    check address balance

- add_permission
  - desc
    use a KeyId add permission for an address to a token
  - parameters
    - tokenId
    - KeyId
    - address
    
- register_encrypted_key
  - desc
    register a Key for a token
  - parameters
    - tokenId
    - KeyId
    
- has_permission
  - desc
    check permission for an address
  - parameters
    - tokenId
    - KeyId
    - address

