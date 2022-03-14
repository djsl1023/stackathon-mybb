import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';
import { fetchAccount } from './store/account';
import { MYBB_ADDRESS, MYBB_ABI } from './config';
import { Routes as Switch, Route } from 'react-router-dom';
import Blobs from './components/Blobs';
import SingleBlob from './components/SingleBlob';
import Home from './components/Home';

const Routes = () => {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAccount());
    const web3 = new Web3(Web3.givenProvider || 'http://172.17.176.1:7545');
    const myBb = new web3.eth.Contract(MYBB_ABI, MYBB_ADDRESS);
  }, []);

  return (
    <div>
      {account === '' ? (
        <p>Please install metamask!</p>
      ) : (
        <Switch>
          <Route path="/blobs/" element={<Blobs />}></Route>
          <Route path="/blob/" element={<SingleBlob />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Switch>
      )}
    </div>
  );
};

export default Routes;
