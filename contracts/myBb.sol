pragma solidity >=0.5.0;

/**
* @title Ownable
* @dev The Ownable contract has an owner address, and provides basic authorization control
* functions, this simplifies the implementation of "user permissions".
*/
abstract contract ERC721 {
  event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
  event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);

  function balanceOf(address _owner) virtual external view returns (uint256);
  function ownerOf(uint256 _tokenId) virtual external view returns (address);
  function transferFrom(address _from, address _to, uint256 _tokenId) virtual external payable;
  function approve(address _approved, uint256 _tokenId) virtual external payable;
}
abstract contract Ownable {
  address private _owner;

  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );

  /**
  * @dev The Ownable constructor sets the original `owner` of the contract to the sender
  * account.
  */
  constructor() {
    _owner = msg.sender;
    emit OwnershipTransferred(address(0), _owner);
  }

  /**
  * @return the address of the owner.
  */
  function owner() public view returns(address) {
    return _owner;
  }

  /**
  * @dev Throws if called by any account other than the owner.
  */
  modifier onlyOwner() {
    require(isOwner());
    _;
  }

  /**
  * @return true if `msg.sender` is the owner of the contract.
  */
  function isOwner() public view returns(bool) {
    return msg.sender == _owner;
  }

  /**
  * @dev Allows the current owner to relinquish control of the contract.
  * @notice Renouncing to ownership will leave the contract without an owner.
  * It will not be possible to call the functions with the `onlyOwner`
  * modifier anymore.
  */
  function renounceOwnership() public onlyOwner {
    emit OwnershipTransferred(_owner, address(0));
    _owner = address(0);
  }

  /**
  * @dev Allows the current owner to transfer control of the contract to a newOwner.
  * @param newOwner The address to transfer ownership to.
  */
  function transferOwnership(address newOwner) public onlyOwner {
    _transferOwnership(newOwner);
  }

  /**
  * @dev Transfers control of the contract to a newOwner.
  * @param newOwner The address to transfer ownership to.
  */
  function _transferOwnership(address newOwner) internal {
    require(newOwner != address(0));
    emit OwnershipTransferred(_owner, newOwner);
    _owner = newOwner;
  }
}

contract myBb is Ownable, ERC721{
  event NewBlob(uint blobId, string name, uint dna);

  uint dnaDigits = 16;
  uint dnaModulus = 10 ** dnaDigits;
  uint cooldownTime = 1 seconds;

  struct Blob{
    string name;
    uint dna;
    uint32 level;
    uint32 readyTime;
  }

  Blob[] public blobs;
  mapping (uint => address) public blobToOwner;
  mapping (address => uint) ownerBlobCount;

  function getBlobCount() public view returns (uint) {
    return blobs.length;
}
  function _createBlob(string memory _name, uint _dna) internal {
    blobs.push(Blob(_name, _dna, 1, uint32(block.timestamp + cooldownTime)));
    uint id = blobs.length - 1;
    blobToOwner[id] = msg.sender;
    ownerBlobCount[msg.sender]++;
    emit NewBlob(id, _name, _dna);
  }

  function _generateRandomDna(string memory _str) private view returns (uint) {
    uint rand = uint(keccak256(abi.encodePacked(_str)));
    return rand % dnaModulus;
  }

  function createRandomBlob(string memory _name) public {
    /// @dev this is later changed for ERC20 token?
    require(ownerBlobCount[msg.sender] == 0);

    uint randDna = _generateRandomDna(_name);
    _createBlob(_name, randDna);
  }
  modifier blobOwnerOf(uint _blobId){
    require(msg.sender == blobToOwner[_blobId]);
    _;
  }
  function _triggerCooldown(Blob storage _blob) internal {
    _blob.readyTime = uint32(block.timestamp + cooldownTime);
  }
  function _isReady(Blob storage _blob) internal view returns(bool){
    return (_blob.readyTime <= block.timestamp);
  }

  function feedChange(uint _blobId, string memory _foodType) internal blobOwnerOf(_blobId){

    Blob storage myBlob = blobs[_blobId];
    require(_isReady(myBlob));
    uint newDna = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % dnaModulus;
    myBlob.dna = newDna;
    myBlob.level++;
    if(myBlob.level % 10 == 0){
      _createBlob("NoName", newDna);
    }
    _triggerCooldown(myBlob);

  }

  function feedOnCookie(uint _blobId) public {
    feedChange(_blobId, "placeholder");
  }

  uint levelUpFee = 0.001 ether;

  function levelUp(uint _blobId) external payable {
    require(msg.value == levelUpFee);
    blobs[_blobId].level++;
  }

  function withdraw() external onlyOwner {
    address payable _owner = payable(owner());
    _owner.transfer(address(this).balance);
  }
  function setLevelUpFee(uint _fee) external onlyOwner {
    levelUpFee = _fee;
  }

  function getBlobsByOwner(address _owner) external view returns (uint[] memory) {
    uint[] memory result = new uint[](ownerBlobCount[_owner]);
    uint counter = 0;
    for(uint i = 0; i < blobs.length; i++){
      if(blobToOwner[i] == _owner){
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  mapping (uint => address) blobApprovals;

  function balanceOf(address _owner) override external view returns (uint256) {
    return ownerBlobCount[_owner];
  }

  function ownerOf(uint256 _tokenId) override external view returns (address) {
    return blobToOwner[_tokenId];
  }

  function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerBlobCount[_to]++;
    ownerBlobCount[_from]--;
    blobToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function transferFrom(address _from, address _to, uint256 _tokenId) override external payable {
    require(msg.sender == blobToOwner[_tokenId] || msg.sender == blobApprovals[_tokenId]);
    _transfer(_from, _to, _tokenId);
  }

  function approve(address _approved, uint256 _tokenId) override external payable blobOwnerOf(_tokenId) {
    blobApprovals[_tokenId] = _approved;
    emit Approval(msg.sender, _approved, _tokenId);
  }
}
