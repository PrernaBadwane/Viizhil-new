import { ScrollView, StyleSheet, View, Alert, Text, TouchableOpacity, Linking, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import NavigationHeader from '@/app/commonComponts/NavigationHeader';
import { MARGIN, PADDING } from '@/constants/Colors';
import PrimaryBtn from '@/appComponent/button/PrimaryButton';
import { addShopDocuments, updateShopDocument } from '../../api/apiService';
import DocumentUploader from './DocumentUploader';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiClient } from '../../api/apiBaseUrl';

export type FileType = {
  uri: string;
  name: string;
  mimeType?: string;
};

export type TDocumentForm = {
  ShopId: number | string;
  CreatedBy: number | string;
  GSTDocument: FileType;
  MSMEDocument: FileType;
  FSSAIDocument: FileType;
};

const Documentupload = () => {
  const { id, mode } = useLocalSearchParams();

  const [gstDoc, setGstDoc] = useState(null);
  const [msmeDoc, setMsmeDoc] = useState(null);
  const [fssaiDoc, setFssaiDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [documentId, setDocumentId] = useState("");

  
  // console.log('gst doc',gstDocument);
  
// Upload document function
  const handleSubmit = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!gstDoc || !msmeDoc || !fssaiDoc) {
      Alert.alert('Validation Error', 'Please upload all required documents.');
      return;
    }

    const formData = new FormData();
    formData.append('Id', userId!.toString());
    formData.append('ShopId', id.toString());
    formData.append('CreatedBy', userId!.toString());
    formData.append('GSTDocument', {
      uri: gstDoc.uri,
      name: gstDoc.name,
      type: gstDoc.mimeType || 'application/pdf',
    } as any);
    formData.append('MSMEDocument', {
      uri: msmeDoc.uri,
      name: msmeDoc.name,
      type: msmeDoc.mimeType || 'application/pdf',
    } as any);
    formData.append('FSSAIDocument', {
      uri: fssaiDoc.uri,
      name: fssaiDoc.name,
      type: fssaiDoc.mimeType || 'application/pdf',
    } as any);
    

    try {
      setLoading(true);
      const response = await addShopDocuments(formData);
      setNavigate(true)
      if (response?.statusCode === 200) {
        Alert.alert(response?.message || 'Success', 'Documents uploaded successfully.');
      } else if (response?.statusCode === 400) {
        Alert.alert(response?.message || 'Something went wrong');
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'An error occurred while uploading documents.';
      Alert.alert('Upload Failed', errorMessage);
    } finally {
      setLoading(false);
    }
    
  };

  const [gstDocument, setGstDocument] = useState(null);
  const [FSSAIDocument, setFSSAIDocument] = useState(null);
  const [MSMEDocument, setMSMEDocument] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const getShopDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const shopId = id;
      const response = await ApiClient.get(
        `/sp_View_GroceryShop?UserId=${userId}&Id=${shopId}`,
        {
          params: { UserId: `${userId}` },
        }
      );

      const data = response?.data?.data[0];

      if(data?.DocumentId) setDocumentId(data.DocumentId);
      if (data?.GSTDocument) setGstDocument(data.GSTDocument);
      if (data?.FSSAIDocument) setFSSAIDocument(data.FSSAIDocument);
      if (data?.MSMEDocument) setMSMEDocument(data.MSMEDocument);
    

    } catch (error) {
      console.error("Error fetching shop details:", error);
    }
  };

  useEffect(() => {
    getShopDetails();
  }, []);

  const openPDF = (url:any) => {
    Linking.openURL(url);
  };

  const handleUpdateShopDocuments = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const shopId = id;
      const formData = new FormData();
      formData.append('Id', documentId!.toString());
      formData.append('ShopId', shopId.toString());
      formData.append('ModifiedBy', userId!.toString());
      formData.append('GSTDocument', {
        uri: gstDoc.uri,
        name: gstDoc.name,
        type: gstDoc.mimeType || 'application/pdf',
      } as any);
      formData.append('MSMEDocument', {
        uri: msmeDoc.uri,
        name: msmeDoc.name,
        type: msmeDoc.mimeType || 'application/pdf',
      } as any);
      formData.append('FSSAIDocument', {
        uri: fssaiDoc.uri,
        name: fssaiDoc.name,
        type: fssaiDoc.mimeType || 'application/pdf',
      } as any);
      setLoading(true);
      const response = await updateShopDocument(formData);
      console.log(response);
      if (response?.statusCode === 200) {
        setNavigate(true);
        Alert.alert(response?.message || 'Success', 'Documents updated successfully.');
      } else if (response?.statusCode === 400) {
        Alert.alert(response?.message || 'Something went wrong');
        setEditMode(false);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'An error occurred while uploading documents.';
      Alert.alert('Upload Failed', errorMessage);
    } finally {
      setLoading(false);

    } 
  }
   const navigateToShopDetails = async () => {
      if (navigate) {
        if ( id) {
          router.push({
            pathname: "/shopinfo", 
            params: { mode: "Mobile Number", id: id.toString() }, 
          });
        }  else {
        console.log("Operation was not successful, navigation skipped.");
      }
    }}

    useEffect(() => {
      if (navigate) {
        navigateToShopDetails();
      }
    },[navigate]);

  return (
    <View style={{ flex: 1 }}>
      <NavigationHeader name="Documentation" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <DocumentUploader label={`${gstDocument ? 'Uploaded' : 'Upload'} GST Document :`} file={gstDoc} setFile={setGstDoc} defaultFile={gstDocument} />
          <DocumentUploader label={`${MSMEDocument ? 'Uploaded' : 'Upload'} MSME Document :`} file={msmeDoc} setFile={setMsmeDoc} defaultFile={MSMEDocument} />
          <DocumentUploader label={`${FSSAIDocument ? 'Uploaded' : 'Upload'} FSSAI Document :`} file={fssaiDoc} setFile={setFssaiDoc} defaultFile={FSSAIDocument} />

          {
            gstDocument && MSMEDocument && FSSAIDocument && !editMode?
            <View style={styles.saveButton}>
            <PrimaryBtn action={() => {setEditMode(true); setGstDocument(null); setFSSAIDocument(null); setMSMEDocument(null);}} btnTxt="Update Details" loading={loading} />
          </View>
          :
          !editMode && <View style={styles.saveButton}>
          <PrimaryBtn action={handleSubmit} btnTxt="Save" loading={loading} />
        </View>
          }

          {
            editMode &&
            <View style={styles.saveButton}>
            <PrimaryBtn action={handleUpdateShopDocuments} btnTxt="Submit" loading={loading} />
          </View>
          }
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
  },
  saveButton: {
    marginTop: MARGIN.largeMar,
  },
});