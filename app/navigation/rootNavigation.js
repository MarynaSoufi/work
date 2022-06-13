import React from 'react';

export const navigatonRef = React.createRef();
export const navigate = (name, params) => {
  navigatonRef.current?.navigate(name, params);
}