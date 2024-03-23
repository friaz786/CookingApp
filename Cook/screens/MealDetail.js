import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";

const MealPlanDetails = ({ route, navigation }) => {
  const { mealPlans, date } = route.params;

  const groupedMealPlans = mealPlans.reduce((acc, plan) => {
    (acc[plan.mealType] = acc[plan.mealType] || []).push(plan);
    return acc;
  }, {});

  const mealTypes = ["Breakfast", "Lunch", "Dinner"];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.screenTitle}>My Meal Plans</Text>
      <Text style={styles.dateTitle}>Meal Plan for {date}</Text>

      {mealTypes.map((mealType) => (
        <View key={mealType} style={styles.mealTypeContainer}>
          <Text style={styles.mealTypeHeader}>{mealType}</Text>
          {groupedMealPlans[mealType]?.map((plan, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("Recipe", { recipe: plan })}
              style={styles.card}
            >
              <Text style={styles.cardText}>
                {index + 1}. {plan.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  backIcon: {
    zIndex: 10,
    marginTop: "5%",
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 20,
  },
  dateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4CAF50",
  },
  mealTypeContainer: {
    marginBottom: 10,
  },
  mealTypeHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "black",
  },
  card: {
    backgroundColor: "lightgrey", // Light grey background for the card
    borderRadius: 8, // Rounded corners for the card
    padding: 10, // Padding inside the card
    marginBottom: 10, // Space between cards
    shadowColor: "black", // Shadow color
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // Elevation for Android
  },
  cardText: {
    fontSize: 18,
    color: "#000", // Dark text color for readability
  },
});

export default MealPlanDetails;
