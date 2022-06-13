import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import color from '../config/colors';
import { AirbnbRating } from 'react-native-ratings';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function ListItem({
  src,
  name,
  onPress,
  location,
  setFavorite,
  isFavorite,
  onMessage,
}) {
  const functionCombined = async () => {
    await setFavorite();
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: src }}></Image>
        <View style={styles.infoWrapper}>
          <View style={styles.textWrapper}>
            <View style={styles.location}>
              <FontAwesome
                name="location-arrow"
                size={16}
                color={color.grayMiddle}
              />
              <Text style={styles.textLocation}>{location}</Text>
            </View>
            <Text style={styles.name}>{name}</Text>
            {/* <AirbnbRating
              defaultRating={rating}
              ratingCount={5}
              size={15}
              isDisabled={false}
              showRating={false}
              onFinishRating={ratingCompleted}
            /> */}
          </View>
          <View style={styles.iconsWrapper}>
            <AntDesign
              style={styles.icon}
              name="message1"
              size={20}
              color={color.green}
              onPress={onMessage}
            />
            <TouchableWithoutFeedback onPress={functionCombined}>
              {isFavorite ? (
                <MaterialIcons name="favorite" size={24} color={color.green} />
              ) : (
                <MaterialIcons
                  name="favorite-border"
                  size={24}
                  color={color.green}
                />
              )}
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: color.white,
    borderWidth: 2,
    borderColor: color.lightGray,
    height: 100,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
    marginBottom: 20,
  },
  textWrapper: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: '100%',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    resizeMode: 'cover',
  },
  name: {
    paddingHorizontal: 5,
    fontSize: Platform.OS === 'android' ? 16 : 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    fontWeight: '700',
    color: color.text,
  },
  reviews: {
    paddingHorizontal: 5,
    fontSize: Platform.OS === 'android' ? 12 : 14,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    fontWeight: '200',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: color.text,
    color: color.gray,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLocation: {
    paddingHorizontal: 5,
    fontSize: Platform.OS === 'android' ? 12 : 14,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    color: color.text,
  },
  iconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
  infoWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
