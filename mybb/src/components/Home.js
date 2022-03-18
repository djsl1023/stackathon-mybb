import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlobs } from '../store/allBlobs';
import AddBlob from './AddBlob';
import Blobs from './Blobs';

const Home = () => {
  const dispatch = useDispatch();

  const account = useSelector((state) => state.account);
  const blobList = useSelector((state) => state.blobs);
  useEffect(() => {
    dispatch(fetchBlobs(account));
  }, []);
  console.log(blobList[0]);
  return (
    <div className="container">
      {blobList.length === 0 ? (
        <div className="home-text">
          <div>Welcome to MyBlobBuddy!</div>
          <div>
            <AddBlob />
          </div>
        </div>
      ) : (
        <div className="home-text">
          <div>Welcome back to Blob Buddy!</div>
          <div>Heres a List of your Buddies!</div>
          <Blobs />
        </div>
      )}
    </div>
  );
};

export default Home;
