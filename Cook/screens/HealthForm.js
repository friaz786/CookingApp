import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const HealthForm = () => {
  const [birthday, setBirthday] = useState(new Date());
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [hasDiabetes, setHasDiabetes] = useState(false);
  const [hasBloodPressure, setHasBloodPressure] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bmi, setBmi] = useState('');
  const [bmiCategory, setBmiCategory] = useState('');

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthday(currentDate);
  };

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));

    let category = '';
    if (bmiValue < 18.5) {
      category = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      category = 'Normal weight';
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      category = 'Overweight';
    } else {
      category = 'Obesity';
    }
    setBmiCategory(category);
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
    <View style={styles.container}>
      <Text>Birthday:</Text>
      <Button title="Choose Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={birthday}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <View style={styles.checkboxContainer}>
        <Text>Has Diabetes?</Text>
        <Switch value={hasDiabetes} onValueChange={setHasDiabetes} />
      </View>
      <View style={styles.checkboxContainer}>
        <Text>Has Blood Pressure?</Text>
        <Switch value={hasBloodPressure} onValueChange={setHasBloodPressure} />
      </View>
      <Button title="Calculate BMI" onPress={calculateBMI} />
      {bmi && (
        <Text>BMI: {bmi} - {bmiCategory}</Text>
      )}
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
});

export default HealthForm;
