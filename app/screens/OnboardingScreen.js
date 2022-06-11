import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

export default function OnboardingScreen({ navigation }) {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Welcome')}
      onDone={() => navigation.navigate('Welcome')}
      pages={[
        {
          backgroundColor: '#FFFFFF',
          image: <Image source={require('../assets/dog.png')} />,
          title:
            "You need to leave, but you don't have someone to take your pet to?",
          subtitle: 'Add a new request',
        },
        {
          backgroundColor: '#FFFFFF',
          image: <Image source={require('../assets/humster.png')} />,
          title: 'Do you want to try yourself as a pet owner?',
          subtitle: 'Add a new offer',
        },
        {
          backgroundColor: '#FFFFFF',
          image: <Image source={require('../assets/cat.png')} />,
          title: 'Explore your matches',
          subtitle: 'Petly will find a match, based on your request',
        },
        {
          backgroundColor: '#FFFFFF',
          image: <Image source={require('../assets/fish.png')} />,
          title: 'Explore your chats',
          subtitle: 'Connect with the right user using the built-in chat',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({});
