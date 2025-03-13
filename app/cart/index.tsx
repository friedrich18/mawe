import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { ArrowLeft, ShoppingBag } from "lucide-react-native";

import CartItemList from "../components/CartItemList";
import PriceBreakdown from "../components/PriceBreakdown";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantName: string;
  image: string;
}

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([
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
  ]);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const subtotal = calculateSubtotal();
  const commissionFee = 1.99;
  const deliveryFee = 3.99;
  const total = subtotal + commissionFee + deliveryFee;

  const handleUpdateQuantity = (id: string, quantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );
    setCartItems(updatedItems);
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    // Navigate to checkout screen
    router.push("/checkout");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          headerTitle: "Your Cart",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="ml-2">
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView className="flex-1">
        {cartItems.length > 0 ? (
          <>
            <CartItemList
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
            />

            <View className="p-4">
              <PriceBreakdown
                subtotal={subtotal}
                commissionFee={commissionFee}
                deliveryFee={deliveryFee}
                total={total}
              />
            </View>
          </>
        ) : (
          <View className="flex-1 items-center justify-center p-8">
            <ShoppingBag size={64} color="#f97316" />
            <Text className="text-xl font-semibold mt-4 text-center">
              Your cart is empty
            </Text>
            <Text className="text-gray-500 mt-2 text-center">
              Looks like you haven't added any items to your cart yet.
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/")}
              className="mt-6 bg-orange-500 py-3 px-6 rounded-full"
            >
              <Text className="text-white font-semibold">
                Browse Restaurants
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View className="p-4 bg-white border-t border-gray-200">
          <TouchableOpacity
            onPress={handleCheckout}
            className="bg-orange-500 py-4 rounded-full items-center"
          >
            <Text className="text-white font-semibold text-lg">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
