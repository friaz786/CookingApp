import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const MealPlanDetails = ({ route, navigation }) => {
  const { mealPlans, date } = route.params;
  const mealOrder = ["Breakfast", "Lunch", "Dinner"];
  const sortedMealPlans = mealPlans
    .filter((plan) => mealOrder.includes(plan.mealType))
    .sort(
      (a, b) => mealOrder.indexOf(a.mealType) - mealOrder.indexOf(b.mealType)
    );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>

      {/* My Meal Plans Heading */}
      <Text style={styles.screenTitle}>My Meal Plans</Text>

      <Text style={styles.dateTitle}>Meal Plan for {date}</Text>
      {sortedMealPlans.map((plan, index) => (
        <View key={index} style={styles.mealPlanContainer}>
          <Text style={styles.mealType}>{plan.mealType}</Text>
          <Text style={styles.recipeTitle}>Recipe: {plan.recipe}</Text>
          {plan.ingredients && (
            <View style={styles.ingredientsContainer}>
              <Text style={styles.sectionTitle}>Ingredients:</Text>
              {plan.ingredients.map((ingredient, idx) => (
                <Text key={idx} style={styles.ingredientText}>
                  - {ingredient}
                </Text>
              ))}
            </View>
          )}
          {plan.steps && (
            <View style={styles.stepsContainer}>
              <Text style={styles.sectionTitle}>Steps:</Text>
              {plan.steps.map((step, idx) => (
                <Text key={idx} style={styles.stepText}>
                  {idx + 1}. {step}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backIcon: {
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  dateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  mealPlanContainer: {
    marginBottom: 30,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  mealType: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  recipeTitle: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 5,
  },
  ingredientsContainer: {
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ingredientText: {
    fontSize: 16,
    marginLeft: 10,
  },
  stepsContainer: {
    marginTop: 10,
  },
  stepText: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
});

export default MealPlanDetails;
