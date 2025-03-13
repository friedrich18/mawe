import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { ArrowLeft, ShoppingBag } from "lucide-react-native";

import RestaurantInfo from "../components/RestaurantInfo";
import MenuSection from "../components/MenuSection";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const RestaurantDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Mock restaurant data - in a real app, this would be fetched based on the id
  const restaurant = {
    id: id || "1",
    name: "Tasty Bites Restaurant",
    coverImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    cuisineType: "Italian, Pizza",
    rating: 4.7,
    reviewCount: 243,
    address: "123 Main Street, Foodville",
    distance: "1.2 km",
    openingHours: "9:00 AM - 10:00 PM",
    isOpen: true,
    description:
      "A cozy restaurant offering delicious Italian cuisine with a modern twist. Our chefs use only the freshest ingredients to create memorable dining experiences.",
  };

  // Mock menu categories - in a real app, this would be fetched based on the restaurant id
  const menuCategories = [
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

  const handleAddToCart = (item: {
    id: string;
    name: string;
    price: number;
  }) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItemIndex >= 0) {
        // Item exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Custom Header */}
      <View className="flex-row justify-between items-center px-4 py-2 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => {} /* In a real app, navigate back */}>
          <ArrowLeft size={24} color="#f97316" />
        </TouchableOpacity>

        <Text className="text-lg font-bold text-gray-800">
          {restaurant.name}
        </Text>

        <TouchableOpacity
          onPress={() => {} /* In a real app, navigate to cart */}
          className="relative"
        >
          <ShoppingBag size={24} color="#f97316" />
          {totalCartItems > 0 && (
            <View className="absolute -top-1 -right-1 bg-orange-500 rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {totalCartItems}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Restaurant Information Section */}
        <RestaurantInfo
          id={restaurant.id}
          name={restaurant.name}
          coverImage={restaurant.coverImage}
          cuisineType={restaurant.cuisineType}
          rating={restaurant.rating}
          reviewCount={restaurant.reviewCount}
          address={restaurant.address}
          distance={restaurant.distance}
          openingHours={restaurant.openingHours}
          isOpen={restaurant.isOpen}
          description={restaurant.description}
        />

        {/* Menu Section */}
        <View className="mt-4 pb-20">
          <Text className="px-4 text-xl font-bold text-gray-800 mb-2">
            Menu
          </Text>
          <MenuSection
            categories={menuCategories.map((category) => ({
              ...category,
              items: category.items.map((item) => ({
                ...item,
                onAddToCart: () => handleAddToCart(item),
              })),
            }))}
          />
        </View>
      </ScrollView>

      {/* Cart Button (Fixed at bottom) */}
      {totalCartItems > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <TouchableOpacity
            className="bg-orange-500 py-3 rounded-full flex-row justify-center items-center"
            onPress={() => {} /* In a real app, navigate to cart */}
          >
            <ShoppingBag size={20} color="white" />
            <Text className="text-white font-bold ml-2">
              View Cart ({totalCartItems}{" "}
              {totalCartItems === 1 ? "item" : "items"})
            </Text>
            <Text className="text-white font-bold ml-2">
              $
              {cartItems
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RestaurantDetailScreen;
