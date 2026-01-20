    import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../AuthStyles';
import { AuthContext } from '../context';
const About = () => {
  const { signOut } = useContext(AuthContext);
  const aboutsignOut = async () => {
      signOut();
  };
  return (
    <View style={styles.container}>
       <Text style={styles.title}>Logging Out? Kinda Cringe Honestly</Text>
      <TouchableOpacity style={styles.button} onPress={aboutsignOut}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default About;