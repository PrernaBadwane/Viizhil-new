import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import NavigationHeader from '@/app/commonComponts/NavigationHeader';
import { MARGIN, PADDING } from '@/constants/Colors';
import PrimaryBtn from '@/appComponent/button/PrimaryButton';

const Documentupload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Verification Submitted!');
    }, 2000);
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationHeader name="Documentation" />
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.uploadSection}>
            <Text style={styles.label}>Upload GST Document :</Text>
            <TouchableOpacity style={styles.uploadBox}>
              <Text style={styles.uploadText}>
              <Text>Drop your file(s) here or <Text style={{color:'#26B24B'}}>browse</Text></Text>
              </Text>
              <Text style={styles.fileSizeText}>Max File size: 500KB</Text>
            </TouchableOpacity>
            <Text style={styles.allowedText}>(Allowed png, jpg, jpeg, and pdf only)</Text>
          </View>

          <View style={styles.uploadSection}>
            <Text style={styles.label}>Upload MSME Document :</Text>
            <TouchableOpacity style={styles.uploadBox}>
              <Text style={styles.uploadText}>
               <Text>Drop your file(s) here or <Text style={{color:'#26B24B'}}>browse</Text></Text>
              </Text>
              <Text style={styles.fileSizeText}>Max File size: 500KB</Text>
            </TouchableOpacity>
            <Text style={styles.allowedText}>(Allowed png, jpg, jpeg, and pdf only)</Text>
          </View>

          {/* Submit Button */}
          <View style={styles.saveButton}>
            <PrimaryBtn action={handleSubmit} btnTxt="Save" loading={loading} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Documentupload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING.largePad,
    backgroundColor: '#F9F9F9',
  },
  scrollContent: {
    padding: PADDING.medPad,
    // flexGrow: 1,
    // paddingBottom: 30, // To prevent cut-off at the bottom
  },
  uploadSection: {
    marginTop: MARGIN.medMar,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color:"#060606"
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#aaa',
    backgroundColor: '#e8f5e9',
    padding: 20,
    alignItems: 'center',
    borderRadius: 5,
    minHeight: 190,
    justifyContent: 'center',
    width: '100%',
  },
  uploadText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  fileSizeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  allowedText: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
  },
  saveButton: {
    marginTop: MARGIN.largeMar,
  },
});
