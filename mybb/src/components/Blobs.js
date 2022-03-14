import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Blobs = () => {
  const blobsList = useSelector((state) => state.blobs);
  console.log('BLOBLIST:', blobsList);
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

export default Blobs;
