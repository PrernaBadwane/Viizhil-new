import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface OnboardingTileProps {
  icon: any;
  text: string;
  progress?: number;
  onPress?: () => void;
  showProgress?: boolean;
}

const OnboardingTile = ({
  icon,
  text,
  progress = 0,
  onPress,
  showProgress = true,
}: OnboardingTileProps) => {
  return (
    <TouchableOpacity style={styles.subcardcontainer} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={{ height: 30, width: 30 }} />
      </View>
      <Text style={styles.text}>{text}</Text>
      {showProgress && (
        <AnimatedCircularProgress
          size={33}
          width={2}
          fill={progress}
          tintColor="#D3D3D3"
          backgroundColor="#F0F0F0"
          rotation={0}
        >
          {() => (
            <View style={styles.textContainer}>
              <Text style={styles.progressText}>{progress}%</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      )}
      <FontAwesomeIcon icon={faChevronRight} size={22} color="#2B2827" />
    </TouchableOpacity>
  );
};

export default OnboardingTile;

const styles = StyleSheet.create({
  subcardcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    width: '100%',
    height: 70,
    borderRadius: 10,
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 15,
  },
  iconContainer: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
  },
  progressText: {
    fontSize: 10,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
