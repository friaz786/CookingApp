import React, { useState } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    // Create a Date object from the dateString
    const date = new Date(day.dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to 00:00 to compare only dates
  
    // Check if the selected date is in the past
    if (date < today) {
      // Show an alert if the selected date is in the past
      Alert.alert("Invalid Date", "Please select a future date.");
    } else {
      // Format the date using Intl.DateTimeFormat
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      }).format(date);
    
      setSelectedDate(formattedDate);
      console.log(formattedDate); // This will log the date in the format "23 June 2024"
    }
  };
  

  const onCreateMealPlan = () => {
    // Navigate to Meal Plan creation screen and pass the selected date
    navigation.navigate('createmealplan', { date: selectedDate });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select date for Meal Plan</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
          },
        }}
        // Other calendar properties
      />
      <TouchableOpacity style={styles.button} onPress={onCreateMealPlan}>
        <Text style={styles.buttonText}>Create Meal Plan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Push the button to the bottom
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 50,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  // Additional styles
});

export default CalendarScreen;
