import React, { useState } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    const date = new Date(day.dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (date < today) {
      Alert.alert("Invalid Date", "Please select a future date.");
    } else {
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      }).format(date);
    
      setSelectedDate(formattedDate);
    }
  };

  const onCreateMealPlan = () => {
    if (!selectedDate) {
      Alert.alert("No Date Selected", "You must select a date to create a meal plan.");
    } else {
      navigation.navigate('createmealplan', { date: selectedDate });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
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
        theme={{
          selectedDayBackgroundColor: '#4CAF50',
          todayTextColor: '#FF9800',
          arrowColor: '#4CAF50',
          monthTextColor: '#212121',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 16,
        }}
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
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#212121',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    padding: 10,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default CalendarScreen;
