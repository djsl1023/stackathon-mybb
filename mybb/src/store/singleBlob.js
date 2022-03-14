import { MYBB_ADDRESS, MYBB_ABI } from '../config';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || 'http://172.17.176.1:7545');
const myBb = new web3.eth.Contract(MYBB_ABI, MYBB_ADDRESS);
const SET_BLOB = 'SET_BLOB';

export const setBlob = (blob) => {
  return {
    type: SET_BLOB,
    blob,
  };
};
export const feedBlob = (account, blobId) => {
  return async (dispatch) => {
    await myBb.methods.feedOnCookie(blobId).send({ from: account });
    const updatedBlob = await myBb.methods.blobs(blobId).call();
    dispatch(setBlob(updatedBlob));
  };
};

export const levelUpBlob = (account, blobId) => {
  return async (dispatch) => {
    await myBb.methods
      .levelUp(blobId)
      .send({ from: account, value: web3.utils.toWei('0.001', 'ether') });
    const currBlob = await myBb.methods.blobs(blobId).call();
    dispatch(setBlob(currBlob));
  };
};
export const getBlob = (blobId) => {
  return async (dispatch) => {
    const currBlob = await myBb.methods.blobs(blobId).call();
    dispatch(setBlob(currBlob));
  };
};

export default function blobReducer(state = [], action) {
  switch (action.type) {
    case SET_BLOB:
      return action.blob;
    default:
      return state;
  }
}
