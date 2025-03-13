import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Plus } from "lucide-react-native";

interface MenuItemProps {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  onAddToCart?: () => void;
}

const MenuItem = ({
  id = "1",
  name = "Spicy Chicken Burger",
  description = "Juicy chicken patty with special spicy sauce and fresh vegetables",
  price = 12.99,
  image = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80",
  onAddToCart = () => console.log("Add to cart clicked"),
}: MenuItemProps) => {
  return (
    <View className="flex-row p-3 mb-3 bg-white rounded-lg shadow-sm border border-gray-100">
      <Image source={{ uri: image }} className="w-20 h-20 rounded-lg mr-3" />

      <View className="flex-1 justify-between">
        <View>
          <Text className="text-lg font-semibold text-gray-800">{name}</Text>
          <Text className="text-sm text-gray-500 mt-1" numberOfLines={2}>
            {description}
          </Text>
        </View>

        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-base font-bold text-orange-500">
            ${price.toFixed(2)}
          </Text>

          <TouchableOpacity
            onPress={onAddToCart}
            className="bg-orange-500 rounded-full p-2"
          >
            <Plus size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MenuItem;
