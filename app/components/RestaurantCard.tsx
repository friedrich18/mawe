import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Star } from "lucide-react-native";
import { router } from "expo-router";

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  cuisineType: string;
  rating: number;
  deliveryTime: string;
  onPress?: (id: string) => void;
}

const RestaurantCard = ({
  id = "1",
  name = "Restaurant Name",
  image = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
  cuisineType = "Italian",
  rating = 4.5,
  deliveryTime = "25-35 min",
  onPress,
}: RestaurantCardProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress(id);
    } else {
      router.push(`/restaurant/${id}`);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-white w-40 mr-4 rounded-xl overflow-hidden shadow-sm"
      style={{ elevation: 2 }}
    >
      <View className="h-24 w-full">
        <Image
          source={{ uri: image }}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      <View className="p-2">
        <Text className="font-bold text-base mb-1 truncate">{name}</Text>
        <Text className="text-gray-500 text-xs mb-1">{cuisineType}</Text>

        <View className="flex-row items-center justify-between mt-1">
          <View className="flex-row items-center">
            <Star size={14} color="#FFA500" fill="#FFA500" />
            <Text className="text-xs ml-1">{rating}</Text>
          </View>
          <Text className="text-xs text-gray-500">{deliveryTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
