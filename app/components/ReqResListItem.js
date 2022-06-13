import { StyleSheet, Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import color from '../config/colors';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';   
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 


export default function ReqResListItem({from, till, pet, range, onPress, match, onMatchPress}) {
  const fromDate = new Date(from);
  const tillDate = new Date(till);
  return (
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={styles.iconWrapper}>
            {pet === 'Dog' && <FontAwesome5 name="dog" size={38} color={color.green} />}
            {pet === 'Cat' && <FontAwesome5 name="cat" size={38} color={color.green} />}
            {pet === 'Rodent' && <MaterialCommunityIcons name="rodent" size={38} color={color.green} />}
            {pet === 'Bird' && <FontAwesome5 name="earlybirds" size={38} color={color.green} />}
            {pet === 'Fish' && <MaterialCommunityIcons name="fishbowl-outline" size={38} color={color.green} />}
            {pet === 'Reptiles' && <MaterialCommunityIcons name="snake" size={38} color={color.green} />}
            <View style={styles.infoWrapper}>
                <View style={styles.datesWrapper}>
                  <MaterialIcons name="date-range" size={24} color={color.green} />
                  <Text style={styles.dates}>{fromDate.toLocaleDateString()} - {tillDate.toLocaleDateString()}</Text>
                </View>
                {range && <View style={styles.rangeWrapper}>
                <FontAwesome name="map-marker" size={18} color={color.green} />
                <Text style={styles.rangeText}>{range}km</Text>
                </View>}
            </View>
          </View>
          {match === false && <Ionicons name="md-trash" size={24} color={color.green} onPress={onPress}/>}
          {match === true && <MaterialCommunityIcons name="puzzle-check" size={24} color={color.orange} onPress={onMatchPress}/>}
          
        </View>
      </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    flexDirection:'row',
    alignSelf: 'center',
    borderRadius: 15,
    padding: 10,
    backgroundColor: color.white,
    borderWidth: 2,
    borderColor: color.lightGray,
    height: 80,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  datesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  dates: {
    color: color.grayMiddle,
    fontWeight: '200',
    paddingHorizontal: 5,
    fontSize: Platform.OS === "android" ? 12 : 14,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  iconWrapper: {
    flexDirection: 'row'
  },
  rangeText: {
    color: color.grayMiddle,
    fontWeight: '200',
    paddingHorizontal: 5,
    fontSize: Platform.OS === "android" ? 12 : 14,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  rangeWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingTop: 5
  },
  infoWrapper: {
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'flex-start'
  }
  
})