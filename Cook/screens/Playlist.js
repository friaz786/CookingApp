import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase'; // Adjust this import according to your file structure
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons';

const Playlist = ({ route, navigation }) => {
  const { userId } = route.params; // UserId of the profile being visited
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Query to fetch videos from the 'playlist' collection for the given userId
        const videosQuery = query(collection(db, 'playlist'), where('userID', '==', userId));
        const querySnapshot = await getDocs(videosQuery);
        const fetchedVideos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Error fetching videos: ", error);
        Alert.alert("Error", "Could not fetch videos.");
      }
    };

    fetchVideos();
  }, [userId]);


  const renderVideoItem = ({ item }) => (
    <View style={styles.videoContainer}>
            <TouchableOpacity
        style={styles.videoContainer}
        onPress={() => navigation.navigate('playlistdetail', { videoData: item })}
      >
      <Video
        source={{ uri: item.image }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
      />
      </TouchableOpacity>
      <Text style={styles.caption}>{item.caption}</Text>
    </View>
     );

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
      {/* Conditionally showing buttons based on profile */}
      {currentUser?.uid === userId && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('reels')} // Replace 'AddVideo' with your actual route name
          >
            <Icon name="add-circle-outline" size={24} color="#4F8EF7" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('meeting')} // Replace 'CreateClass' with your actual route name
          >
            <Icon name="school-outline" size={24} color="#4F8EF7" />
          </TouchableOpacity>
        </View>
      )}
      {/* List of videos */}
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    width: '100%',
    padding: 10,
  },
  video: {
    aspectRatio: 16 / 9,
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 10,
  },
  button: {
    padding: 10,
    alignItems: 'center',
  },
  backIcon: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: "11%",
  },
  // Add more styles as needed
});

export default Playlist;
