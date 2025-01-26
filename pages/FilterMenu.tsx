import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

const FilterMenu: React.FC<{ route: any }> = ({ route }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>("All");

  useEffect(() => {
    if (route.params?.menu_items) {
      setMenuItems(route.params.menu_items);
    }
  }, [route.params?.menu_items]);

  const filteredItems =
    selectedCourse && selectedCourse !== "All"
      ? menuItems.filter((item) => item.course === selectedCourse)
      : menuItems;

  const courses = ["All", "Starter", "Main", "Dessert"];

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {courses.map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.button,
              selectedCourse === course && styles.activeButton,
            ]}
            onPress={() => setSelectedCourse(course)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedCourse === course && styles.activeButtonText,
              ]}
            >
              {course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Title style={styles.title}>{item.name}</Title>
                <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
              </View>
              <Paragraph style={styles.subTitle}>{item.description}</Paragraph>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#ddd",
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#5BC0DE",
  },
  buttonText: {
    color: "#333",
    fontSize: 14,
  },
  activeButtonText: {
    color: "#fff",
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  card: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#222",
    fontSize: 20,
    fontWeight: "700",
  },
  subTitle: {
    color: "#444",
    fontSize: 16,
    fontWeight: "400",
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#4682B4",
  },
});

export default FilterMenu;
