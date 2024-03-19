import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db } from "../firebase"; // Adjust the path as necessary
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const HealthForm = ({ navigation }) => {
  const [birthday, setBirthday] = useState(new Date());
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [hasDiabetes, setHasDiabetes] = useState(false);
  const [hasBloodPressure, setHasBloodPressure] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bmi, setBmi] = useState("");
  const [bmiCategory, setBmiCategory] = useState("");

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(Platform.OS === "ios");
    setBirthday(currentDate);
  };

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / heightInMeters ** 2;
    setBmi(bmiValue.toFixed(2));

    let category = "";
    if (bmiValue < 18.5) {
      category = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      category = "Normal weight";
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      category = "Overweight";
    } else {
      category = "Obesity";
    }
    setBmiCategory(category);
  };
  const saveData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Reference to the user's document in the "users" collection
      const userRef = doc(db, "users", user.uid);

      try {
        // Update the user's document with the new health data
        await updateDoc(userRef, {
          healthData: {
            birthday: birthday.toLocaleDateString("en-US"), // Or format as needed
            age,
            height,
            weight,
            hasDiabetes,
            hasBloodPressure,
            bmi,
            bmiCategory,
          },
        });
        alert("Health data saved successfully!");
        navigation.navigate("Home");
      } catch (error) {
        console.error("Error updating document: ", error);
        alert("Failed to save health data.");
      }
    } else {
      alert("No user logged in.");
    }
  };

  return (
    <>
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Text style={styles.label}>Birthday:</Text>
            <Button
              title="Choose Date"
              onPress={() => setShowDatePicker(true)}
              color="#007AFF"
            />
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
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Has Diabetes?</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={hasDiabetes ? "#007AFF" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setHasDiabetes}
                value={hasDiabetes}
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Has Blood Pressure?</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={hasBloodPressure ? "#007AFF" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setHasBloodPressure}
                value={hasBloodPressure}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Calculate BMI"
                onPress={calculateBMI}
                color="#007AFF"
              />
            </View>
            {bmi && (
              <Text style={styles.bmiText}>
                BMI: {bmi} - {bmiCategory}
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <Button title="Save" onPress={saveData} color="#007AFF" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5", // A light grey background color for contrast
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 8,
  },
  input: {
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0", // A light grey border color for inputs
    borderRadius: 10, // Rounded corners for inputs
    padding: 15,
    backgroundColor: "#FFFFFF", // White background for inputs
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  bmiText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF", // Use the system blue color for highlighting the BMI result
    textAlign: "center",
  },
});

export default HealthForm;
