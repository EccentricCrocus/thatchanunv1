// LoginScreen.tsx
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../AuthStyles';
import { AuthContext } from '../context';
import axios from 'axios';
import { BASE_API_URL } from './globals';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { setSignedIn } = useContext(AuthContext);

  const [email_mem, setemail_mem] = useState('');
  const [password_mem, setpassword_mem] = useState('');

  const signIn = async () => {
    if (!email_mem || !password_mem) {
      Alert.alert('Login', 'Please enter email and password');
      return;
    }

    try {
      const response = await axios.post(BASE_API_URL + '/login', {
        email_mem: email_mem.trim(),
        password_mem: password_mem.trim(),
      });
      if (response.status === 200) {
        console.log('Login successful:', response.data.user);
        await setSignedIn(email_mem.trim()); 
        console.log('User logged in:', email_mem.trim());
      }else{
        console.log('Login failed:');
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Server Error');
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email_mem}
        onChangeText={setemail_mem}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password_mem}
        onChangeText={setpassword_mem}
      />

      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPasswordScreen')}
      >
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;