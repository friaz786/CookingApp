import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'; // Importing necessary functions
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import db from your firebase.js
import {UserModel} from '../models/UserModel';
// import {app} from './firebase';

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const auth = getAuth();

    const handleSignup = async () => {
        try {
            console.log('Attempting to create user');
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created:', userCredential.user);
        
            const user = userCredential.user;
        
            console.log('Preparing user data for Firestore');
            const newUser = new UserModel(name,phoneNumber);
        
            console.log('Attempting to store user data in Firestore');
            await setDoc(doc(db, "users", user.uid), newUser.toFirestore());
            Alert.alert('User registered successfully');
            console.log('Signup and user data storage successful');
            navigation.navigate('login');
        } catch (error) {
            console.error('Error during signup:', error);
            setErrorMessage(error.message);
        }
        
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Create New Account</Text>

            {/* Name Input */}
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Name"
            />

            {/* Email Input */}
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
            />

            {/* Phone Number Input */}
            <TextInput
                style={styles.input}
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                placeholder="Phone Number"
                keyboardType="phone-pad"
            />

            {/* Password Input */}
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
            />

            {/* Signup Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.linkText} onPress={() => navigation.navigate('login')}>
                Already Registered? Login here
            </Text>
        </View>
    );
};

// ... Include your styles and any other necessary code here ...

// ... styles and export ...


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            backgroundColor: '#f7f7f7',
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 30,
        },
        input: {
            width: '100%',
            height: 50,
            backgroundColor: '#fff',
            padding: 10,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            marginBottom: 15,
        },
        button: {
            width: '100%',
            padding: 15,
            backgroundColor: '#5cb85c',
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 20,
        },
        buttonText: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
        },
        linkText: {
            color: '#ff6f69', // Pastel pink
            marginTop: '5%',
        }
    });

    export default Signup;
