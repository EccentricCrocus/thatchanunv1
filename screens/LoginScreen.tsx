// LoginScreen.tsx
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../AuthStyles';
import { AuthContext } from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const { setSignedIn } = useContext(AuthContext);

  const [email_mem, setemail_mem] = useState('');
  const [password_mem, setpassword_mem] = useState('');

  const signIn = async () => {
    if (!email_mem || !password_mem) {
      Alert.alert('Login', 'Please enter email and password');
      return;
    }

    // 🔐 ตัวอย่าง logic (ภายหลังเปลี่ยนเป็น API / Firebase ได้)
    const ok =
      email_mem.trim() === 'std.67122710110@ubru.ac.th' &&
      password_mem === '11112548';

    if (ok) {
      setSignedIn(email_mem.trim());
    } else {
      Alert.alert('Login Failed', 'Invalid email or password');
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

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;