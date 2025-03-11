import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { PADDING } from '@/constants/Colors'
import { router } from 'expo-router'
import { useRoute } from '@react-navigation/native'
interface PropsType {
    name: string,
    isBack?: boolean,
  }
const HomeHeader = (props: PropsType) => {
      const { name, isBack } = props;
      const route = useRoute();
    return (
        <View style={{ ...styles.container }}>
            <TouchableOpacity onPress={() => { router.back() }}>
                <FontAwesomeIcon icon={faChevronLeft} size={20} color='#2B2827' />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.storeName}>{name}</Text>
            </View>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    container: {
        height: "37%",
        backgroundColor: '#fff',
        maxHeight: 100,
        paddingTop: 50,
        padding: PADDING.largePad,
        flexDirection: "row",
        alignItems: "center",
    },
    textContainer: {
        flex: 1, // Takes available space
        marginLeft: 15,
    },
    storeName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
})