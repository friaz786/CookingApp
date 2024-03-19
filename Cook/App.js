//import { StatusBar } from 'expo-status-bar';
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import ForgotPassword from './screens/ForgotPassword';
import Profile from './screens/Profile';
import Scanner from './screens/Scanner';
import MealPlanner from './screens/MealPlanner';
import CalendarScreen from './screens/CalendarScreen';
import CreateMealPlan from './screens/CreateMealPlan';
import SearchRecipe from './screens/SearchRecipe';
import DrawerNavigation from "./screens/DrawerNavigation";
import HealthForm from "./screens/HealthForm";
import EditProfile from "./screens/EditProfile";
import Add from "./screens/Add";
import Save from "./screens/Save";
import Fetch from "./screens/Fetch";
import OtherUserProfile from "./screens/OtherUserProfile";
import PostDetail from "./screens/PostDetail";
import EditPost from "./screens/EditPost";
import Playlist from "./screens/Playlist";
import Reels from "./screens/Reels";
import SavePlaylist from "./screens/SavePlaylist";
import OtherPlaylist from "./screens/OtherPlaylist";
import PlaylistDetail from "./screens/PlaylistDetail";
import EditVideo from "./screens/EditVideo";
import Meeting from "./screens/Meeting";
import MeetingDetail from "./screens/MeetingDetail";
import registerNNPushToken from 'native-notify';
//import RecipeDetail from './RecipeDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  registerNNPushToken(20279, 's8Q9XyDowsItMqDizvD4NN');
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={Login}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="signup" component={Signup}
          options={
            {
              headerShown: false
            }
          }

        />

        <Stack.Screen name="navigation" component={DrawerNavigation}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="forgotpassword" component={ForgotPassword}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="profile" component={Profile}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="editprofile" component={EditProfile}
          options={
            {
              headerShown: false
            }
          }

        />

        <Stack.Screen name="scanner" component={Scanner}
          options={
            {
              headerShown: false
            }
          }

        />

        <Stack.Screen name="calendar" component={CalendarScreen}
          options={
            {
              headerShown: false
            }
          }

        />

        <Stack.Screen name="createmealplan" component={CreateMealPlan}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="searchrecipe" component={SearchRecipe}
          options={
            {
              headerShown: false
            }
          }

        />
        <Stack.Screen name="healthform" component={HealthForm}
          options={
            {
              headerShown: false
            }
          }


        />
        <Stack.Screen name="add" component={Add}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="save" component={Save}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="fetch" component={Fetch}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="otheruserprofile" component={OtherUserProfile}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="postdetail" component={PostDetail}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="editpost" component={EditPost}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="playlist" component={Playlist}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="reels" component={Reels}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="saveplaylist" component={SavePlaylist}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="otherplaylist" component={OtherPlaylist}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="playlistdetail" component={PlaylistDetail}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="editvideo" component={EditVideo}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen name="meeting" component={Meeting}
          options={
            {
              headerShown: false
            }
          }
        />
                <Stack.Screen name="meetingdetail" component={MeetingDetail}
          options={
            {
              headerShown: false
            }
          }
        />



      </Stack.Navigator>

    </NavigationContainer>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});

