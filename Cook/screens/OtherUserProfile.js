import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { db } from "../firebase"; // Adjust this import according to your file structure
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Icon from "react-native-vector-icons/Ionicons";
import { query, where, getDocs } from "firebase/firestore";
import { Video } from "expo-av";
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";

const OtherUserProfile = ({ route, navigation }) => {
  const { userId } = route.params;
  const [userProfile, setUserProfile] = useState({
    name: "",
    followers: [],
    following: [],
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [userPosts, setUserPosts] = useState([]);
  const [userIsChef, setUserIsChef] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fetch the role of the user when the component is mounted or when userId changes
  // useEffect(() => {
  //   const fetchUserRole = async () => {
  //     const userDocRef = doc(db, 'users', userId);
  //     const docSnap = await getDoc(userDocRef);
  //     if (docSnap.exists()) {
  //       const userData = docSnap.data();
  //       setUserIsChef(userData.role === 'chef'); // Set userIsChef based on the role
  //       setCurrentUserSubscribed(userData.subscribers?.includes(currentUser.uid)); // Check if the current user is subscribed
  //     }
  //   };

  //   fetchUserRole();
  // }, [userId]);

  useEffect(() => {
    const fetchUserData = async () => {
      //console.log('userId', userId);
      // Assuming you have a 'posts' collection with a 'userID' field linking to the user's UID
      const postsRef = query(
        collection(db, "posts"),
        where("userID", "==", userId)
      );

      const postsSnap = await getDocs(postsRef);
      const fetchedPosts = [];
      postsSnap.forEach((doc) => {
        fetchedPosts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserPosts(fetchedPosts); // Set the user's posts
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const profileData = docSnap.data();
        setUserProfile({
          ...profileData,
          id: docSnap.id,
          following: profileData.following || [],
        }); // Ensure followers and posts are included
        setIsFollowing(profileData.followers?.includes(currentUser?.uid)); // Check if current user is following
      } else {
        console.log("No such document!");
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleFollow = async () => {
    if (!currentUser) return; // Guard clause in case currentUser is null

    // Reference to the profile being viewed
    const viewedUserRef = doc(db, "users", userId);
    // Reference to the current user's document
    const currentUserRef = doc(db, "users", currentUser.uid);

    try {
      if (isFollowing) {
        // If already following, remove userId from currentUser's following list and vice versa
        await updateDoc(viewedUserRef, {
          followers: arrayRemove(currentUser.uid),
        });
        await updateDoc(currentUserRef, {
          following: arrayRemove(userId),
        });
        setIsFollowing(false);
        // Update local state to reflect change
        setUserProfile((prevState) => ({
          ...prevState,
          followers: prevState.followers.filter(
            (followerId) => followerId !== currentUser.uid
          ),
        }));
      } else {
        // If not following, add userId to currentUser's following list and vice versa
        await updateDoc(viewedUserRef, {
          followers: arrayUnion(currentUser.uid),
        });
        await updateDoc(currentUserRef, {
          following: arrayUnion(userId),
        });
        setIsFollowing(true);
        // Optimistically update local state to reflect change
        setUserProfile((prevState) => ({
          ...prevState,
          followers: [...prevState.followers, currentUser.uid],
        }));
      }
    } catch (error) {
      console.error("Error updating follow state:", error);
      // Optionally handle the error, e.g., through user feedback
    }
  };

  useEffect(() => {
    const fetchAdditionalUserData = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserIsChef(data.role === "chef"); // Assuming 'role' field holds the user role
        setIsSubscribed(data.subscribers?.includes(currentUser.uid)); // Assuming 'subscribers' field holds an array of subscriber IDs
      }
    };

    fetchAdditionalUserData();
  }, [userId, currentUser.uid]);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const subscribeToUser = async () => {
    try {
      if (!currentUser) return;
      const paymentResponse = await axios.post(
        `http://192.168.100.115:8080/api/payments/intents`,
        {
          amount: 2000,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(paymentResponse);

      if (paymentResponse.status === 400) {
        Alert.alert("Something went wrong");
        return;
      }
      const initResponse = await initPaymentSheet({
        merchantDisplayName: "CookEase",
        paymentIntentClientSecret: paymentResponse.data.paymentIntent,
      });

      if (initResponse.error) {
        Alert.alert("Something went wrong");
        return;
      }

      const paymentSheetResponse = await presentPaymentSheet();
      if (paymentSheetResponse.error) {
        Alert.alert(
          `Error code: ${paymentSheetResponse.error.code}`,
          paymentSheetResponse.error.message
        );
        return;
      }
      const profileRef = doc(db, "users", userId);
      const currentUserRef = doc(db, "users", currentUser.uid);

      await updateDoc(profileRef, {
        subscribers: arrayUnion(currentUser.uid),
      });
      await updateDoc(currentUserRef, {
        subscribedTo: arrayUnion(userId),
      });
      setIsSubscribed(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  // New function to handle unsubscription
  const unsubscribeFromUser = async () => {
    if (!currentUser) return;
    const profileRef = doc(db, "users", userId);
    const currentUserRef = doc(db, "users", currentUser.uid);

    await updateDoc(profileRef, {
      subscribers: arrayRemove(currentUser.uid),
    });
    await updateDoc(currentUserRef, {
      subscribedTo: arrayRemove(userId),
    });
    setIsSubscribed(false);
  };

  const handlePlaylistPress = () => {
    if (isSubscribed) {
      // User is subscribed, navigate to the Playlist screen with the userId parameter
      navigation.navigate("otherplaylist", { userId: userId });
    } else {
      // User is not subscribed, show an alert
      Alert.alert(
        "Subscribe Required",
        "Please subscribe to access the playlist.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View contentContainerStyle={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.userName}>{userProfile.name}</Text>
      <Button
        title={isFollowing ? "Unfollow" : "Follow"}
        onPress={handleFollow}
      />
      <Text style={styles.followers}>
        Followers: {userProfile.followers.length}
      </Text>
      <Text style={styles.followers}>
        Following: {userProfile.following.length}
      </Text>
      {userIsChef && (
        <View>
          {!isSubscribed ? (
            <TouchableOpacity onPress={subscribeToUser} style={styles.button}>
              <Text>Subscribe</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={unsubscribeFromUser}
              style={styles.button}
            >
              <Text>Unsubscribe</Text>
            </TouchableOpacity>
          )}
          <Button title="Playlist" onPress={handlePlaylistPress} />
        </View>
      )}
      {/* <Text style={styles.followers}>Followers: {userProfile.followers?.length || 0}</Text> */}
      {/* <FlatList
        data={userProfile.posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        )}
        numColumns={3}
        ListHeaderComponent={<Text style={styles.postsHeader}>Posts</Text>}
      /> */}
      <View style={styles.container}>
        {userPosts.length > 0 ? (
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("postdetail", { post: item })
                }
              >
                {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
                {item.image &&
                (item.image.endsWith(".mp4") || item.image.endsWith(".mov")) ? (
                  <Video
                    source={{ uri: item.image }}
                    style={styles.image}
                    useNativeControls
                    resizeMode="contain"
                    // shouldPlay // Auto-play the video
                    // isLooping // Loop the video
                    // onError={(e) => console.error("Error loading video", e)}

                    // onLoadStart={() => setIsLoading(true)}
                    // onLoad={() => setIsLoading(false)}
                  />
                ) : (
                  <Image source={{ uri: item.image }} style={styles.image} />
                )}
              </TouchableOpacity>
            )}
            numColumns={3} // Display images in a grid format
          />
        ) : (
          <Text>No posts found</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  backIcon: {
    position: "fixed",
    top: 35, // Adjust top and left as per the design requirements
    left: 10,
    zIndex: 10, // Make sure the touchable opacity appears above other elements
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 40,
  },
  followers: {
    fontSize: 18,
    marginVertical: 10,
  },
  postsHeader: {
    fontSize: 20,
    alignSelf: "flex-start",
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 2,
  },
  image: {
    width: 100,
    height: 100,
    margin: 2,
  },
  button: {
    backgroundColor: "#4CAF50",
    width: "80%",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: "7%",
    marginTop: 17,
  },
});

export default OtherUserProfile;
