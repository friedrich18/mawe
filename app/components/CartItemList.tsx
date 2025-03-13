import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Trash2, Minus, Plus } from "lucide-react-native";

// Define the CartItem component inline since there seems to be an issue with importing it
const CartItemComponent = ({
  id,
  name,
  price,
  quantity,
  image,
  restaurantName,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  return (
    <View className="flex-row p-4 border-b border-gray-200">
      <Image
        source={{ uri: image }}
        className="w-20 h-20 rounded-lg"
        style={{ backgroundColor: "#f3f4f6" }}
      />

      <View className="flex-1 ml-3 justify-between">
        <View>
          <Text className="font-semibold text-base">{name}</Text>
          <Text className="text-gray-500 text-sm">{restaurantName}</Text>
          <Text className="text-orange-500 font-semibold mt-1">
            ${price.toFixed(2)}
          </Text>
        </View>
      </View>

      <View className="justify-between items-end">
        <TouchableOpacity onPress={() => onRemoveItem(id)} className="p-1">
          <Trash2 size={16} color="#9ca3af" />
        </TouchableOpacity>

        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => onUpdateQuantity(id, quantity - 1)}
            className="bg-gray-100 w-8 h-8 rounded-full items-center justify-center"
          >
            <Minus size={16} color="#4b5563" />
          </TouchableOpacity>

          <Text className="mx-2 font-semibold">{quantity}</Text>

          <TouchableOpacity
            onPress={() => onUpdateQuantity(id, quantity + 1)}
            className="bg-orange-500 w-8 h-8 rounded-full items-center justify-center"
          >
            <Plus size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantName: string;
  image: string;
}

interface CartItemListProps {
  items?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onClearCart?: () => void;
}

const CartItemList = ({
  items = [
    {
      id: "1",
      name: "Spicy Chicken Burger",
      price: 12.99,
      quantity: 2,
      restaurantName: "Burger Palace",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    },
    {
      id: "2",
      name: "Garlic Fries",
      price: 4.99,
      quantity: 1,
      restaurantName: "Burger Palace",
      image:
        "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500&q=80",
    },
    {
      id: "3",
      name: "Chocolate Milkshake",
      price: 5.99,
      quantity: 1,
      restaurantName: "Burger Palace",
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80",
    },
  ],
  onUpdateQuantity = (id, quantity) =>
    console.log(`Update item ${id} to quantity ${quantity}`),
  onRemoveItem = (id) => console.log(`Remove item ${id}`),
  onClearCart = () => console.log("Clear cart"),
}: CartItemListProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(items);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );
    setCartItems(updatedItems);
    onUpdateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          onPress: () => {
            const updatedItems = cartItems.filter((item) => item.id !== id);
            setCartItems(updatedItems);
            onRemoveItem(id);
          },
          style: "destructive",
        },
      ],
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to clear your entire cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          onPress: () => {
            setCartItems([]);
            onClearCart();
          },
          style: "destructive",
        },
      ],
    );
  };

  if (cartItems.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4 bg-white">
        <Text className="text-lg text-gray-500 mb-4">Your cart is empty</Text>
        <TouchableOpacity className="bg-orange-500 py-3 px-6 rounded-full">
          <Text className="text-white font-semibold">Browse Restaurants</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
        <Text className="text-lg font-semibold">
          Your Cart ({cartItems.length})
        </Text>
        <TouchableOpacity
          onPress={handleClearCart}
          className="flex-row items-center"
        >
          <Trash2 size={18} color="#f97316" />
          <Text className="ml-1 text-orange-500 font-medium">Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {cartItems.map((item) => (
          <CartItemComponent
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            image={item.image}
            restaurantName={item.restaurantName}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CartItemList;
