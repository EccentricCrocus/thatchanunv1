import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { BASE_API_URL } from './globals';

const ListMember = ({ navigation }: { navigation: any }) => {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const fetchMembers = async () => {
    try {
      const response = await axios.post(BASE_API_URL + '/members/search', {
        name_mem: name,
      });
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchMembers();
      return () => {};
    }, []),
  );
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <TouchableOpacity style={styles.searchButton} onPress={fetchMembers}>
          <Text style={styles.addButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={members}
        keyExtractor={item => item.id_mem.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Name: {item.name_mem}</Text>
            <Text>Email: {item.email_mem}</Text>
            <Text>Phone: {item.phone_mem}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditMember', { member: item })
              }
            >
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddMember')}
      >
        <Text style={styles.addButtonText}>Add Member</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  editLink: {
    color: 'blue',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default ListMember;
