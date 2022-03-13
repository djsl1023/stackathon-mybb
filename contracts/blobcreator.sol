pragma solidity >=0.5.0;
import "./ownable.sol";
import "./safemath.sol";

contract BlobCreator is Ownable{
  using SafeMath for uint256;
  event NewBlob(uint blobId, string name, uint dna);

  uint dnaDigits = 16;
  uint dnaModulus = 10 ** dnaDigits;
  uint cooldownTime = 10 seconds;

  struct Blob{
    string name;
    uint dna;
    uint32 level;
    uint32 readyTime;
  }

  Blob[] public blobs;
  mapping (uint => address) public blobToOwner;
  mapping (address => uint) ownerBlobCount;

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
}
