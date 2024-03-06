import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, FlatList, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function SearchRecipe({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleSearch = async (queryText) => {
        setSearchQuery(queryText);
        if (queryText.length > 2) {
            const recipesRef = collection(db, 'recipes');
            const q = query(recipesRef, where('name', '>=', queryText), where('name', '<=', queryText + '\uf8ff'));
            try {
                const querySnapshot = await getDocs(q);
                const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSearchResults(results);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSelectRecipe = (recipe) => {
        setSelectedRecipe(recipe);
        // You can use navigation here to navigate to the selected recipe detail screen if needed
        // Example: navigation.navigate('RecipeDetailScreen', { recipeId: recipe.id });
    };

    const renderRecipeItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
            {/* Add additional recipe details you want to show */}
            <TouchableOpacity onPress={() => handleSelectRecipe(item)}>
                <Text>View Recipe</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholder="Search recipes..."
                />
            </View>
            <FlatList
                data={searchResults}
                renderItem={renderRecipeItem}
                keyExtractor={item => item.id}
                style={{ marginTop: 10 }}
            />
        </SafeAreaView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

// Styles remain the same as before
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7f7",
    },
    searchContainer: {
        backgroundColor: "#f2f2f2"
    },
});
