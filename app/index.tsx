import React from "react";
import { View, Text, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { useRouter } from "expo-router";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategorySection from "./components/CategorySection";

export default function HomeScreen() {
  const router = useRouter();

  // Mock data for restaurant categories
  const popularRestaurants = [
    {
      id: "1",
      name: "Burger Palace",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
      cuisineType: "American",
      rating: 4.5,
      deliveryTime: "20-30 min",
    },
    {
      id: "2",
      name: "Pizza Heaven",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
      cuisineType: "Italian",
      rating: 4.2,
      deliveryTime: "25-35 min",
    },
    {
      id: "3",
      name: "Sushi Express",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80",
      cuisineType: "Japanese",
      rating: 4.7,
      deliveryTime: "30-40 min",
    },
    {
      id: "4",
      name: "Taco Fiesta",
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80",
      cuisineType: "Mexican",
      rating: 4.3,
      deliveryTime: "15-25 min",
    },
  ];

  const nearbyRestaurants = [
    {
      id: "5",
      name: "Local Diner",
      image:
        "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=500&q=80",
      cuisineType: "American",
      rating: 4.1,
      deliveryTime: "10-20 min",
    },
    {
      id: "6",
      name: "Noodle House",
      image:
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80",
      cuisineType: "Asian",
      rating: 4.3,
      deliveryTime: "15-25 min",
    },
    {
      id: "7",
      name: "Cafe Corner",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&q=80",
      cuisineType: "Cafe",
      rating: 4.4,
      deliveryTime: "10-15 min",
    },
    {
      id: "8",
      name: "Sandwich Spot",
      image:
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80",
      cuisineType: "Sandwiches",
      rating: 4.2,
      deliveryTime: "15-20 min",
    },
  ];

  const discountedRestaurants = [
    {
      id: "9",
      name: "Spice Garden",
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356c36?w=500&q=80",
      cuisineType: "Indian",
      rating: 4.6,
      deliveryTime: "25-35 min",
    },
    {
      id: "10",
      name: "Mediterranean Grill",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80",
      cuisineType: "Mediterranean",
      rating: 4.4,
      deliveryTime: "30-40 min",
    },
    {
      id: "11",
      name: "Pho Delight",
      image:
        "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&q=80",
      cuisineType: "Vietnamese",
      rating: 4.5,
      deliveryTime: "20-30 min",
    },
    {
      id: "12",
      name: "Taqueria Authentic",
      image:
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&q=80",
      cuisineType: "Mexican",
      rating: 4.7,
      deliveryTime: "25-35 min",
    },
  ];

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Implement search functionality
  };

  const handleSeeAll = (category: string) => {
    console.log("See all pressed for:", category);
    // Navigate to category listing page
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Header username="John" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="py-4">
          <SearchBar onSearch={handleSearch} />

          <View className="mt-4">
            <CategorySection
              title="Popular Restaurants"
              restaurants={popularRestaurants}
              onSeeAll={() => handleSeeAll("popular")}
            />

            <CategorySection
              title="Nearby You"
              restaurants={nearbyRestaurants}
              onSeeAll={() => handleSeeAll("nearby")}
            />

            <CategorySection
              title="Special Discounts"
              restaurants={discountedRestaurants}
              onSeeAll={() => handleSeeAll("discounts")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
