//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Login';
import Signup from './Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import ForgotPassword from './ForgotPassword';
import Profile from './Profile';
import Scanner from './Scanner';
import EditProfile from './EditProfile';
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

