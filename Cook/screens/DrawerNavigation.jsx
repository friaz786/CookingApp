import { createDrawerNavigator } from "@react-navigation/drawer";
import CalendarScreen from "./CalendarScreen";
import Home from "./Home";
import Profile from "./Profile";
import DrawerContent from "../components/DrawerContent";
import { Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import HealthForm from "./HealthForm";
import MyMealPlans from "./MyMealPlans";
import MyGrocery from "./MyGrocery";

const Drawer = createDrawerNavigator();
export default function DrawerNavigation(){
    return(<>
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
          }}/>
            <Drawer.Screen name="Meal Planner" component={MyMealPlans} options={{
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
          }}/>
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
          }}/>
          <Drawer.Screen name="Health Form" component={HealthForm} options={{
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
              <MaterialCommunityIcons name="hospital-box-outline" size={24} color={color} />
            ),
          }}/>
          {<Drawer.Screen name="My Grocery List" component={MyGrocery} options={{
            headerTitle: "My Grocery List",
            drawerActiveBackgroundColor: "#e4efe4",
            drawerActiveTintColor: "#00BE00",
            drawerInactiveTintColor: "#1d1d1d",
            headerBackgroundContainerStyle: { display: "none" },
            drawerLabelStyle: {
              fontSize: 15,
            },
            headerTransparent: false,
            drawerIcon: ({ color }) => (
              <MaterialIcons name="local-grocery-store" size={24} color={color} />
            ),
          }}/>
          }
        </Drawer.Navigator>
    </>)
    
}