import { ColorPropType, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { MaterialIcons } from '@expo/vector-icons';
import color from '../../config/colors';
import { useFormikContext } from 'formik';
import ErrorMessage from './ErrorMessage';

export default function MultiSliderField({name, text}) {
  const [value, setvalue] = useState(5);
  const{ errors, touched, setFieldValue, } = useFormikContext();

  const disableScroll = (values) =>{
    setvalue(values)
  }

  const enableScroll = (values) =>{
    setvalue(values)
    setFieldValue(name, +values);
  }

  return ( 
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.wrapper}>
        <MultiSlider
          onValuesChangeStart={disableScroll}
          onValuesChangeFinish={enableScroll}
          showSteps={true}
          showStepLabels={true}
          showStepMarkers={true}
          step={5}
          sliderLength={260}
          customMarker={(e) => {
            return (<MaterialIcons name="pets" size={32} color={color.orange}/>)
      }}
          max={255}
          min={5}
        />
        <ErrorMessage error={errors[name]} visible={touched[name]}/>
        <View style={styles.textWrapper}><Text>{value}km</Text></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize: 12,
    textAlign: "center",
    color: color.white,
    marginBottom: 20,
    backgroundColor: color.orange,
    width: "100%",
    padding: 5,
    borderRadius: 5
  },
  container: {
    width: "99%",
    alignSelf: 'center',
    marginVertical:20,
    padding:10,
    borderRadius:15,
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
  },
  textWrapper: {
    borderWidth: 1,
    borderRadius: 5,
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: color.orange,
    marginLeft: 8
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  }
})