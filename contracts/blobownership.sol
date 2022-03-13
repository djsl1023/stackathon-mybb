pragma solidity >0.5.0;

import "./blobhelper.sol";
import "./erc721.sol";

contract BlobOwnership is BlobHelper, ERC721 {

  mapping (uint => address) blobApprovals;

  function balanceOf(address _owner) override external view returns (uint256) {
    return ownerBlobCount[_owner];
  }

  function ownerOf(uint256 _tokenId) override external view returns (address) {
    return blobToOwner[_tokenId];
  }

  function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerBlobCount[_to].add(1);
    ownerBlobCount[_from].sub(1);
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
