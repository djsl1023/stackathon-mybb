import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBlob } from '../store/allBlobs';

const AddBlob = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(0);
  const [blobName, setBlobName] = useState('');

  const account = useSelector((state) => state.account);
  const handleSubmit = () => {
    setIsLoading(1);
    dispatch(createBlob(account, blobName));
  };
  return isLoading === 1 ? (
    <div>
      <div>Follow The Metamask instructions to complete creation!</div>
      <div>Then, click home to see your new buddy!</div>
    </div>
  ) : isLoading === 2 ? (
    <div>Success!!</div>
  ) : (
    <div>
      <div>Enter Your First Blob's Name Here!</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ex: BlobbyFlay"
          onChange={(e) => setBlobName(e.target.value)}
          value={blobName || ''}></input>
      </form>
    </div>
  );
};

export default AddBlob;
