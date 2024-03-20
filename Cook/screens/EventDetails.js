import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

const EventDetails = ({ route, navigation }) => {
  const { eventName, date } = route.params;
  const [eventMeals, setEventMeals] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "users", auth.currentUser.uid, "eventRecipes"),
      where("eventName", "==", eventName),
      where("date", "==", date) // Make sure to filter by date if it's necessary
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const meals = [];
        snapshot.forEach((doc) => {
          meals.push(doc.data());
        });
        setEventMeals(meals);
      },
      (error) => {
        console.error("Error fetching event meals", error);
        Alert.alert("Error fetching event meals", error.message);
      }
    );

    return () => unsubscribe();
  }, [auth.currentUser, eventName, date]);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>

      <Text style={styles.screenTitle}>{eventName} - Meal Details</Text>
      <Text style={styles.dateText}>
        Date:{" "}
        {new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Text>

      {eventMeals.map((meal, index) => (
        <View key={index} style={styles.mealPlanContainer}>
          <Text style={styles.mealType}>Recipe Name: {meal.mealType}</Text>
          <Text style={styles.recipeTitle}>Recipe: {meal.recipe}</Text>

          <Text style={styles.ingredientsTitle}>Ingredients:</Text>
          {meal.ingredients.map((ingredient, idx) => (
            <Text key={idx} style={styles.ingredientText}>
              - {ingredient}
            </Text>
          ))}

          <Text style={styles.stepsTitle}>Steps:</Text>
          {meal.steps.map((step, idx) => (
            <Text key={idx} style={styles.stepText}>
              {idx + 1}. {step}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  backIcon: {
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  dateText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  mealPlanContainer: {
    marginBottom: 30,
  },
  mealType: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontStyle: "italic",
    marginTop: 5,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  ingredientText: {
    fontSize: 16,
    marginLeft: 15,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  stepText: {
    fontSize: 16,
    marginLeft: 15,
  },
});

export default EventDetails;
