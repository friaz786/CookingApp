import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const EditVideo = ({ route, navigation }) => {
  const { videoData } = route.params;
  const [caption, setCaption] = useState(videoData.caption || '');

  useEffect(() => {
    // Optionally, load the videoData data if not passed through navigation params
  }, []);

//   const handleSave = async () => {
//     const videoDataRef = doc(db, 'videoDatas', videoData.id);
//     try {
//       await updateDoc(videoDataRef, { caption });
//       navigation.goBack(); // Or navigate to a specific screen
//     } catch (error) {
//       console.error("Error updating videoData:", error);
//     }
//   };

  const handleSave = async () => {
    const videoDataRef = doc(db, 'playlist', videoData.id);
    try {
      await updateDoc(videoDataRef, { caption });
      // Assuming you've updated the local 'videoData' object's caption as well
      // Navigate back to videoDataDetail with the updated videoData object
      navigation.navigate('playlistdetail', { videoData: { ...videoData, caption } });
    } catch (error) {
      console.error("Error updating videoData:", error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete videoData",
      "Are you sure you want to delete this videoData?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => deletevideoData() }
      ]
    );
  };

  const deletevideoData = async () => {
    const videoDataRef = doc(db, 'playlist', videoData.id);
    try {
      await deleteDoc(videoDataRef);
      navigation.navigate('My Profile'); // Or navigate to the screen you prefer
    } catch (error) {
      console.error("Error deleting videoData:", error);
    }
  };

  return (
    <View style={styles.container}>
              {/* Back Icon */}
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={caption}
        onChangeText={setCaption}
        placeholder="Edit Caption"
      />
      <Button
        title="Save Changes"
        onPress={handleSave}
      />
      <Button
        title="Delete videoData"
        color="red"
        onPress={handleDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  backIcon: {
    position: 'absolute',
    top: 35, // Adjust top and left as per the design requirements
    left: 10,
    zIndex: 10, // Make sure the touchable opacity appears above other elements
  },
});

export default EditVideo;
