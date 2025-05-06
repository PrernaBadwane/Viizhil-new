import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

type Props = {
  label: string;
  file: any;
  setFile: (file: any) => void;
  defaultFile? : any;
};

const DocumentUploader = ({ label, file, setFile , defaultFile}: Props) => {
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets?.[0]) {
        setFile(result.assets[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.uploadSection}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
        {
          defaultFile ?
          <TouchableOpacity onPress={() => Linking.openURL(file.uri)}>
            <Text style={styles.previewText}>📄 {defaultFile}</Text>
          </TouchableOpacity>
          :
          !file ? (
            <>
              <Text style={styles.uploadText}>
                Drop your file(s) here or <Text style={{ color: '#26B24B' }}>browse</Text>
              </Text>
              <Text style={styles.fileSizeText}>Max File size: 500KB</Text>
            </>
          ) : (
            <TouchableOpacity onPress={() => Linking.openURL(file.uri)}>
              <Text style={styles.previewText}>📄 {file.name}</Text>
            </TouchableOpacity>
          )
        }
      </TouchableOpacity>
      <Text style={styles.allowedText}>(Allowed PDF, DOC, DOCX only)</Text>
    </View>
  );
};

export default DocumentUploader;

const styles = StyleSheet.create({
  uploadSection: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#060606',
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#aaa',
    backgroundColor: '#e8f5e9',
    padding: 20,
    alignItems: 'center',
    borderRadius: 5,
    minHeight: 100,
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
  previewText: {
    color: '#1a73e8',
    textDecorationLine: 'underline',
  },
});