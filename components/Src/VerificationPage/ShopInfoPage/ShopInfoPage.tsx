import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import NavigationHeader from '@/app/commonComponts/NavigationHeader';
import { CommonStyles, MARGIN, PADDING } from '@/constants/Colors';
import { router } from 'expo-router';
import OnboardingTile from './OnboardingTitle';
import { ApiClient } from '../../api/apiBaseUrl';

const Shopinfopage = () => {
  const [ValidationProgress, setValidationProgress] = React.useState(0);
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
        let total = 0;
        if (shop?.IsGSTValidate) total += 1;
        if (shop?.IsEmailValidate) total += 1;
        if (shop?.IsPhoneValidate) total += 1;
        
        setValidationProgress(Math.round((total / 3) * 100));
        
      }
    } catch (error) {
      console.error("Error fetching GST verification status:", error)
    }
  }

  useEffect(() => {
    checkVerified();
  }, []);
  return (
    <SafeAreaView>
      <NavigationHeader name="Onboarding" />
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
            <View style={CommonStyles.Addbutton}>
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>Skip</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.cardcontainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Vizhil Onboarding</Text>
            </View>
            <View>
              <View style={styles.mainTextContainer}>
                <Text style={styles.textare}>
                  We Are
                  <Text style={styles.boldText}> Offering</Text>
                </Text>
              </View>
              <View style={styles.commissionText}>
                <Text style={styles.percentageText}>12% COMMISSION</Text>
              </View>
              <View style={styles.perOrder}>
                <Text style={styles.perOrderText}>Per order</Text>
              </View>
            </View>
          </View>

          <OnboardingTile
            icon={require('../../../../assets/images/storedetails.png')}
            text="Store Details"
            progress={0}
            onPress={() => router.push('/storedetails')}
          />
          <OnboardingTile
            icon={require('../../../../assets/images/verification.png')}
            text="Verification"
            progress={ValidationProgress}
            onPress={() => router.push('/verification')}
          />
          <OnboardingTile
            icon={require('../../../../assets/images/bankdetails.png')}
            text="Bank Details"
            progress={0}
            onPress={() => router.push('/bankdetails')}
          />
          <OnboardingTile
            icon={require('../../../../assets/images/mystore.png')}
            text="My Store"
            showProgress={false}
            onPress={() => router.push('/(drawer)')}
          />
          <OnboardingTile
            icon={require('../../../../assets/images/logout.png')}
            text="Logout"
            showProgress={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Shopinfopage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    height: '100%',
    padding: PADDING.largePad,
  },
  cardcontainer: {
    backgroundColor: '#BFFFD0',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    height: 200,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  badge: {
    backgroundColor: '#0D4D73',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainTextContainer: {
    margin: MARGIN.largeMar,
  },
  textare: {
    fontSize: 20,
    color: '#2B2827',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  commissionText: {
    bottom: 5,
    left: 10,
  },
  percentageText: {
    fontSize: 36,
    fontWeight: 'bold',
    bottom: 15,
  },
  perOrder: {
    justifyContent: 'flex-end',
    bottom: 22,
    alignItems: 'flex-end',
  },
  perOrderText: {
    fontSize: 16,
    color: '#2B2827',
  },
});
