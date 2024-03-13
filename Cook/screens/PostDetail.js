import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ScrollView, FlatList, TextInput, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { db } from '../firebase';;
import { doc, updateDoc, arrayUnion, serverTimestamp, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const PostDetail = ({ route, navigation }) => {
    const { post } = route.params;
    const [likes, setLikes] = useState(post.likes || []);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments || []);
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const handleLike = async () => {
        const postRef = doc(db, 'posts', post.id);
        // Toggle like
        if (!likes.includes(currentUser.uid)) {
            await updateDoc(postRef, {
                likes: arrayUnion(currentUser.uid),
            });
            setLikes([...likes, currentUser.uid]);
        } else {
            await updateDoc(postRef, {
                likes: likes.filter(uid => uid !== currentUser.uid),
            });
            setLikes(likes.filter(uid => uid !== currentUser.uid));
        }
    };

    const handleSaveComment = async () => {
        if (comment.trim() === '') return;
        const newComment = {
            userId: currentUser.uid,
            text: comment,
        };
        const postRef = doc(db, 'posts', post.id);
        try {
            await updateDoc(postRef, {
                comments: arrayUnion(newComment),
            });
            setComments([...comments, { ...newComment, timestamp: new Date() }]); // Optimistically update local state
            setComment(''); // Reset comment input
        } catch (error) {
            console.error('Error saving comment:', error);
            // Handle errors, e.g., show a user-friendly message
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            const postRef = doc(db, 'posts', post.id);
            const docSnap = await getDoc(postRef);
    
            if (docSnap.exists()) {
                const postData = docSnap.data();
                if (postData.comments) {
                    setComments(postData.comments); // Assuming 'comments' is an array field in your post document
                }
            } else {
                console.log("No such document!");
            }
        };
    
        fetchComments();
    }, [post.id]); // Dependency on post.id to refetch if the post changes
    
    
    useEffect(() => {
        console.log("Post User ID:", post.userID);
        console.log("Current User ID:", currentUser?.uid);
      }, [post, currentUser]);

      useEffect(() => {
        console.log(post); // Check the structure of 'post' to ensure it includes 'userId'
      }, [post]);

    const isCurrentUserThePoster = currentUser?.uid === post.userID;

    return (

        <View contentContainerStyle={styles.container}> 

            {/* Back Icon */}
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>
            {isCurrentUserThePoster && (
                <TouchableOpacity
                    style={styles.editPostButton}
                    onPress={() => navigation.navigate('editpost', { post })}
                >
                    <Text style={styles.editPostButtonText}>Edit Post</Text>
                </TouchableOpacity>
              )}
            <Image source={{ uri: post.image }} style={styles.image} />
            {post.caption && <Text style={styles.caption}>{post.caption}</Text>}
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleLike}>
                    <Icon name={likes.includes(currentUser.uid) ? "heart" : "heart-outline"} size={30} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {/* Navigate to comments screen or handle comment */ }}>
                    <Icon name="chatbubble-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <Text>{likes.length} Likes</Text>
            {/* Implement comments display and adding new comments here */}

            <TextInput
                style={styles.commentInput}
                value={comment}
                onChangeText={setComment}
                placeholder="Write a comment..."
            />
            <TouchableOpacity onPress={handleSaveComment} style={styles.commentButton}>
                <Text style={styles.commentButtonText}>Post Comment</Text>
            </TouchableOpacity>
            <FlatList
                data={comments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.comment}>
                        <Text style={styles.commentText}>{item.text}</Text>
                        {/* Optionally display commenter's name or timestamp */}
                    </View>
                )}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
     marginTop: 20,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'cover',
        marginTop: 50,
        marginLeft: '15%',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
    },
    backIcon: {
        position: 'fixed',
        marginTop: 30,
        top: 35, // Adjust top and left as per the design requirements
        left: 10,
        zIndex: 10,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        width: '90%',
        marginBottom: 10,
      },
      commentButton: {
        backgroundColor: '#4F8EF7',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
      },
      commentButtonText: {
        color: 'white',
        textAlign: 'center',
      },
      comment: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
      },
      commentText: {
        fontSize: 16,
      },
      caption: {
        fontSize: 16,
        fontWeight: 'normal', // Adjust as needed
        padding: 10, // Provide some padding around the text
        color: '#000', // Adjust color as needed
    },
    editPostButton: {
        backgroundColor: '#4F8EF7',
        padding: 10,
        borderRadius: 5,
        marginTop: 50,
    },
    editPostButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
});

export default PostDetail;
