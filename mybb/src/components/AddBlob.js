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
    setIsLoading(2);
  };
  return isLoading === 1 ? (
    <div>Blob Creation in Process....</div>
  ) : isLoading === 2 ? (
    <div>Success!!</div>
  ) : (
    <div>
      <div>Blob Creation Form</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Blob's Name Here!"
          onChange={(e) => setBlobName(e.target.value)}
          value={blobName || ''}></input>
      </form>
    </div>
  );
};

export default AddBlob;
