import { MYBB_ADDRESS, MYBB_ABI } from '../config';
import Web3 from 'web3';

const SET_BLOBS = 'SET_BLOBS';
const web3 = new Web3(Web3.givenProvider || 'http://172.17.176.1:7545');
const myBb = new web3.eth.Contract(MYBB_ABI, MYBB_ADDRESS);

export const setBlobs = (blobs) => {
  return {
    type: SET_BLOBS,
    blobs,
  };
};

export const fetchBlobs = (account) => {
  return async (dispatch) => {
    try {
      const blobList = await myBb.methods.getBlobsByOwner(account).call();
      dispatch(setBlobs(blobList));
    } catch (err) {
      console.error(err);
    }
  };
};

export const createBlob = (account, name) => {
  return async (dispatch) => {
    try {
      await myBb.methods.createRandomBlob(name).send({ from: account });
      const blobList = await myBb.methods.getBlobsByOwner(account).call();
      dispatch(setBlobs(blobList));
    } catch (err) {
      console.error(err);
    }
  };
};

export default function blobsReducer(state = [], action) {
  switch (action.type) {
    case SET_BLOBS:
      return action.blobs;
    default:
      return state;
  }
}
