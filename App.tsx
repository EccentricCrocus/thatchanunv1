// App.tsx
import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ListMember from './screens/ListMember';
import Profile from './screens/Profile';
import About from './screens/About';
import BruhButton from './screens/BruhButton';
import { AuthProvider, AuthContext } from './context';
import AddMember from './screens/AddMember';
import EditMember from './screens/EditMember';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="MemStackScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'home-outline';

          if (route.name === 'MemStackScreen') {
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
        name="MemStackScreen"
        component={MemStackScreen}
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
    </Tab.Navigator>
  );
}
function MemStackScreen() {
  return (
    <Stack.Navigator initialRouteName="ListMember">
      <Stack.Screen
        name="ListMember"
        component={ListMember}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddMember"
        component={AddMember}
        options={{
          headerShown: true,
          title: 'Add Member',
        }}
      />
      <Stack.Screen
        name="EditMember"
        component={EditMember}
        options={{
          headerShown: true,
          title: 'Edit Member',
        }}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'เข้าใช้ระบบ' }} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ title: 'สมัครสมาชิก' }} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ title: 'ลืมรหัสผ่าน' }}
      />
    </Stack.Navigator>
  );
}

// Component ที่อ่าน AuthContext ต้องอยู่ "ภายใน" AuthProvider
function RootNavigator() {
  const { authState } = useContext(AuthContext);

  // กันหน้ากระพริบตอนอ่าน AsyncStorage
  if (authState.loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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

const App = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default App;