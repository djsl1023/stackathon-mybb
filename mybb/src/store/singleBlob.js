const SET_BLOB = 'SET_BLOB';

export const setBlob = (blob) => {
  return {
    type: SET_BLOB,
    blob,
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
