import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../AuthStyles';
const BruhButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Bruh</Text>
        </TouchableOpacity>
    </View>
  );
};
export default BruhButton;
