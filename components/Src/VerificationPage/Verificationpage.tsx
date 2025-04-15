import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavigationHeader from '@/app/commonComponts/NavigationHeader'
import { MARGIN, PADDING } from '@/constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiClient } from '@/components/Src/api/apiBaseUrl'
import VerificationInput from './VerificationInputFields'
import { VerificedGst } from '../api/apiService'

const VerificationPage = () => {
  const [gst, setGst] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [isGstVerified, setIsGstVerified] = useState(false)
  const [gstError, setGstError] = useState('')
  const [loading, setLoading] = useState(false)

  const validateGst = (gst: string) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/
    return gstRegex.test(gst)
  }

  const handleVerifiedGst = async () => {
    const shopId = await AsyncStorage.getItem("AllshopId")

    if (!gst) {
      setGstError("GST number is required!")
      return
    } else if (!validateGst(gst)) {
      setGstError("Invalid GST number!")
      return
    }

    try {
      setLoading(true)
      const response = await VerificedGst(1, gst)
      if (response.success) {
        setIsGstVerified(true)
        setGstError("")
      } else {
        setGstError(response.message || "GST verification failed!")
      }
    } catch (error) {
      setGstError("Failed to verify GST. Please try again!")
      console.error("GST Verification Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const checkVerified = async () => {
    try {
      const shopId = 1
      const userId = 4665
        const parentShopName = "sp_View_GroceryShop"
      const response = await ApiClient.get(`/${parentShopName}?id=${shopId}`, {
        params: { UserId: `${userId}` },
      });
  
      const data = response?.data?.data;
      if (Array.isArray(data)) {
        const shop = data.find((item) => item.Id === shopId);
        if (shop) {
        setGst(shop?.GSTNumber)
        setEmail(shop?.EmailId)
        setPhoneNumber(shop?.PhoneNumber)
        }

       if(shop?.IsGSTValidate === true){setIsGstVerified(true)}
        if(shop?.IsEmailValidate === true){setIsEmailVerified(true)}   
        if(shop?.IsPhoneValidate === true){setIsPhoneVerified(true)}
        
      }
    } catch (error) {
      console.error("Error fetching GST verification status:", error)
    }
  }

  useEffect(() => {
    checkVerified()
  }, [])

  return (
    <SafeAreaView>
      <NavigationHeader name='Verification' />
      <View style={styles.container}>
        <Text style={styles.title}>Enter your Verification Details Below</Text>

        <VerificationInput
          label="GST Number"
          placeholder="Enter GST no"
          value={gst}
          onChangeText={(text) => {
            setGst(text)
            setGstError("")
            setIsGstVerified(false)
          }}
          onVerifyPress={handleVerifiedGst}
          isVerified={isGstVerified}
          error={gstError}
        />

        <VerificationInput
          label="Email ID"
          placeholder="Enter Your Email"
          value={email}
          onChangeText={setEmail}
          isVerified={isEmailVerified}
          keyboardType="email-address"
          onVerifyPress={handleVerifiedGst}
          error={gstError}
        />

        <VerificationInput
          label="Phone Number"
          placeholder="Enter your Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          isVerified={isPhoneVerified}
          keyboardType="numeric"
          maxLength={13}
          onVerifyPress={handleVerifiedGst}
          error={gstError}
        />
      </View>
    </SafeAreaView>
  )
}

export default VerificationPage

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    height: "93%",
    padding: PADDING.largePad,
  },
  title: {
    fontSize: 20,
    color: "#2B2827",
    textAlign: "center",
    fontWeight: '700',
    margin: MARGIN.miniMar,
    right: 10,
  },
})
