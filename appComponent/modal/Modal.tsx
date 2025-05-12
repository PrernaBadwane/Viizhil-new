import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmModal = ({ isVisible, onClose, onConfirm1,onConfirm2, title, option1, option2, btnColor }) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Close (×) button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
  <View style={styles.closeCircle}>
    <Text style={styles.closeText}>×</Text>
  </View>
</TouchableOpacity>

          <Text style={styles.title}>{title}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onConfirm1} style={styles.saveButton}>
              <Text style={styles.saveText}>{option1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm2} style={[styles.cancelButton, { borderColor: btnColor }]}>
              <Text style={[styles.cancelText, { color: btnColor }]}>{option2}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    paddingTop: 35, // Add space for close button
    alignItems: "center",
    elevation: 10,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 1,
    padding: 10,
  },
  closeText: {
  fontSize: 20,
  fontWeight: "bold",
  color: "#999",
    textAlign: "center",
},
  closeCircle: {
  backgroundColor: "#99999933",
  width: 20,
  height: 20,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
},
  title: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  saveButton: {
    backgroundColor: "#1F6F4A",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelButton: {
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
  },
  cancelText: {
    fontWeight: "600",
  },
});
