import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Linking } from 'react-native';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const Meeting = ({ navigation }) => {
  const [meetings, setMeetings] = useState([]);
  const auth = getAuth();
  const userId = auth.currentUser.uid;

  useEffect(() => {
    const fetchMeetings = async () => {
      const userDocRef = doc(db, 'users', userId);
      const meetingsColRef = collection(userDocRef, 'meetings');
      const querySnapshot = await getDocs(meetingsColRef);
      const fetchedMeetings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMeetings(fetchedMeetings);
    };

    fetchMeetings();
  }, []);

  const handleDeleteMeeting = async (meetingId) => {
    Alert.alert('Delete Meeting', 'Are you sure you want to delete this meeting?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          const userDocRef = doc(db, 'users', userId);
          const meetingDocRef = doc(userDocRef, 'meetings', meetingId);
          await deleteDoc(meetingDocRef);
          setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
          Alert.alert('Deleted', 'Meeting has been deleted successfully');
        },
      },
    ]);
  };

  const renderMeetingItem = ({ item }) => {
    const meetingDate = item.meetingDate?.toDate().toLocaleDateString("en-US");
    const meetingTime = item.meetingTime;

    return (
      <View style={styles.meetingItem}>
        <View style={styles.meetingInfo}>
          <Text style={styles.meetingText}>{item.meetingName} - {meetingDate} at {meetingTime}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(item.meetingLink)}>
            <Text style={styles.meetingLinkText}>{item.meetingLink}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleDeleteMeeting(item.id)}>
          <Icon name="trash-outline" size={24} color="#FF0000" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
              {/* Back Icon */}
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
      <View style={styles.containertwo}>
      <TouchableOpacity 
        style={styles.meetingDetailButton}
        onPress={() => navigation.navigate('meetingdetail')}>
        <Text style={styles.buttonText}>Schedule New Class</Text>
        <Icon name="calendar-outline" size={24} color="#fff" />
      </TouchableOpacity>
      </View>
      <FlatList
        data={meetings}
        renderItem={renderMeetingItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Light grey background for better contrast
  },

  meetingItem: {
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#fff', // White background for each meeting item
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
   
  },
  meetingInfo: {
    flex: 1,
    marginRight: 10, // Add some space between text and delete icon
  },
  meetingText: {
    fontSize: 16,
    fontWeight: 'bold', // Make meeting title and date/time bold
    marginBottom: 5, // Separate title from the join link
  },
  meetingLinkText: {
    color: '#007AFF', // iOS link color for consistency
    fontSize: 16, // Match font size with the title
  },
  meetingDetailButton: {
    marginTop: '27%',
    flexDirection: 'row',
    backgroundColor: '#4F8EF7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20, // Add some space above the list
    width: '60%',
    marginLeft: '40%',
  },
  buttonText: {
    color: '#fff',
    marginRight: 10,
    fontWeight: 'bold', 
        // Continuing from previous styles
        fontWeight: 'bold', // Make button text bold for better readability
        fontSize: 16, // Increase font size for better visibility
      },
      // Style for the delete icon to provide visual feedback on touch
      deleteIcon: {
        padding: 8, // Make it easier to tap on
      },
      // Style for the join link to visually distinguish it from other text
      meetingLink: {
        fontSize: 16,
        color: '#007bff', // Use a standard link color for clarity
        textDecorationLine: 'underline', // Underline to indicate it's clickable
      },
      // Additional padding around the FlatList for aesthetic spacing
      listContainer: {
        flex: 1,
        width: '100%', // Ensure it takes up the full width
      },
      // Header style for the page to set it apart from the list items
      header: {
        fontSize: 22,
        color: '#333', // Dark color for contrast
        fontWeight: 'bold',
        paddingBottom: 10, // Space between the header and the first item
        textAlign: 'center', // Center-align the text
      },
      backIcon: {
        position: 'absolute',
        marginTop: '10%',
        top: 35, // Adjust top and left as per the design requirements
        left: 10,
        zIndex: 10, // Make sure the touchable opacity appears above other elements
      },
    });
    
    export default Meeting;
    
