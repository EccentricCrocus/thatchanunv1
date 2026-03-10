import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { BASE_API_URL } from './globals';
const AddMember = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleAdd = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !sex ||
      !phone ||
      !address ||
      !zipcode ||
      !country
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert(
      'Confirm',
      'Are you sure you want to save this member?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await axios.post(BASE_API_URL + '/membersadd', {
                name_mem: name,
                email_mem: email,
                password_mem: password,
                sex_mem: sex,
                birthday_mem: birthday.toISOString().split('T')[0], // Format date
                phone_mem: phone,
                address_mem: address,
                zipcode_mem: zipcode,
                country_mem: country,
              });
              Alert.alert('Success', 'Member added successfully');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to add member');
            }
          },
        },
      ],
      { cancelable: false },
    );
  };
  return (
    <ScrollView style={styles.container}>
      <Text>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Text>Sex:</Text>
      <Picker
        style={styles.picker}
        selectedValue={sex}
        onValueChange={itemValue => setSex(itemValue)}
      >
        <Picker.Item label="Male" value="1" />
        <Picker.Item label="Female" value="2" />
      </Picker>
      <Text>Birthday:</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.dateText}>{birthday.toDateString()}</Text>
        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={birthday}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setBirthday(selectedDate);
            }}
          />
        )}
      </View>
      <Text>Phone:</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
      <Text>Address:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <Text>Zipcode:</Text>
      <TextInput
        style={styles.input}
        value={zipcode}
        onChangeText={setZipcode}
      />
      <Text>Country:</Text>
      <TextInput
        style={styles.input}
        value={country}
        onChangeText={setCountry}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add Member</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  text: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
  },
  addButton: {
    marginBottom: 30,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align text and button vertically
    justifyContent: 'space-between', // Space between text and button
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Shadow for Android
  },
  dateText: {
    fontSize: 16,
    flex: 1, // Allow text to take available space
    marginRight: 10, // Space between text and button
  },
});
export default AddMember;
