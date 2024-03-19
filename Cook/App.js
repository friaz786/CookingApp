//import { StatusBar } from 'expo-status-bar';
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import ForgotPassword from "./screens/ForgotPassword";
import Profile from "./screens/Profile";
import Scanner from "./screens/Scanner";
import MealPlanner from "./screens/MealPlanner";
import CalendarScreen from "./screens/CalendarScreen";
import CreateMealPlan from "./screens/CreateMealPlan";
import SearchRecipe from "./screens/SearchRecipe";
import DrawerNavigation from "./screens/DrawerNavigation";
import HealthForm from "./screens/HealthForm";
import AddMeal from "./screens/AddMeal";
import MyMealPlans from "./screens/MyMealPlans";
import MealDetail from "./screens/MealDetail";
import GroceryList from "./screens/GroceryList";
import MyGrocery from "./screens/MyGrocery";
//import RecipeDetail from './RecipeDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="navigation"
          component={DrawerNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="forgotpassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="scanner"
          component={Scanner}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="calendar"
          component={CalendarScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="createmealplan"
          component={CreateMealPlan}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="searchrecipe"
          component={SearchRecipe}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="healthform"
          component={HealthForm}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddMeal"
          component={AddMeal}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyMealPlans"
          component={MyMealPlans}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MealDetail"
          component={MealDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GroceryList"
          component={GroceryList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyGrocery"
          component={MyGrocery}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
