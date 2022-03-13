pragma solidity >=0.5.0;

import "./blobcreator.sol";

contract BlobFeed is BlobCreator {

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
    if(myBlob.level == 10){
      _createBlob("NoName", newDna);
    }
    _triggerCooldown(myBlob);

  }

  function feedOnCookie(uint _blobId) public {
    feedChange(_blobId, "placeholder");
  }
}
