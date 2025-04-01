import { Image, Modal, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faChevronLeft, faXmark, } from '@fortawesome/free-solid-svg-icons';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import Constants from 'expo-constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import { PADDING } from '@/constants/Colors';
interface PropsType {
  name: string,
  isBack?: boolean,
}
const NavigationHeader = (props: PropsType) => {
  const { name, isBack } = props;
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const currentRouteName = route.name;
  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesomeIcon icon={faChevronLeft} size={19} color='#2B2827' style={{}} />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
            <Image source={require('../../assets/images/headset.png')} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../../assets/images/home.png')} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>
              <FontAwesomeIcon icon={faXmark} size={20} color='#333' />
              </Text>
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.modalTitle}>In what way can we help?</Text>
            <Text style={styles.modalSubtitle}>
              Feel free to reach out with your inquiries
            </Text>

            {/* Subject Input */}
            <Text style={styles.label}>Subject:</Text>
            <TextInput style={styles.input} placeholder="Ex: About app" />

            {/* Message Input */}
            <Text style={styles.label}>Message:</Text>
            <View style={{ ...styles.input1 }}>
              <TextInput
                style={[styles.textArea]}
                placeholder="Enter here"
                multiline
              />
            </View>

            {/* Send Button */}
            <TouchableOpacity style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Sent now</Text>
            </TouchableOpacity>

            {/* Contact Info */}
            <Text style={styles.label}>Contact us:</Text>
            <View style={styles.contactContainer}>

              <View style={styles.contactRow}>
                <Text style={styles.contactIcon}>
                  <Image source={require('../../assets/images/phone.png')} style={{ width: 25, height: 25 }} />
                </Text>
                <Text style={styles.contactText}>+91 9360326970</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.contactIcon}>
                  <Image source={require('../../assets/images/email.png')} style={{ width: 25, height: 25 }} />
                </Text>
                <Text style={styles.contactText}>support@vizhil.com</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default NavigationHeader

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    height: '15%',
    maxHeight: 90,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    alignItems: 'center',
    // backgroundColor:'red',
    textAlign: 'left',
    // margin:MARGIN.miniMar,
    left: 10
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: PADDING.largePad,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    // alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: -50,
    right: 20,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  closeText: {
    fontSize: 20,
    color: "#333",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "center",
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#BEBEBE",
    marginBottom: 10,
    marginTop: 5,
    alignSelf: "center",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    marginBottom: 5,
    color: '#060606'
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 10,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  input1: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 10,
    height: "25%",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    textAlignVertical: "top",
    color: '#D0D0D0'
  },
  sendButton: {
    backgroundColor: "#26B24B",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    alignSelf: "flex-end",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'red'
    // marginTop: 20,
    // alignItems: "center",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  contactIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  contactText: {
    fontSize: 14,
    color: "#36A0E2",
  },
});
