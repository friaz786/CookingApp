import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const EditPost = ({ route, navigation }) => {
  const { post } = route.params;
  const [caption, setCaption] = useState(post.caption || '');

  useEffect(() => {
    // Optionally, load the post data if not passed through navigation params
  }, []);

//   const handleSave = async () => {
//     const postRef = doc(db, 'posts', post.id);
//     try {
//       await updateDoc(postRef, { caption });
//       navigation.goBack(); // Or navigate to a specific screen
//     } catch (error) {
//       console.error("Error updating post:", error);
//     }
//   };

  const handleSave = async () => {
    const postRef = doc(db, 'posts', post.id);
    try {
      await updateDoc(postRef, { caption });
      // Assuming you've updated the local 'post' object's caption as well
      // Navigate back to PostDetail with the updated post object
      navigation.navigate('postdetail', { post: { ...post, caption } });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => deletePost() }
      ]
    );
  };

  const deletePost = async () => {
    const postRef = doc(db, 'posts', post.id);
    try {
      await deleteDoc(postRef);
      navigation.navigate('My Profile'); // Or navigate to the screen you prefer
    } catch (error) {
      console.error("Error deleting post:", error);
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
        title="Delete Post"
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

export default EditPost;
