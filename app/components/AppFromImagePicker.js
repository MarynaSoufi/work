import React from 'react';
import  ImageInput  from './ImageInput';
import { useFormikContext } from 'formik';
import { ErrorMessage } from './forms/';
import { useAuth } from '../firebase/auth';
import { firestore, storage  } from '../firebase/firebase';

export default function AppFromImagePicker({ name, userImage }) {
  const { setFieldValue, values, errors, touched  } = useFormikContext();
  const imageUri = values.name;
  const handleAdd = async (uri) => {
    setFieldValue(name, [ uri ]);
  }
  return (
    <>
      <ImageInput imageUri={imageUri} onChangeImage={handleAdd} userImage={userImage}/>
      <ErrorMessage error={errors[name]} visible={touched[name]}/>
    </>
  
  )
}

