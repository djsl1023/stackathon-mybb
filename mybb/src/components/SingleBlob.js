import React from 'react';
import { MYBB_ADDRESS, MYBB_ABI } from '../config';
import Web3 from 'web3';
import { useSelector, useDispatch } from 'react-redux';

const SingleBlob = () => {
  const blob = useSelector((state) => state.blob);
  const web3 = new Web3(Web3.givenProvider || 'http://172.17.176.1:7545');
  const myBb = new web3.eth.Contract(MYBB_ABI, MYBB_ADDRESS);

  return <div>placeholder</div>;
};

export default SingleBlob;
