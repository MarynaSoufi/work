import React, { useReducer } from 'react';

// Reducer for hook state and actions
const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { status: "loading", data: undefined, error: undefined };
    case "success":
      return { status: "success", data: action.payload, error: undefined };
    case "error":
      return { status: "error", data: undefined, error: action.payload };
    default:
      throw new Error("invalid action");
  }
};

export const useFirestoreCrud = (collection) => {
  //the initial state
  const initialState = {
    status: "idle",
    data: undefined,
    error: undefined,
  };

   // Setup our state and actions
   const [state, dispatch] = useReducer(reducer, initialState);
 
   //delete
   const deleteDoc = (id) => {
    dispatch({ type: "loading"})
    collection
    .doc(id)
    .delete()
    .then(() => dispatch({ type: "success", payload: id}))
    .catch((error) => console.log(error))
  } 
  return { state, deleteDoc}
}