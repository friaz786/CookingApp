import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { db } from "../firebase"; // Your Firebase configuration file
import { getAuth, updateProfile } from "firebase/auth";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { Video } from "expo-av";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import * as ImagePicker from "expo-image-picker";

const Profile = ({ navigation }) => {
  const [userName, setUserName] = useState({ name: "Loading..." });
  const [userPosts, setUserPosts] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChef, setIsChef] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();

  useEffect(() => {
    if (user) {
      // Fetch user's name
      const userDocRef = doc(db, "users", user.uid);

      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserName({ ...userName, ...docSnap.data() }); // Assuming the field for the user's name is 'name'
            setUserProfile(userData);
            setUserProfilePic(userData.profilePhoto);
            //setUserProfilePic(userData.profilePhoto);
          } else {
            console.log("No user data found");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
    if (user && user.photoURL) {
      setUserProfilePic(user.photoURL);
    }
  }, [user, userProfile]);

  // Fetch user's role and subscription status
  useEffect(() => {
    const fetchUserRoleAndSubscription = async () => {
      const userDocRef = doc(db, "users", user.uid);

      const userSnapshot = await getDoc(userDocRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setIsChef(userData.role === "chef");
        setIsSubscribed(userData.subscribers?.includes(currentUser.uid));
      }
    };

    fetchUserRoleAndSubscription();
  }, [user.uid]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      console.log("Starting upload...");
      const response = await fetch(uri);
      const blob = await response.blob();
      console.log("Blob created");

      const fileRef = ref(storage, `profile_photos/${user.uid}`);
      console.log("Storage ref created:", fileRef);

      await uploadBytes(fileRef, blob);
      console.log("Blob uploaded");

      const photoURL = await getDownloadURL(fileRef);

      console.log("Download URL received:", photoURL);
      setUserProfilePic(photoURL);
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { profilePhoto: photoURL });
        console.log("Firestore document updated with new photo URL");
      }
      // ... (the rest of your code for updating Firestore and state)
    } catch (error) {
      console.error("Error uploading image to Firebase Storage:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      // Assuming you have a 'posts' collection with a 'userID' field linking to the user's UID
      const postsRef = query(
        collection(db, "posts"),
        where("userID", "==", user.uid)
      );
      const postsSnap = await getDocs(postsRef);
      const fetchedPosts = [];
      postsSnap.forEach((doc) => {
        fetchedPosts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      //console.log(fetchedPosts);
      setUserPosts(fetchedPosts); // Set the user's posts
      //console.log(userPosts);
    };

    fetchUserData();
  }, [userPosts]);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Profile Photo */}
        <TouchableOpacity onPress={pickImage}>
          {userProfilePic ? (
            <Image source={{ uri: userProfilePic }} style={styles.profilePic} />
          ) : (
            <Icon name="person-circle-outline" size={100} color="#4F8EF7" />
          )}
        </TouchableOpacity>
        <Text style={styles.userName}>{userName.name}</Text>
        <Text style={styles.followersCount}>
          Followers: {userProfile.followers?.length || 0}
        </Text>
        <Text style={styles.followersCount}>
          Following: {userProfile.following?.length || 0}
        </Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("editprofile")}
        >
          <Icon name="create-outline" size={24} color="#4F8EF7" />
        </TouchableOpacity>
      </View>

      {isChef && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("playlist", { userId: user.uid })
            }
          >
            <Text style={styles.buttonText}>Playlist</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Upload Button */}
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => navigation.navigate("add")}
      >
        <Text style={styles.uploadButtonText}>Add photo</Text>
      </TouchableOpacity>

      <View style={styles.container1}>
        {/* {userPosts.length > 0 ? (
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Image source={{ uri: item.image }} style={styles.image} />
          )}
          numColumns={3} // Display images in a grid format
        />
      ) : (
        <Text>No posts found</Text>
      )} */}

        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("postdetail", { post: item })}
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
          numColumns={3}
        />
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("home")}
        >
          <Icon name="home-outline" size={30} color="#4F8EF7" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("scanner")}
        >
          <Icon name="scan-outline" size={30} color="#4F8EF7" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("profile")}
        >
          <Icon name="person-outline" size={30} color="#4F8EF7" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  editButton: {
    // Style as needed
  },
  uploadButton: {
    backgroundColor: "#4F8EF7",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  blogItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  photoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  photo: {
    width: "48%", // Two photos per row
    height: 150,
    marginBottom: 10,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 0,
    borderColor: "#e0e0e0",
    paddingTop: "5%",
  },
  container1: {
    flex: 2,
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 2,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  button: {
    backgroundColor: "#4F8EF7",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "white",
  },
  subscribedText: {
    color: "green",
  },
});

export default Profile;
