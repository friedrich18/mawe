import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Minus, Plus, Trash2 } from "lucide-react-native";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const CartItem = ({
  id = "1",
  name = "Chicken Burger",
  price = 12.99,
  quantity = 1,
  image = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80",
  onIncrement = () => {},
  onDecrement = () => {},
  onRemove = () => {},
}: CartItemProps) => {
  return (
    <View className="flex-row items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm">
      <Image source={{ uri: image }} className="w-16 h-16 rounded-md" />

      <View className="flex-1 ml-3">
        <Text className="text-base font-medium text-gray-800">{name}</Text>
        <Text className="text-sm font-bold text-orange-500">
          ${price.toFixed(2)}
        </Text>
      </View>

      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={() => onDecrement(id)}
          className="p-1 bg-gray-100 rounded-full"
          disabled={quantity <= 1}
        >
          <Minus size={18} color={quantity <= 1 ? "#9CA3AF" : "#000"} />
        </TouchableOpacity>

        <Text className="mx-3 text-base font-medium w-6 text-center">
          {quantity}
        </Text>

        <TouchableOpacity
          onPress={() => onIncrement(id)}
          className="p-1 bg-gray-100 rounded-full"
        >
          <Plus size={18} color="#000" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => onRemove(id)} className="ml-4 p-2">
        <Trash2 size={18} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
