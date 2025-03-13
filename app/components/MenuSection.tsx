import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { ChevronDown, ChevronUp } from "lucide-react-native";

// Define the MenuItem component inline since there seems to be an issue with importing it
interface MenuItemProps {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onAddToCart?: () => void;
}

const MenuItem = ({
  name = "Menu Item",
  description = "Description of the menu item",
  price = 0.0,
  image = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80",
  onAddToCart = () => {},
}: MenuItemProps) => {
  return (
    <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
      <View className="flex-1 pr-4">
        <Text className="text-base font-medium">{name}</Text>
        <Text className="text-sm text-gray-500 mt-1">{description}</Text>
        <Text className="text-base font-medium text-orange-600 mt-1">
          ${price.toFixed(2)}
        </Text>
      </View>
      <View className="flex-row items-center">
        <Image
          source={{ uri: image }}
          className="w-20 h-20 rounded-md"
          contentFit="cover"
        />
        <TouchableOpacity
          onPress={onAddToCart}
          className="ml-2 bg-orange-500 px-3 py-1 rounded-full"
        >
          <Text className="text-white font-medium">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItemType[];
}

interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface MenuSectionProps {
  categories?: MenuCategory[];
}

const MenuSection = ({ categories = defaultCategories }: MenuSectionProps) => {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >(
    categories.reduce((acc, category) => ({ ...acc, [category.id]: true }), {}),
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {categories.map((category) => (
          <View key={category.id} className="mb-4">
            <TouchableOpacity
              onPress={() => toggleCategory(category.id)}
              className="flex-row justify-between items-center px-4 py-3 bg-orange-50"
            >
              <Text className="text-lg font-bold text-orange-800">
                {category.name}
              </Text>
              {expandedCategories[category.id] ? (
                <ChevronUp size={20} color="#9A3412" />
              ) : (
                <ChevronDown size={20} color="#9A3412" />
              )}
            </TouchableOpacity>

            {expandedCategories[category.id] && (
              <View className="px-4">
                {category.items.map((item) => (
                  <MenuItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    onAddToCart={() => {}}
                  />
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Default data for preview purposes
const defaultCategories: MenuCategory[] = [
  {
    id: "1",
    name: "Appetizers",
    items: [
      {
        id: "a1",
        name: "Crispy Spring Rolls",
        description:
          "Vegetable filled crispy rolls served with sweet chili sauce",
        price: 6.99,
        image:
          "https://images.unsplash.com/photo-1677678701434-5bc5a77cf46c?w=300&q=80",
      },
      {
        id: "a2",
        name: "Chicken Wings",
        description: "Spicy buffalo wings served with blue cheese dip",
        price: 8.99,
        image:
          "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=300&q=80",
      },
    ],
  },
  {
    id: "2",
    name: "Main Courses",
    items: [
      {
        id: "m1",
        name: "Classic Cheeseburger",
        description:
          "Beef patty with cheddar cheese, lettuce, tomato and special sauce",
        price: 12.99,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80",
      },
      {
        id: "m2",
        name: "Margherita Pizza",
        description:
          "Fresh tomatoes, mozzarella cheese, and basil on thin crust",
        price: 14.99,
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&q=80",
      },
    ],
  },
  {
    id: "3",
    name: "Desserts",
    items: [
      {
        id: "d1",
        name: "Chocolate Lava Cake",
        description:
          "Warm chocolate cake with a molten center, served with vanilla ice cream",
        price: 7.99,
        image:
          "https://images.unsplash.com/photo-1617305855058-336d24456869?w=300&q=80",
      },
      {
        id: "d2",
        name: "New York Cheesecake",
        description:
          "Creamy cheesecake with a graham cracker crust and berry compote",
        price: 6.99,
        image:
          "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=300&q=80",
      },
    ],
  },
];

export default MenuSection;
