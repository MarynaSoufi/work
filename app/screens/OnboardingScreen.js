import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';

export default function OnboardingScreen({navigation}) {
  return (
    <Onboarding
    onSkip={() =>navigation.replace("Welcome")}
    onDone={() =>navigation.navigate("Welcome")}
    pages={[
      {
        backgroundColor: '#FFFFFF',
        image: <Image source={require('../assets/dog.png')} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#FFFFFF',
        image: <Image source={require('../assets/humster.png')} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#FFFFFF',
        image: <Image source={require('../assets/cat.png')} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#FFFFFF',
        image: <Image source={require('../assets/fish.png')} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
    
    
    ]}
  />
  )
}

const styles = StyleSheet.create({})