import {
  View,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { Children, useState } from "react";
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";
import { CountryPicker } from "react-native-country-codes-picker";
import { CheckBox } from "@rneui/themed";
import { usePhoneNumberValidation } from "../api/helper";
// import { CheckBox } from "react-native-elements";

interface CustomLoginInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onClickTerms?: () => void;
  onClickPolicy?: () => void;
  onFirstBtnClick?: () => void;
  onSecondBtnClick?: () => void;
  onNewUserClick?: () => void;
  isPhone?: boolean;
  signupLabel?: string;
  buttonLabel?: string;
  onAppleClick?: () => void;
  countryCode?: string;
  setCountryCode?: (code: string) => void;
  isChecked?: boolean;
  setIsChecked?: (checked: boolean) => void;
  keyboardType?: string;
  title?: string;
  subtitle?: string;
  isSignUp?: boolean;
  disabled?: boolean;
  renderModal?: () => React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
  btnDisable?: boolean;
}

const Login = ({
  placeholder,
  value,
  onChangeText,
  onClickTerms,
  onClickPolicy,
  onSecondBtnClick,
  onFirstBtnClick,
  onNewUserClick,
  isPhone,
  signupLabel,
  buttonLabel,
  countryCode,
  setCountryCode,
  isChecked,
  setIsChecked,
  keyboardType,
  title,
  subtitle,
  isSignUp,
  disabled,
  renderModal,
  children,
  btnDisable,
  loading,
}: CustomLoginInputProps) => {
  const { validatePhoneNumber } = usePhoneNumberValidation();
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);
  const handleClick = () => {

    const phoneError = validatePhoneNumber(value);
    setError(phoneError);

    if (phoneError) {
      return; // Exit the function if there's a phone validation error
    }

    if (!isChecked) {
      setTermsError("You must agree to the terms and conditions.");
      return; // Exit the function if terms are not agreed upon
    } else {
      setTermsError(null);
    }
    console.log(isChecked, "isChecked", phoneError);
    if (!phoneError && isChecked) {
      onFirstBtnClick?.();
    }
  };

  //To change the inputs
  const handleChange = (text: string) => {
    setError("");
    onChangeText?.(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.awareView}
    >
      <View style={styles.imgContain}>
        <Image
          source={require("../../../assets/images/VizhalLogo.png")}
          style={styles.vizhilLogo}
        />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subtitle}</Text>

      <View>
        <CustomTextInput
          disabled={disabled}
          keyboardType={keyboardType}
          countryCode={countryCode}
          onCodeClick={() => setShow(true)}
          placeholder={placeholder}
          onChangeText={handleChange}
          value={value}
          isPhone={isPhone}
          editable
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
      {children && <View style={{ marginVertical: 10 }}>{children}</View>}
      <View style={styles.checkboxContain}>
        <View style={{ width: "10%" }}>
        <CheckBox
  checked={isChecked ?? true}  // Provide default value as false when undefined
  containerStyle={styles.checkbox}
  onPress={() => {
    setTermsError("");
    setIsChecked && setIsChecked(!isChecked);
  }}
/>
        </View>

        <View style={{ width: "90%", justifyContent: "center" }}>
          <Text style={styles.termsText}>
            By continuing, you agree to Vizhil{" "}
            <Text style={{ color: "#1D9846" }} onPress={onClickTerms}>
              Terms of Use
            </Text>{" "}
            and{" "}
            <Text style={{ color: "#1D9846" }} onPress={onClickPolicy}>
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </View>

      {termsError && <Text style={styles.error}>{termsError}</Text>}
      {renderModal && renderModal()}
      <View style={styles.continueText}>
        <CustomButton
          onPress={handleClick}
          buttonLabel={buttonLabel || "Continue"}
          loading={loading}
          disabled={btnDisable}
        />
        {isSignUp && (
          <CustomButton
            isRegister
            onPress={onSecondBtnClick}
            signupLabel={signupLabel || "Exiting user? Log in"}
          />
        )}
        {!isSignUp && (
          <Text onPress={onNewUserClick} style={styles.newText}>
            New to Vizhil? Create a new account{" "}
          </Text>
        )}
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  vizhilLogo: {
    height: 50,
    width: 133,
    marginBottom:30
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
  imgContain: {
    width: "100%",
    alignItems: "center",
    marginTop: 60,
  },
  title: {
    fontFamily: "Urbanist",
    fontWeight: "500",
    fontSize: 20,
    color: "#1E1E1ECC",
    lineHeight: 30,
  },
  subTitle: {
    fontFamily: "Nunito Sans",
    fontWeight: "400",
    fontSize: 15,
    color: "#1E1E1E99",
    marginVertical: 10,
  },
  checkboxContain: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  checkbox: {backgroundColor:"transparent", width: 30, marginLeft: 0 },
  termsText: {
    fontFamily: "Urbanist",
    fontWeight: "500",
    fontSize: 14,
    color: "#1E1E1ECC",
    lineHeight: 25,
    top: 8,
  },
  privacyText: {
    color: "#1D9846",
    fontFamily: "Urbanist",
    fontWeight: "500",
    fontSize: 14,
    top: 5,
  },
  error: { color: "red", left: 15 },
  continueText: { position: "absolute", width: "100%", bottom: 20, left: 20 },
  newText: {
    top: 8,
    color: "#1D9846",
    fontFamily: "Urbanist",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
  awareView: { flex: 1, paddingHorizontal: 20,top:50 },
});

export default Login;
