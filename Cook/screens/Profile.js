import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { db } from '../firebase'; // Your Firebase configuration file
import { getAuth } from 'firebase/auth';
import { doc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';



const Profile = ({ navigation }) => {
  const [userName, setUserName] = useState({ name: 'Loading...' });
  const [userPosts, setUserPosts] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {

    if (user) {
      // Fetch user's name
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef)
        .then(docSnap => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserName({ ...userName, ...docSnap.data() }); // Assuming the field for the user's name is 'name'
            setUserProfile(userData);
          } else {
            console.log('No user data found');
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    };
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {

      // Assuming you have a 'posts' collection with a 'userID' field linking to the user's UID
      const postsRef = query(collection(db, 'posts'), where('userID', '==', user.uid));
      const postsSnap = await getDocs(postsRef);
      const fetchedPosts = [];
      postsSnap.forEach((doc) => {
        fetchedPosts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserPosts(fetchedPosts); // Set the user's posts
    }


    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.userName}>{userName.name}</Text>
        <Text style={styles.followersCount}>Followers: {userProfile.followers?.length || 0}</Text>
        <Text style={styles.followersCount}>Following: {userProfile.following?.length || 0}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('editprofile')}>
          <Icon name="create-outline" size={24} color="#4F8EF7" />
        </TouchableOpacity>
      </View>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={() => navigation.navigate('add')} >
        <Text style={styles.uploadButtonText}>Add photo</Text>
      </TouchableOpacity>

      <View style={styles.container1}>
        {/* {userPosts.length > 0 ? (
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Image source={{ uri: item.image }} style={styles.image} />
          )}
          numColumns={3} // Display images in a grid format
        />
      ) : (
        <Text>No posts found</Text>
      )} */}


        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('postdetail', { post: item })}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
          )}
          numColumns={3}
        />
      </View>



      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('home')}>
          <Icon name="home-outline" size={30} color="#4F8EF7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('scanner')}>
          <Icon name="scan-outline" size={30} color="#4F8EF7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('profile')}>
          <Icon name="person-outline" size={30} color="#4F8EF7" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  editButton: {
    // Style as needed
  },
  uploadButton: {
    backgroundColor: '#4F8EF7',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',

  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  blogItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photo: {
    width: '48%', // Two photos per row
    height: 150,
    marginBottom: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderColor: '#e0e0e0',
    paddingTop: '5%',
  },
  container1: {
    flex: 2,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 2,
  },
});

export default Profile;
