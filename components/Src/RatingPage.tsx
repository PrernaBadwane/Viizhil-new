import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { PADDING } from '@/constants/Colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import PrimaryBtn from '@/appComponent/button/PrimaryButton'

const RatingPage = () => {
  const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);
  
  
      const handleSubmit = () => {
          setLoading(true);
          setTimeout(() => {
              setLoading(false);
              alert('Verification Submitted!');
          }, 2000);
      };
  return (
    <View>
      <View style={{ ...styles.headercontainer }}>
        <View>
          <Text style={{ ...styles.headertext }}>Vizhil Grocery</Text>
          <Text style={{ ...styles.subtext }}>INJAMBAKKAM</Text>
        </View>
      </View>
      <View style={{ ...styles.container }}>
        <View style={styles.ratingcontainer}>
          {/* Profile Section */}
          <Image
            source={require('../../assets/images/dummy.png')} // Replace with actual image
            style={styles.profileImage}
          />
          <Text style={styles.name}>Guru Grocery</Text>
          <Text style={styles.subText}>shop</Text>

          {/* Rating Section */}
          <View style={{ flexDirection: 'row', }}>
            <FontAwesomeIcon icon={faStar} size={24} color="#26B24B" />
            <FontAwesomeIcon icon={faStar} size={24} color="#26B24B" />
            <FontAwesomeIcon icon={faStar} size={24} color="#26B24B" />
            <FontAwesomeIcon icon={faStar} size={24} color="#26B24B" />
            <FontAwesomeIcon icon={faStar} size={24} color="#26B24B" />
          </View>

          {/* Feedback Text */}
          <Text style={styles.feedbackText}>Give A Feedback For The App</Text>
        </View>
        <View style={styles.reviewcontainer}>
          {/* Title */}
          <Text style={styles.title}>Where Can We Improve ?</Text>

          {/* Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>All</Text>
          </TouchableOpacity>

          {/* Suggestion Input */}
          <TextInput
            style={styles.input}
            placeholder="Any other Suggestion ?"
            placeholderTextColor="gray"
            value={suggestion}
            onChangeText={setSuggestion}
            multiline
          />

          {/* Footer Note */}
          <Text style={styles.footerText}>
            Private feedback is only seen by rover. Share concern you don’t post publicly.
          </Text>
        </View>
        <View>
          <PrimaryBtn action={handleSubmit} btnTxt="Save" loading={loading} />
        </View>
      </View>
    </View>
  )
}

export default RatingPage

const styles = StyleSheet.create({
  headercontainer: {
    height: "40%",
    backgroundColor: "#FFFFF",
    maxHeight: 100,
    paddingTop: 40,
    padding: PADDING.largePad
  },
  headertext: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2827",
    marginLeft: 15
  },
  subtext: {
    fontSize: 12,
    fontWeight: "600",
    color: "#747474",
    marginLeft: 15
  },
  container: {
    height: '100%',
    // backgroundColor: "red",
    padding: PADDING.largePad
  },
  ratingcontainer: {
    alignItems: "center",
    padding: 20,
    // backgroundColor: "white",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  subText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  reviewcontainer: {
    // backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
    // elevation: 3,
    // margin: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "green",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  buttonText: {
    color: "green",
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    padding: 10,
    height: "40%",
    textAlignVertical: "top",
    color: "#000",
    borderColor: '#F6F6F6',
    borderWidth: 1,

  },
  footerText: {
    fontSize: 12,
    color: "gray",
    marginTop: 10,
  },
})