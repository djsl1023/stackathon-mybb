import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { MYBB_ADDRESS, MYBB_ABI } from './config';

function App() {
  const [account, setAccount] = useState();
  const [blobList, setblobList] = useState([]);

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://172.17.176.1:7545');
      const accounts = await web3.eth.requestAccounts();
      console.log(accounts);
      setAccount(accounts[0]);

      const myBb = new web3.eth.Contract(MYBB_ABI, MYBB_ADDRESS);
    }

    load();
  }, []);

  return <div>Your account is: {account}</div>;
}

export default App;
