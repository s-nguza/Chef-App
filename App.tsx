import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/HomePage";
import Menu from "./pages/Menu";
import FilterMenu from "./pages/FilterMenu";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string;
            switch (route.name) {
              case "Home":
                iconName = "home-outline";
                break;
              case "Menu":
                iconName = "restaurant-outline";
                break;
              case "Filter":
                iconName = "filter-outline";
                break;
              default:
                iconName = "help-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007BFF",
          tabBarInactiveTintColor: "gray",
          headerStyle: {
            backgroundColor: "#4682B4", 
          },
          headerTintColor: "#fff", 
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{ headerTitle: "Home" }} 
        />
        <Tab.Screen 
          name="Menu" 
          component={Menu} 
          options={{ headerTitle: "Menu" }} 
        />
        <Tab.Screen 
          name="Filter" 
          component={FilterMenu} 
          options={{ headerTitle: "Filter" }} 
        />
      </Tab.Navigator>
  
    </NavigationContainer>
  );
};

export default App;
