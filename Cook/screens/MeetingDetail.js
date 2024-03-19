import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, ScrollView } from 'react-native';
import { db } from '../firebase'; // Adjust this import according to your file structure
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

const MeetingDetail = ({ navigation }) => {
  const [meetingName, setMeetingName] = useState('');
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleSaveMeetingDetails = async () => {
    if (!meetingName || !meetingDate || !meetingLink) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    try {
      await addDoc(collection(db, "users", currentUser.uid, "meetings"), {
        meetingName,
        meetingDate,
        meetingTime,
        meetingLink,
      });
      Alert.alert("Success", "Meeting details saved successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving meeting details: ", error);
      Alert.alert("Error", "Could not save meeting details.");
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || meetingDate;
    setShowDatePicker(Platform.OS === 'ios');
    setMeetingDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
              {/* Back Icon */}
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Enter Meeting Details</Text>

      <Text style={styles.label}>Meeting Name:</Text>
      <TextInput
        style={styles.input}
        value={meetingName}
        onChangeText={setMeetingName}
        placeholder="e.g., Weekly Stand-up"
      />

      <Text style={styles.label}>Meeting Date:</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}>
        <Text style={styles.inputText}>{meetingDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={meetingDate}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Text style={styles.label}>Meeting Time:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={meetingTime}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setMeetingTime(itemValue)}
          mode="dropdown">
          {Array.from({ length: 24 }, (_, i) => (
            <Picker.Item key={i} label={`${i}:00`} value={`${i}:00`} />
          ))}
        </Picker>
      </View>

            {/* Meeting Link */}
            <Text style={styles.label}>Meeting Link:</Text>
      <TextInput
        style={styles.input}
        value={meetingLink}
        onChangeText={setMeetingLink}
        placeholder="https://"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSaveMeetingDetails}>
        <Text style={styles.buttonText}>Save Meeting Details</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputText: {
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
  },
  button: {
    backgroundColor: '#4F8EF7',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MeetingDetail;