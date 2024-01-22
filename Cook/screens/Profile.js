import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, getDoc } from 'firebase/firestore';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: 'Loading...',
    email: '',
    phoneNumber: '',
    userBlogs: ['Blog 1', 'Blog 2'], // Dummy data, replace as needed
    userPhotos: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'] // Dummy data, replace as needed
  });

  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists()) {
          setUserData({ ...userData, ...docSnap.data() });
        } else {
          console.log('No user data found');
        }
      }).catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.userName}>{userData.name}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('editprofile')}>
          <Icon name="create-outline" size={24} color="#4F8EF7" />
        </TouchableOpacity>
      </View>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Logout</Text>
      </TouchableOpacity>




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
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    paddingTop: '130%'
  },
});

export default Profile;
