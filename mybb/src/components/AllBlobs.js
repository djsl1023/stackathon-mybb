import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import { MYBB_ADDRESS, MYBB_ABI } from '../config';

const AllBlobs = () => {
  const [blobCount, setBlobCount] = useState(0);
  let blobsList = [];
  const web3 = new Web3(Web3.givenProvider || 'http://172.17.176.1:7545');
  const myBb = new web3.eth.Contract(MYBB_ABI, MYBB_ADDRESS);
  async function getAllBlobs() {
    const blobCount = await myBb.methods.getBlobCount().call();
    setBlobCount(blobCount);
  }

  useEffect(() => {
    getAllBlobs();
  }, []);
  for (let i = 0; i < blobCount; i++) {
    blobsList.push(i);
  }
  console.log(blobsList);

  return (
    <div className="blob-list">
      {blobsList.map((blobId) => {
        return (
          <div className="blob-list-item" key={blobId}>
            <Link to="/blob/" state={{ blobId: blobId }}>
              <img src="blobparts/blobbody1.png" />
            </Link>
            <div>Bb#{blobId}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AllBlobs;
