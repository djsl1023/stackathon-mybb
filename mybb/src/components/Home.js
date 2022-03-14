import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlobs } from '../store/allBlobs';
import AddBlob from './AddBlob';

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const account = useSelector((state) => state.account);
  const blobList = useSelector((state) => state.blobs);
  useEffect(() => {
    dispatch(fetchBlobs(account));
  }, []);

  return (
    <div>
      {blobList.length === 0 ? (
        <div>
          <div>Welcome to Blob Buddy! </div>
          <div>
            <AddBlob />
          </div>
        </div>
      ) : (
        <div>
          <div>Welcome back to Blob Buddy!</div>
          <div>Click Here to go to your list of buddies</div>
        </div>
      )}
    </div>
  );
};

export default Home;
