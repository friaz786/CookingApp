//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import ForgotPassword from './screens/ForgotPassword';
import Profile from './screens/Profile';
import Scanner from './screens/Scanner';
import EditProfile from './screens/EditProfile';
//import RecipeDetail from './RecipeDetail';



const Stack = createNativeStackNavigator();



export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="signup" component={Signup}
          options={
            {
              headerShown: false
            }
          }

        />

        <Stack.Screen name="home" component={Home}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="forgotpassword" component={ForgotPassword}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="profile" component={Profile}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="editprofile" component={EditProfile}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="scanner" component={Scanner}
          options={
            {
              headerShown: false
            }
          }

        />
      </Stack.Navigator>

    </NavigationContainer>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});

