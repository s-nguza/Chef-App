import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Text, FlatList, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

const Menu: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>(route.params?.menu_items || []);

  const handleSave = () => {
    if (!name.trim() || !description.trim() || !course || !price.trim()) {
      alert("Please fill in all the fields before saving.");
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert("Please enter a valid positive price.");
      return;
    }

    const newItem: MenuItem = {
      id: `${menuItems.length + 1}`,
      name,
      description,
      course,
      price: parsedPrice,
    };

    setName("");
    setDescription("")
    setCourse("")
    setPrice("")

    const updatedMenuItems = [...menuItems, newItem];
    setMenuItems(updatedMenuItems);

    // sends data to the filter screen first before navigating to homepage
    navigation.navigate("Filter", { menu_items: updatedMenuItems });

    navigation.navigate("Home", { menu_items: updatedMenuItems });
  };

  const handleRemoveItem = (id: string) => {
    const updatedMenuItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedMenuItems);
    navigation.navigate("Filter", { menu_items: updatedMenuItems });

    navigation.navigate("Home", { menu_items: updatedMenuItems });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Picker
        selectedValue={course}
        style={styles.input}
        onValueChange={(itemValue) => setCourse(itemValue)}
      >
        <Picker.Item label="Select Course" value="" />
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={handleSave} style={styles.save}>
        <Text style={styles.savetext}>SAVE ITEM</Text>
      </TouchableOpacity>

      {menuItems.length > 0 && (
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: MenuItem }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subTitle}>{item.description}</Text>
              <Button
                title="Delete"
                color="red"
                onPress={() => handleRemoveItem(item.id)}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: 24,
    marginRight: 24,
    justifyContent: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 24,
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 24,
    backgroundColor: "#fff",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  save: {
    borderRadius: 24,
    backgroundColor: "#007BFF",
    padding: 12,
 
  },
  savetext: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
  card: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#4682B4",
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
});

export default Menu;
