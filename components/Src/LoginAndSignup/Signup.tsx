import {
  View,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../../CustomTextInput";
import CustomButton from "../../CustomButton";
import { CountryPicker } from "react-native-country-codes-picker";
import { createProfile } from "../api/apiService";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface InputField {
  id?: string;
  placeholder?: string;
  imagePath?: string;
  keyboardType?: string;
  initialValue?: string;
  editable?: boolean;
  isMandatory?: boolean;
  visible?: boolean;
  isPhone?: boolean;
}
interface CustomSignUpInputProps {
  onSecondBtnClick?: (formData: {
    [key: string]: string | number | boolean;
  }) => void;
  onOldUserClick?: () => void;
  buttonLabel?: string;
  inputFields?: InputField[];
  keyboardType?: string;
  children?: React.ReactNode;
  loading?: boolean;
  btnDisable?: boolean;
}

const SignUp: React.FC<CustomSignUpInputProps> = ({
  onSecondBtnClick, 
  onOldUserClick,
  buttonLabel, // Default label if not passed
  inputFields = [
    { id: "first Name", placeholder: "First Name", isMandatory: true },
    { id: "last Name", placeholder: "Last Name", isMandatory: true },
    {
      id: "phoneNo",
      placeholder: "Phone Number",
      isMandatory: true,
      isPhone: true,
    },
    { id: "email", placeholder: "Email", isMandatory: false },
  ],

  children,
  loading,
  btnDisable,
}) => {
  const initialFormData = inputFields.reduce((acc, field) => {
    if (field.id) {
      acc[field.id] = field?.initialValue ?? ""; // Initialize empty value for each input field
    }
    return acc;
  }, {} as { [key: string]: string });
  const [countryCode, setCountryCode] = useState("+1");
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    initialFormData
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // const handleInputChange = (id: string, value: string) => {
  //   setFormData((prevData) => ({ ...prevData, [id]: value }));
  //   setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));

  // };
  const saveUserData = async (userData: any) => {
    try {
      if (userData !== undefined && userData !== null) {
        await AsyncStorage.setItem('userId', JSON.stringify(userData.id));
        await AsyncStorage.setItem('userToken', JSON.stringify(userData.accessToken));
      } else {
        await AsyncStorage.removeItem('user');
      }
      ;
    } catch (error) {
      console.error('Error saving user data', error);
    }
  };
  const validateForm = () => {
    let valid = true;
    let newErrors: { [key: string]: string } = {};

    inputFields.forEach((field) => {
      if (!field.id) return;
      const value = formData[field.id].trim();
      if (!value && field.isMandatory) {
        valid = false;
        newErrors[field.id] = `${field.placeholder} is required.`;
      } else {
        // Additional validations
        if (
          field.id === "email" &&
          !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value) &&
          value.length > 0
        ) {
          valid = false;
          newErrors[field.id] = "Enter a valid email address.";
        }
        if (field.id === "phone" && !/^\d{10}$/.test(value)) {
          valid = false;
          newErrors[field.id] = "Enter a valid 10-digit phone number.";
        }
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleButtonClick = async () => {
    if (validateForm()) {
      let updatedFormData = { ...formData };
  
      if (updatedFormData["phoneNo"]) {
        updatedFormData["phoneNo"] = countryCode + updatedFormData["phoneNo"];
      }
  
      const apiFormattedData = {
        firstname: updatedFormData["first Name"] || "",
        lastname: updatedFormData["last Name"] || "",
        email: updatedFormData["email"] || "",
        phonenumber: updatedFormData["phoneNo"] || "",
        dob: "", // empty for now
        gender: "", // empty for now
        password: "", // empty for now
        userType: "grocery",
        signintype: "phonenumber",
        createdBy: "",
        referrerId: "",
        captainType: 0,
        isAdminUser: false,
        userRoleId: 0,
      };
  
      try {
        const response = await createProfile(apiFormattedData);
        
        await saveUserData(response); 
        console.log("Signup success:", response);
        router.push({
          pathname: `/allshops`,
        });
        router.replace('/shop');
        // Maybe navigate or show success toast/snackbar here
      } catch (error) {
        console.error("Signup error:", error);
        // Maybe show error toast/snackbar here
      }
    }
  };
  
  

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1, paddingHorizontal: 15, backgroundColor: "#FFF" }}
    >
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <View style={{ marginTop: 60, marginLeft: 15 }}>
            <Text style={styles.gtStart}>Getting Started</Text>
            <Text style={styles.createAcc}>Create an account to continue!</Text>
          </View>

          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Image
              source={require("../../../assets/images/signUp.png")}
              style={styles.vizhilLogo}
            />
          </View>

          <View>
            {inputFields.map((field) => (
              <View key={field.id}>
                <CustomTextInput
                  isSignUp
                  placeholder={field.placeholder}
                  value={field.id && formData[field.id]}
                  onChangeText={(text) => {
                    if (field.id) {
                      setFormData((prevData) => ({
                        ...prevData,
                        [field.id!]: text,
                      }));
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        [field.id!]: "",
                      }));
                    }
                  }}
                  imgPath={field.imagePath}
                  countryCode={countryCode}
                  onCodeClick={() => setShow(true)}
                  keyboardType={field.keyboardType}
                  editable={field.editable}
                  isPhone={field.isPhone}
                />
                {field.id && errors[field.id] ? (
                  <Text style={styles.errorText}>{errors[field.id]}</Text>
                ) : null}
              </View>
            ))}
          </View>
          <View style={{ marginVertical: 10 }}>{children}</View>
        </View>

        {/* Button container at bottom using flexbox */}
        <View style={{ marginBottom: 20 }}>
          <CustomButton
            onPress={handleButtonClick}
            buttonLabel={buttonLabel || "Login"}
            loading={loading}
            disabled={btnDisable}
          />
        </View>
      </View>
      <CountryPicker
        key={show ? "open" : "closed"} // Forces re-render
        lang="en"
        show={show}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          if (setCountryCode) setCountryCode(item.dial_code);
          setShow(false);
        }}
        popularCountries={["en", "ua", "pl"]}
        style={{
          // Styles for whole modal [View]
          modal: {
            height: 500,
          },
        }}
        onBackdropPress={() => setShow(false)}
      />
    </ScrollView>
  );
};
export default SignUp;

const styles = StyleSheet.create({
  vizhilLogo: {
    height: 129,
    width: 261,
  },
  linecontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  errorText: {
    color: "red",
    marginLeft: 15,
  },
  gtStart: {
    color: "#1E1E1EE5",
    fontFamily: "Urbanist",
    fontWeight: "600",
    fontSize: 24,
  },
  createAcc: {
    color: "gray",
    fontFamily: "Urbanist",
    fontWeight: "400",
    fontSize: 14,
  },
  btnContain: { position: "absolute", width: "100%", bottom: 20 },
});
