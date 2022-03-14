import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getBlob, feedBlob, levelUpBlob } from '../store/singleBlob';
import Icon from './HeadColor';

const SingleBlob = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { blobId } = location.state;
  const blob = useSelector((state) => state.blob);
  const account = useSelector((state) => state.account);
  let body, eye, mouth, bodyColor, eyeColor, mouthColor;
  useEffect(() => {
    dispatch(getBlob(blobId));
  }, []);
  if (blob.dna) {
    body = (parseInt(blob.dna.substring(0, 2)) % 2) + 1;
    eye = (parseInt(blob.dna.substring(2, 4)) % 5) + 1;
    mouth = (parseInt(blob.dna.substring(4, 6)) % 5) + 1;
    bodyColor = (parseInt(blob.dna.substring(6, 8)) / 100) * 360;
    eyeColor = (parseInt(blob.dna.substring(8, 10)) / 100) * 360;
    mouthColor = (parseInt(blob.dna.substring(10, 12)) / 100) * 360;
  }
  return blob ? (
    <div className="container">
      <div className="single-blob-container">
        <div className="single-blob-image">
          <img
            className="blob-body"
            style={{ filter: `hue-rotate(${bodyColor}deg)` }}
            src={`/blobparts/blobbody${body}.png`}
          />
          <img
            className="blob-eye"
            style={{ filter: `hue-rotate(${eyeColor}deg)` }}
            src={`/blobparts/blobeye${eye}.png`}
          />
          <img
            className="blob-mouth"
            style={{ filter: `hue-rotate(${mouthColor}deg)` }}
            src={`/blobparts/blobmouth${mouth}.png`}
          />
        </div>
        <div className="single-blob-info">
          <div className="blob-text-info">
            <p>Blob#{blobId}</p>
            <p>Name: {blob.name}</p>
            <p>DNA: {blob.dna}</p>
            <p>Level: {blob.level}</p>
          </div>
          <div className="buttons">
            <button
              className="blob-button"
              onClick={() => dispatch(levelUpBlob(account, blobId))}>
              Level Up! 0.001Ether
            </button>
            <button
              className="blob-button"
              onClick={() => dispatch(feedBlob(account, blobId))}>
              Feed!
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default SingleBlob;
