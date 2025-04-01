import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
 
export default function TabLayout() {
  const colorScheme = useColorScheme();
 
  return (
    <Tabs
      screenOptions={{ headerShown: false}}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
              //   require("../../assets/images/activehome.png")
               focused
                ? require("../../assets/images/activehome.png")
                : require("../../assets/images/home.png")
              }
              style={[styles.BottomMenuImg, {tintColor: focused ? '#26B24B' : '#5C5C5C'}]}
            />
          ),
          tabBarLabel: "Home",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarInactiveTintColor: "#5C5C5C",
          tabBarActiveTintColor: "#26B24B",
        }}
      />
       <Tabs.Screen
        name="grocery"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused
                  ? require("../../assets/images/activegrocery.png")
                  : require("../../assets/images/grocery.png")
              }
              style={[styles.BottomMenuImg, {tintColor: focused ? '#26B24B' : '#5C5C5C'}]}
            />
          ),
          tabBarLabel: "Grocery",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarInactiveTintColor: "#5C5C5C",
          tabBarActiveTintColor: "#26B24B",
        }}
      />
       <Tabs.Screen
        name="shop"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused
                  ? require("../../assets/images/activeshop.png")
                  : require("../../assets/images/shoplogo.png")
              }
              style={[styles.BottomMenuImg, {tintColor: focused ? '#26B24B' : '#5C5C5C'}]}
            />
          ),
          tabBarLabel: "Shop",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarInactiveTintColor: "#5C5C5C",
          tabBarActiveTintColor: "#26B24B",
        }}
      />
      <Tabs.Screen
        name="rating"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused
                  ? require("../../assets/images/activerating.png")
                  : require("../../assets/images/rating.png")
              }
              style={[styles.BottomMenuImg, {tintColor: focused ? '#26B24B' : '#5C5C5C'}]}
            />
          ),
          tabBarLabel: "Rating",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarInactiveTintColor: "#5C5C5C",
          tabBarActiveTintColor: "#26B24B",
        }}
      />
       <Tabs.Screen
        name="more"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={
                focused
                  ? require("../../assets/images/activemore.png")
                  : require("../../assets/images/more.png")
              }
              style={[styles.BottomMenuImg, {tintColor: focused ? '#26B24B' : '#5C5C5C'}]}
            />
          ),
          tabBarLabel: "More",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarInactiveTintColor: "#5C5C5C",
          tabBarActiveTintColor: "#26B24B",
        }}
      />
     
     
    </Tabs>
  );
}
 
const styles = StyleSheet.create({
  BottomMenuImg: {
    width: 23,
    height: 23,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '500',
    // color:'#26B24B',
    textAlign: 'center',
  },
})