import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
// import PrimaryBtn from "../appComponent/button/PrimaryButton";
// import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS } from "../constants/Colors";
// import BackBtn from '../components/Button/backBtn';
// import { forgotPassword } from '../api';
import { Snackbar } from "react-native-paper";
// import BackBtn from "../appComponent/button/BackButton";


import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";


import SixDigitInput from "@/components/Src/LoginAndSignup/SixDigitInput";
import PrimaryBtn from "@/appComponent/button/PrimaryButton";
import { emailVerify, phoneVerify, phoneVerifyOtp } from "@/components/Src/api/apiService";
import { tokens } from "react-native-paper/lib/typescript/styles/themes/v3/tokens";
// import PrimaryBtn from "@/appComponent/button/PrimaryButton";
// import { forgotPassword } from '../api/ForgotPassword';
interface OtpProps {
  onSubmitEditing: any
}
const OtpScreen = (props: OtpProps) => {
//   const { newBookingDetails, redirectToLogistics, setRedirectToLogistics, setMyCustomerID, setMyUserID, updateMyDeviceTokenID } = useContext(LogisticCommonDataContext);
//   const { redirectToService, setRedirectToService, redirectToServicePage, setRedirectToServicePage } = useContext(ServiceCommonDataContext);
//   const { redirectToFav, setRedirectToFav, redirectToCart, setRedirectToCart, redirectToMyAcc, setIsUserLoggedIn,
    // setRedirectToMyAcc, redirectToMobileDetails, setRedirectToMobileDetails, setRedirectURL, redirectToPopular, setRedirectToPopular, getAllAdresses } = useContext(CommonDataContext);


  const router = useRouter();
  const params = useLocalSearchParams();
  const {
    id,
    shopId,
    mode,
    isVerify
  } = params;

  const otpInputRef = useRef(null);
  const [timer, setTimer] = useState(61);
  const [resendVisible, setResendVisible] = useState(false);
  const [codeSms, setCodeSms] = useState("");
  const [OTP, setOTP] = useState("");
  const [clearOTP, setClearOTP] = useState("0");
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [otpErrorMsg, setOtpErrorMsg] = useState("");
  const [isLoading1, setIsLoading1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const showSnack = (message: React.SetStateAction<string>) => {
    setSnackMessage(message);
    setSnackVisible(true);
  };

  const hideSnack = () => {
    setSnackVisible(false);
  };
  useEffect(() => {
    let intervalId;

    if (timer === 61) {
      setTimer(60);
      return;
    }

    if (timer === 0) {
      setResendVisible(true); // Set resendVisible to true when timer reaches 0
    } else {
      intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  const resendOTP = async () => {
    setTimer(60);
    setClearOTP("1");
    setResendVisible(false);
    const customerID = await AsyncStorage.getItem("customerId");
    // if (mode != "Email Address") {
    //   try {
    //     // const res = await phoneRegister(id);
    //     // if (res?.statusCode == 200) {
    //     //   // showSnack("OTP Sent Successfully");
    //     // }
    //     const response: any = await sendOtp(id.trim()
    //     );
    //     if (response?.statusCode === 200) {
    //       ToastAndroid.show(response?.message, ToastAndroid.SHORT);
    //     }
    //   } catch (err) { }
    //   // showSnack("OTP Resent Successfully");
    // }
    //  else {
    //   const response = await emailRegister(id);
    //   showSnack("OTP Resent Successfully");
    // }

    // setOTP(response[0].otp);
    // if (response[0].status === 'OTP Was Sent Successfully') {
    //   setLoading(false);
    //   showSnack(response[0].status);

    // } else {

    //   showSnack('Invalid login credentials');
    // }
  };

  const handleOTPChange = (code: string) => {
    setCodeSms(code);
    setClearOTP("0");
    setIsOtpValid(true);
  };

  const clearOtpBorder = (text: string) => {
    if (text.length === 0 || text.length !== 0) {
      setIsOtpValid(true);
      setOtpErrorMsg("");
    }
  };
  const saveUserData = async (userData: any) => {
    try {
      if (userData !== undefined && userData !== null) {
        await AsyncStorage.setItem('userId', JSON.stringify(userData.id));
        await AsyncStorage.setItem('userToken', JSON.stringify(userData.token));
        await AsyncStorage.setItem('phoneNo', JSON.stringify(userData.phoneNumber));
        await AsyncStorage.setItem('refreshToken', JSON.stringify(userData.refreshToken));
        console.log(userData.token)
      } else {
        await AsyncStorage.removeItem('user');
      }
      ;
    } catch (error) {
      console.error('Error saving user data', error);
    }
  };

  // const handlePrevious = () => {
  //   // navigation.navigate("ForgotPassword");
  //   router.push("/login");
  //   setCodeSms("");
  // };

  const handleClick = async () => {
    const userId= await AsyncStorage.getItem("userId");
    setIsLoading1(true);
    if(isVerify==undefined){
      try {
        setLoading(true);
        if (!codeSms) {
          setLoading(false);
          showSnack("OTP is empty");
          return;
        } else {
          try {
            const response: any = await phoneVerifyOtp(id, codeSms);
            router.replace("/shop");
            if (codeSms == "") {
              showSnack("OTP  Is Required");
            }
            if (response.statusCode === 200) {
              if (!response.isNewUser) {
                await saveUserData(response);
                setTimeout(() => {
                  router.push({
                    pathname: '/allshops',
                  });
                }, 2000);
              } else {
                setTimeout(() => {
                  router.push({
                    pathname: '/signup',
                  });
                }, 2000);
              }
            }
          } catch (err: any) {
            if (err.response && err.response.status === 400) {
              const errorMessage: any = err.response.data.message;
              showSnack("Invalid OTP");
            } else {
              console.error(err);
            }
          } finally {
            setLoading(false);
            setIsLoading1(false);
          }
        }
      } catch (error) {}
    }
    else if (isVerify == "true" && mode == "Email Address") {
      try {
        setLoading(true);
        if (!codeSms) {
          setLoading(false);
          showSnack("OTP is empty");
          return;
        } else {
          try {
            const response: any = await emailVerify(Number(shopId), Number(codeSms));            
            router.replace("/verification");
            if (codeSms == "") {
              showSnack("OTP  Is Required");
            }
            if (response.statusCode === 200) {
              await saveUserData(response);
              setTimeout(() => {
                router.push({
                  pathname: '/verification',
                });
              }, 2000);  
          }
        } catch (err: any) {
          if (err.response && err.response.status === 400) {
            const errorMessage: any = err.response.data.message;
            showSnack("Invalid OTP");
          } else {
            console.error(err);
            setTimeout(() => {
              router.push({
                pathname: `/verification`,
                params: {
                  mode: "Mobile Number",
                  id: `${id}`,
                },
              });
            }, 2000);
          }
        } finally {
          setLoading(false);
          setIsLoading1(false);
          
        }
      }
      } catch (error) {}
    }
    // else if (isVerify == "true" && mode == "Mobile Number") {
    //   try {
    //     setLoading(true);
    //     if (!codeSms) {
    //       setLoading(false);
    //       showSnack("OTP is empty");
    //       return;
    //     } else {
    //       try {
    //         const response: any = await phoneVerify(shopId, codeSms);
    //         router.replace("/verification");
    //         if (codeSms == "") {
    //           showSnack("OTP  Is Required");
    //         }
    //         if (response.statusCode === 200) {
    //             await saveUserData(response);
    //             setTimeout(() => {
    //               router.push({
    //                 pathname: '/verification',
    //               });
    //             }, 2000);
               
    //         }
    //       } catch (err: any) {
    //         if (err.response && err.response.status === 400) {
    //           const errorMessage: any = err.response.data.message;
    //           showSnack("Invalid OTP");
    //         } else {
    //           console.error(err);
    //           setTimeout(() => {
    //             router.push({
    //               pathname: '/verification',
    //             });
    //           }, 2000);
    //         }
    //       } finally {
    //         setLoading(false);
    //         setIsLoading1(false);
            
    //       }
    //     }
    //   } catch (error) {}
    // }
  };

  
  return (
    <>
      {/* <SafeAreaView style={styles.container}> */}
      <SafeAreaProvider>
        {/* <ScrollView> */}
        <View style={{ flexDirection: "row" }}>
          {/* <View style={{ width: 50 }}>
            <BackBtn darkMode={false} buttonBack={false} />
          </View>
          {/* <Text style={{ fontWeight: '500', marginTop: 10, fontSize: 16 }}>Verify</Text> */}
        </View>
        <ScrollView style={styles.container}>
          {/* <ImageBackground source={require('../assets/images/ForgetCircle.png')} resizeMode="contain" style={styles.bgImg}> */}

          <Text style={styles.infoText}>
            We sent OTP to your {mode}
            {"\n"}
            <Text style={styles.boldText}>{id}</Text>
          </Text>
          {/* <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text>If You Want to Change {mode}</Text>
            <Text style={styles.linkText} onPress={handlePrevious}>
            {"Please Click here..."}
              </Text>
            </View> */}
          <View>
            {/* <Image style={styles.logo} source={require('../assets/images/Verify.png')} /> */}
          </View>
          {/* </ImageBackground> */}

          <View style={styles.pinContainer}>
            <SixDigitInput
              value={codeSms}
              clearOTP={clearOTP}
              onChangeText={handleOTPChange}
              error={otpErrorMsg}
              onSubmitEditing={handleClick}
            />
          </View>
          <View>
            <Text style={styles.errorText}>{otpErrorMsg}</Text>
          </View>
          <View style={styles.timeContainer}>
            {/* {!resendVisible && (
              <View style={styles.timerRow}>
                <Image
                  source={require("../assets/images/alarmclock.png")}
                  resizeMode="contain"
                  style={styles.timerIcon}
                />
                <Text style={styles.timerText}>
                  {" "}
                  {String(Math.floor(timer / 60)).padStart(2, "0")}:
                  {String(timer % 60).padStart(2, "0")}
                </Text>
              </View>
            )} */}

            {resendVisible ? (
              <TouchableOpacity onPress={resendOTP} style={styles.resendText}>
                <Text style={{ color: COLORS.primary }}>Re-send OTP</Text>
              </TouchableOpacity>
            ) : <View style={styles.timerRow}>
              <Image
                source={require("../assets/images/alarmclock.png")}
                resizeMode="contain"
                style={styles.timerIcon}
              />
              <Text style={styles.timerText}>
                {" "}
                {String(Math.floor(timer / 60)).padStart(2, "0")}:
                {String(timer % 60).padStart(2, "0")}
              </Text>
            </View>}
          </View>
          <View>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={{ width: 200 }}>
                <PrimaryBtn
                  btnTxt="Verify"
                  action={handleClick}
                  loading={loading}
                  btnColor="#F47927"
                  borderRadius={30}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Snackbar
            visible={snackVisible}
            onDismiss={hideSnack}
            action={{
              // label: "OK",
              onPress: () => {
                hideSnack();
              },
            }}
            style={{
              backgroundColor: !snackMessage?.includes("Successfully")
                ? "red"
                : "green",
            }}
          >
            {snackMessage}
          </Snackbar>
        </ScrollView>
        {/* </SafeAreaView> */}
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // textAlign: 'center',
    // padding: 100,
    // height: '400%',
    // backgroundColor:'pink',
    marginTop: "20%",
  },
  bgImg: {
    ...Platform.select({
      ios: {
        width: "82%",
        height: 255,
      },
      android: {
        width: "82%",
        height: 273,
      },
    }),
  },
  infoText: {
    ...Platform.select({
      ios: {
        color: COLORS.black,
        // textAlign: 'right',
        // marginLeft: '20%',
        fontSize: 12,
        textAlign: "center",
        // marginTop: "25%",1
      },
      android: {
        color: COLORS.black,
        textAlign: "center",
        // marginLeft: '22%',
        fontSize: 16,
        // marginTop: '20%',
      },
    }),
    lineHeight: 30
  },
  boldText: {
    fontWeight: "bold",
    // alignItems:'center',
    marginLeft: "150%",
  },
  linkText: {
    fontWeight: "800",
  },
  logo: {
    ...Platform.select({
      ios: {
        width: "100%",
        height: 150,
        margin: 35,
        resizeMode: "contain",
      },
      android: {
        width: "100%",
        height: 150,
        margin: 38,
        resizeMode: "contain",
      },
    }),
  },
  // logo: {
  //   width: '100%',
  //   height: 150,
  //   margin: 50,
  //   resizeMode: 'contain',
  //   // marginBottom: 56,
  // },
  pinContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
    width: "100%",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 25,
  },
  timeContainer: {
    paddingRight: 40,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  timerRow: {
    flexDirection: "row",
    top: -35
  },
  timerIcon: {
    paddingTop: 18,
    width: 15,
    height: 15,
  },
  timerText: {
    color: "black",
    fontSize: 13,
    fontWeight: "500",
    // fontWeight: 500,
  },
  resendText: {
    // display: "flex",
    top: -30
  },
  btnContainer: {
    alignItems: "center",
    // justifyContent: 'center',
    width: "100%",
    height: "100%",
    // marginTop: 10,
    marginBottom: "33%",
  },
});

export default OtpScreen;
