import { Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faChevronLeft, faHeadset } from '@fortawesome/free-solid-svg-icons';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { MARGIN, PADDING } from '@/constants/Colors';
import Constants from 'expo-constants';
import { Feather, Ionicons } from '@expo/vector-icons';
interface PropsType {
  name: string,
  isBack?: boolean,
}
const NavigationHeader = (props: PropsType) => {
  const { name, isBack } = props;
  const route = useRoute();
  const currentRouteName = route.name;
  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesomeIcon icon={faChevronLeft} size={20} color='#2B2827' />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesomeIcon icon={faHeadset} size={18} color='#5C5C5C' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
           <Image source={require('../../assets/images/home.png')} style={{ width: 20, height: 20}} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default NavigationHeader

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    height: '13%',
    maxHeight: 100,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1, 
    // backgroundColor:'red',
    textAlign: 'left',
    margin:MARGIN.miniMar,
    left:10
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
});
