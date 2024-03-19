import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function CreateMealPlan({ navigation, route }) {
    const { date } = route.params;

    const onSelect = (mealType) => {
        navigation.navigate('searchrecipe', { mealType, date });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {/* Back Button */}
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meal Plan</Text>
                <Text style={styles.dateText}>{date}</Text>
            </View>

            {/* Breakfast Section */}
            <View style={styles.mealSection}>
                <TouchableOpacity style={styles.addButton} onPress={() => onSelect('Breakfast')}>
                    <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.mealHeaderText}>Breakfast</Text>
            </View>

            {/* Lunch Section */}
            <View style={styles.mealSection}>
                <TouchableOpacity style={styles.addButton} onPress={() => onSelect('Lunch')}>
                    <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.mealHeaderText}>Lunch</Text>
            </View>

            {/* Dinner Section */}
            <View style={styles.mealSection}>
                <TouchableOpacity style={styles.addButton} onPress={() => onSelect('Dinner')}>
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
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
        //justifyContent: "center",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        
    },
    dateText: {
        fontSize: 18,
        color: '#6c757d',
        marginTop: 4,
    },
    backButton: {
        marginRight: 10,
        backgroundColor: '#6c757d', // Optional: Choose a suitable color
        padding: 10,
        borderRadius: 5,
    },
    mealSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    addButton: {
        marginRight: 10,
        backgroundColor: '#007bff',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusText: {
        fontSize: 24,
        color: '#ffffff',
    },
    mealHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    button: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
