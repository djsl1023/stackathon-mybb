pragma solidity >=0.5.0;

import "./blobfeed.sol";

contract BlobHelper is BlobFeed {

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

}
