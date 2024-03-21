import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Icon from "react-native-vector-icons/Ionicons";

const MyEventPlan = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    if (!auth.currentUser) return;

    // Subscribe to eventRecipes for the current user
    const q = query(
      collection(db, "users", auth.currentUser.uid, "eventRecipes")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const eventMap = new Map(); // Use a Map to track unique event names and their dates

        snapshot.forEach((doc) => {
          const { eventName, date } = doc.data();
          if (!eventMap.has(eventName) || eventMap.get(eventName) > date) {
            // Store the event with its earliest date
            eventMap.set(eventName, date);
          }
        });

        // Convert Map to array for rendering, preserving unique event names and their dates
        const loadedEvents = Array.from(eventMap, ([eventName, date]) => ({
          eventName,
          date,
        }));

        setEvents(loadedEvents);
      },
      (error) => {
        console.log(error);
        Alert.alert("Error fetching event plans", error.message);
      }
    );

    return () => unsubscribe();
  }, [auth.currentUser]);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.container}>
          <Text style={styles.heading}>My Event Plans</Text>
          <FlatList
            data={events}
            keyExtractor={(item, index) => `${item.eventName}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.eventPlanItem}>
                <TouchableOpacity
                  style={styles.eventNameContainer}
                  onPress={() =>
                    navigation.navigate("EventDetails", {
                      eventName: item.eventName,
                      date: item.date,
                    })
                  }
                >
                  <Text style={styles.eventNameText}>{item.eventName}</Text>
                  {/* Additional Text component for the date */}
                  <Text style={styles.eventDateText}>
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.plusButton}
                  onPress={() =>
                    navigation.navigate("EventSearch", {
                      eventName: item.eventName,
                      date: item.date,
                    })
                  }
                >
                  <Icon name="add-circle-outline" size={24} color="#007bff" />
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate("EventCalendar")}
          >
            <Text style={styles.createButtonText}>Create New Event Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    alignItems: "center", // Correct: applied through contentContainerStyle
    justifyContent: "center", // Correct: applied through contentContainerStyle
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
  },
  eventItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventNameText: {
    fontSize: 18,
    color: "#333333",
  },
  createButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: "center",
    marginTop: 20,
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  eventPlanItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventNameContainer: {
    flex: 1, // Ensure it fills the space left by the plus button
  },
  plusButton: {
    // Styling for the plus sign button
    marginLeft: 10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
  },
  plusButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  eventDateText: {
    fontSize: 16,
    color: "#666", // Lighter text color for the date
    marginTop: 5, // Space between eventName and date
  },
});

export default MyEventPlan;
