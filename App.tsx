// App.tsx
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

import ListMember from './screens/ListMember';
import Profile from './screens/Profile';
import About from './screens/About';

import { AuthProvider, AuthContext } from './context';
import BruhButton from './screens/BruhButton';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="ListMember"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'home-outline';

          if (route.name === 'ListMember') {
            iconName = focused ? 'pizza' : 'pizza-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'people-circle' : 'person-circle-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'nuclear' : 'nuclear-outline';
          } else if (route.name === 'BruhButton') {
            iconName = focused ? 'planet' : 'planet-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#800020',
        tabBarInactiveTintColor: '#3eb489',
      })}
    >
      <Tab.Screen
        name="ListMember"
        component={ListMember}
        options={{ title: 'รายการสมาชิก' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'โปรไฟล์' }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{ title: 'ตั้งค่า' }}
      />
      <Tab.Screen
        name="BruhButton"
        component={BruhButton}
        options={{ title: 'ปุ่ม' }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: 'เข้าใช้ระบบ' }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ title: 'สมัครสมาชิก' }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ title: 'ลืมรหัสผ่าน' }}
      />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { authState } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authState.signedIn ? (
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
