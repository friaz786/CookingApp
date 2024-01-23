import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import rec from '../assets/appLogo.jpg';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const auth = getAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login Successful');
      navigation.navigate('home')

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Image source={rec} style={styles.logo} />

      {/* Email Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>

      {/* Password Input Field */}

      <View style={styles.inputContainer}>
        <View style={styles.passContainer}>
          <TextInput
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={passwordVisibility}
          />
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon name={passwordVisibility ? 'eye-slash' : 'eye'} size={20} color="grey" />
          </TouchableOpacity>
        </View>
      </View>


      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password Link */}
      <Text style={styles.linkText} onPress={() => navigation.navigate('forgotpassword')}>Forgot Password?</Text>

      {/* Account Creation Link */}
      <Text style={styles.linkText} onPress={() => navigation.navigate('signup')}>Don't have an account? Create new account</Text>

      {/* Feedback Mechanism */}
      {/* Display error or confirmation messages here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    
    height: '30%',
    resizeMode: 'contain',
    marginBottom: '15%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#b8e994', // Pastel green
    width: '80%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: '7%',
    marginTop: 17
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  linkText: {
    color: '#ff6f69', // Pastel pink
    marginBottom: '4%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  iconContainer: {
    borderColor: 'black',
    flex: 1,
    justifyContent: 'right',
    alignItems: 'right'

  },
  passContainer: {
    flex: 12,
  },
});

export default Login;