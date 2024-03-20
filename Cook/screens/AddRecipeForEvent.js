import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { getAuth } from "firebase/auth";
import { db } from "../firebase"; // Adjust the path as necessary
import { doc, setDoc, collection } from "firebase/firestore";

const AddRecipeForEvent = ({ route, navigation }) => {
  const { recipe, eventName, date } = route.params;
  const auth = getAuth();

  const renderListItem = (item, index) => (
    <View key={index} style={styles.listItem}>
      <Text style={styles.listItemText}>• {item}</Text>
    </View>
  );

  const addRecipeToEvent = async () => {
    const user = auth.currentUser;

    if (user) {
      // Unique ID for the event recipe item, consider using Firestore auto-generated IDs or something like `uuid`
      const eventRecipeId = doc(
        collection(db, `users/${user.uid}/eventRecipes`)
      ).id;

      try {
        // Adding the selected recipe to the user's event recipe collection
        await setDoc(doc(db, `users/${user.uid}/eventRecipes`, eventRecipeId), {
          recipe: recipe.name, // Assuming you want to save the recipe name, adjust as needed
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          date: date,
          eventName: eventName, // Saving under the event's name
        });

        Alert.alert("Recipe added to your event!");
        navigation.goBack();
      } catch (error) {
        console.error("Error writing document: ", error);
        Alert.alert("Failed to add recipe to event.");
      }
    } else {
      Alert.alert("You need to be logged in to add a recipe to your event.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addRecipeToEvent}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recipe Name</Text>
        <Text style={styles.cardContent}>{recipe.name}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) =>
          renderListItem(ingredient, index)
        )}
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Steps</Text>
        {recipe.steps.map((step, index) => renderListItem(step, index))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#007AFF", // Or any color that fits your theme
  },
  headerButtonText: {
    color: "white",
    fontSize: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
  },
  listItem: {
    marginTop: 8,
  },
  listItemText: {
    fontSize: 16,
  },
});

export default AddRecipeForEvent;
