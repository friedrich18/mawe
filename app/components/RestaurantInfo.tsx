import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Star, Clock, MapPin, Info } from "lucide-react-native";

interface RestaurantInfoProps {
  id?: string;
  name?: string;
  coverImage?: string;
  cuisineType?: string;
  rating?: number;
  reviewCount?: number;
  address?: string;
  distance?: string;
  openingHours?: string;
  isOpen?: boolean;
  description?: string;
}

const RestaurantInfo = ({
  id = "1",
  name = "Tasty Bites Restaurant",
  coverImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  cuisineType = "Italian, Pizza",
  rating = 4.7,
  reviewCount = 243,
  address = "123 Main Street, Foodville",
  distance = "1.2 km",
  openingHours = "9:00 AM - 10:00 PM",
  isOpen = true,
  description = "A cozy restaurant offering delicious Italian cuisine with a modern twist. Our chefs use only the freshest ingredients to create memorable dining experiences.",
}: RestaurantInfoProps) => {
  return (
    <View className="bg-white w-full">
      {/* Cover Image */}
      <Image
        source={{ uri: coverImage }}
        className="w-full h-48"
        resizeMode="cover"
      />

      {/* Restaurant Details */}
      <View className="p-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-gray-800">{name}</Text>
          <View className="bg-orange-100 px-2 py-1 rounded-full">
            <Text
              className={`text-sm font-medium ${isOpen ? "text-green-600" : "text-red-600"}`}
            >
              {isOpen ? "Open Now" : "Closed"}
            </Text>
          </View>
        </View>

        <Text className="text-gray-600 mt-1">{cuisineType}</Text>

        {/* Rating and Reviews */}
        <View className="flex-row items-center mt-2">
          <Star size={18} color="#F59E0B" fill="#F59E0B" />
          <Text className="ml-1 text-gray-700 font-medium">{rating}</Text>
          <Text className="ml-1 text-gray-500">({reviewCount} reviews)</Text>
        </View>

        {/* Location and Hours */}
        <View className="mt-4 space-y-2">
          <View className="flex-row items-center">
            <MapPin size={16} color="#6B7280" />
            <Text className="ml-2 text-gray-700">{address}</Text>
            <Text className="ml-2 text-gray-500">• {distance}</Text>
          </View>

          <View className="flex-row items-center">
            <Clock size={16} color="#6B7280" />
            <Text className="ml-2 text-gray-700">{openingHours}</Text>
          </View>
        </View>

        {/* Description */}
        <View className="mt-4 pb-2 border-b border-gray-200">
          <Text className="text-gray-700">{description}</Text>
        </View>

        {/* Quick Actions */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 -mx-1"
        >
          <TouchableOpacity className="mx-1 px-4 py-2 bg-orange-500 rounded-full">
            <Text className="text-white font-medium">View Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mx-1 px-4 py-2 bg-gray-100 rounded-full">
            <Text className="text-gray-800 font-medium">Call Restaurant</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mx-1 px-4 py-2 bg-gray-100 rounded-full">
            <Text className="text-gray-800 font-medium">Directions</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mx-1 px-4 py-2 bg-gray-100 rounded-full">
            <Text className="text-gray-800 font-medium">Share</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default RestaurantInfo;
