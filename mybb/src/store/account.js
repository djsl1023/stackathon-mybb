import Web3 from 'web3';

const SET_ACCOUNT = 'SET_ACCOUNT';

export const setAccount = (account) => {
  return {
    type: SET_ACCOUNT,
    account,
  };
};

export const fetchAccount = () => {
  return async (dispatch) => {
    try {
      const web3 = new Web3(Web3.givenProvider || 'http://172.17.176.1:7545');
      const accounts = await web3.eth.requestAccounts();
      dispatch(setAccount(accounts[0]));
    } catch (err) {
      console.error(err);
    }
  };
};
export default function accountReducer(state = '', action) {
  switch (action.type) {
    case SET_ACCOUNT:
      return action.account;
    default:
      return state;
  }
}
