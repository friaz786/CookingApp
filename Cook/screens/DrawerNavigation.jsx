import { createDrawerNavigator } from "@react-navigation/drawer";
import CalendarScreen from "./CalendarScreen";
import Home from "./Home";
import Profile from "./Profile";
import UserSearch from "./UserSearch";
import DrawerContent from "../components/DrawerContent";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
//import NavigationStack from "./index";

const Drawer = createDrawerNavigator();
export default function DrawerNavigation() {
  return (<>
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} options={{
        headerTitle: "",
        drawerActiveBackgroundColor: "#e4efe4",
        drawerActiveTintColor: "#00BE00",
        drawerInactiveTintColor: "#1d1d1d",
        headerBackgroundContainerStyle: { display: "none" },
        drawerLabelStyle: {
          fontSize: 15,
        },
        headerTransparent: true,
        drawerIcon: ({ color }) => (
          <Ionicons name="home-outline" size={24} color={color} />
        ),
      }} />
      <Drawer.Screen name="Meal Planner" component={CalendarScreen} options={{
        headerTitle: "",
        drawerActiveBackgroundColor: "#e4efe4",
        drawerActiveTintColor: "#00BE00",
        drawerInactiveTintColor: "#1d1d1d",
        headerBackgroundContainerStyle: { display: "none" },
        drawerLabelStyle: {
          fontSize: 15,
        },
        headerTransparent: true,
        drawerIcon: ({ color }) => (
          <Ionicons name="calendar-outline" size={24} color={color} />
        ),
      }} />
      <Drawer.Screen name="Edit Profile" component={Profile} options={{
        headerTitle: "Edit Profile",
        drawerActiveBackgroundColor: "#e4efe4",
        drawerActiveTintColor: "#00BE00",
        drawerInactiveTintColor: "#1d1d1d",
        headerBackgroundContainerStyle: { display: "none" },
        drawerLabelStyle: {
          fontSize: 15,
        },
        headerTransparent: false,
        drawerIcon: ({ color }) => (
          <FontAwesome name="user-circle-o" size={24} color={color} />
        ),
      }} />
            <Drawer.Screen name="User Search" component={UserSearch} options={{
        headerTitle: "User Search",
        drawerActiveBackgroundColor: "#e4efe4",
        drawerActiveTintColor: "#00BE00",
        drawerInactiveTintColor: "#1d1d1d",
        headerBackgroundContainerStyle: { display: "none" },
        drawerLabelStyle: {
          fontSize: 15,
        },
        headerTransparent: false,
        drawerIcon: ({ color }) => (
          <FontAwesome name="user-circle-o" size={24} color={color} />
        ),
      }} />
      {/* <Drawer.Screen name="Social Media" component={NavigationStack} options={{
        headerTitle: "",
        drawerActiveBackgroundColor: "#e4efe4",
        drawerActiveTintColor: "#00BE00",
        drawerInactiveTintColor: "#1d1d1d",
        headerBackgroundContainerStyle: { display: "none" },
        drawerLabelStyle: {
          fontSize: 15,
        },
        headerTransparent: true,
        drawerIcon: ({ color }) => (
          <Ionicons name="calendar-outline" size={24} color={color} />
        ),
      }} /> */}
    </Drawer.Navigator>
  </>)

}