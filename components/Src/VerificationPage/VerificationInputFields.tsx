// components/VerificationInput.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onVerifyPress?: () => void;
  isVerified: boolean;
  error?: string;
  keyboardType?: "default" | "email-address" | "numeric";
  maxLength?: number;
  editable?: boolean;
}

const VerificationInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  onVerifyPress,
  isVerified,
  error,
  keyboardType = "default",
  maxLength,
  editable,
}: Props) => {
  console.log(isVerified, "isVerified");
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
          editable={editable}
        />
        {isVerified ? (
          <Image
            source={require("../../../assets/images/check.png")}
            style={styles.checkIcon}
          />
        ) : (
          onVerifyPress && (
            <TouchableOpacity style={styles.verifyBtn} onPress={onVerifyPress}>
              <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>
          )
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default VerificationInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#060606",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B0B0B0",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: "#000",
  },
  verifyBtn: {
    backgroundColor: "#28A745",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 6,
    height: 30,
    marginLeft: 10,
  },
  verifyText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  checkIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});
