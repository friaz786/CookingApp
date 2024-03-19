import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../firebase'; // Import your Firebase config
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Video } from "expo-av";

export default function Save({ route, navigation }) {
  const { image } = route.params;
  const [caption, setCaption] = useState('');
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserID(user.uid);
      } else {
        // User is signed out
        // Handle user being signed out if necessary
      }
    });
    return unsubscribe; // Make sure we unsubscribe on component unmount
  }, []);

  async function handleCreatePost(userID, image, caption) {
    try {
      await addDoc(collection(db, 'playlist'), {
        userID,
        image,
        caption,
        likes: [], // Default likes count
        comments: [], // Default comments array
        createdAt: new Date(), // Add a timestamp if you need to sort or filter by creation date
      });
      console.log('playlist saved to Firebase');
    } catch (error) {
      console.error('Error saving post to Firebase:', error);
      throw new Error('Failed to save post to Firebase');
    }
  }

  const handleSavePost = async () => {
    if (!userID) {
      Alert.alert('Error', 'You must be signed in to save a post.');
      return;
    }

    try {
      await handleCreatePost(userID, image, caption);
      Alert.alert('Success', 'Video added to playlist successfully!');
      navigation.navigate("Home");
      //navigation.popToTop(); // Navigate back to the top of the stack
    } catch (error) {
      console.error('Failed to save post:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>

{
  image && (image.endsWith('.mp4') || image.endsWith('.mov')) ? (
    <View style={styles.containerImg}>
      <Video
        source={{ uri: image }}
        style={styles.image} // Adjust the style as needed
        useNativeControls
        resizeMode="contain"
      />
      {/* Optional: Add a close or back button here */}
    </View>
  ) : (
    <Image source={{ uri: image }} style={styles.image} />
  )
}

      <TextInput
        style={styles.input}
        placeholder="Write a caption..."
        value={caption}
        onChangeText={setCaption}
      />
      <Button title="Save" onPress={handleSavePost} disabled={!userID} />
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    padding: 10,
    marginBottom: 20,
  },
});
