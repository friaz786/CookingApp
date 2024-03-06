import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function CreateMealPlan({ navigation, route }) {
    const { date } = route.params;

    // Define functions to handle the press on each plus button if needed
    const onSelect = () => {
        navigation.navigate('searchrecipe');
        // Add your logic to handle adding breakfast
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Meal Plan</Text>
                <Text style={styles.dateText}>{date}</Text>
            </View>

            {/* Breakfast Section */}
            <View style={styles.mealSection}>
                <TouchableOpacity style={styles.addButton} onPress={onSelect}>
                    <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.mealHeaderText}>Breakfast</Text>
            </View>

            {/* Lunch Section */}
            <View style={styles.mealSection}>
                <TouchableOpacity style={styles.addButton} onPress={onSelect}>
                    <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.mealHeaderText}>Lunch</Text>
            </View>

            {/* Dinner Section */}
            <View style={styles.mealSection}>
                <TouchableOpacity style={styles.addButton} onPress={onSelect}>
                    <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.mealHeaderText}>Dinner</Text>
            </View>

            {/* Complete Meal Plan Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Complete Meal Plan</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // ... other styles remain unchanged

    mealSection: {
        flexDirection: 'row', // Aligns button and text horizontally
        alignItems: 'center', // Centers items vertically in the row
        padding: 20, // Add padding for spacing
    },
    addButton: {
        marginRight: 10, // Add some margin to the right of the plus button
    },
    plusText: {
        fontSize: 24, // Set font size for the plus sign
        color: 'blue', // Set a color for the plus sign
    },
    mealHeaderText: {
        fontSize: 20, // Set font size for meal headers
        fontWeight: 'bold', // Make the meal headers bold
        color: '#2c3e50', // A dark color for the meal header text
    },
    // ... add any additional styles you might need
});
