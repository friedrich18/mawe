import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ShoppingBag, Clock, MapPin, CreditCard } from "lucide-react-native";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  items?: OrderItem[];
  subtotal?: number;
  deliveryFee?: number;
  commissionFee?: number;
  total?: number;
  deliveryAddress?: string;
  paymentMethod?: string;
  estimatedDeliveryTime?: string;
  onConfirmOrder?: () => void;
}

const OrderSummary = ({
  items = [
    { id: "1", name: "Chicken Burger", quantity: 2, price: 12.99 },
    { id: "2", name: "French Fries", quantity: 1, price: 4.99 },
    { id: "3", name: "Chocolate Milkshake", quantity: 1, price: 5.99 },
  ],
  subtotal = 36.96,
  deliveryFee = 3.99,
  commissionFee = 1.99,
  total = 42.94,
  deliveryAddress = "123 Main Street, Apt 4B, New York, NY 10001",
  paymentMethod = "Visa •••• 4242",
  estimatedDeliveryTime = "30-45 minutes",
  onConfirmOrder = () => console.log("Order confirmed"),
}: OrderSummaryProps) => {
  return (
    <View className="bg-white p-4 rounded-lg shadow-md w-full">
      <Text className="text-xl font-bold mb-4">Order Summary</Text>

      {/* Order Items */}
      <ScrollView className="max-h-40 mb-4">
        {items.map((item) => (
          <View key={item.id} className="flex-row justify-between mb-2">
            <Text className="text-gray-700">
              {item.quantity}x {item.name}
            </Text>
            <Text className="text-gray-700">
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Price Breakdown */}
      <View className="border-t border-gray-200 pt-3 mb-4">
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600">Subtotal</Text>
          <Text className="text-gray-600">${subtotal.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600">Delivery Fee</Text>
          <Text className="text-gray-600">${deliveryFee.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600">Commission Fee</Text>
          <Text className="text-gray-600">${commissionFee.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between mt-2">
          <Text className="font-bold">Total</Text>
          <Text className="font-bold text-orange-500">${total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Delivery Details */}
      <View className="border-t border-gray-200 pt-3 mb-4">
        <View className="flex-row items-center mb-2">
          <MapPin size={16} className="text-gray-600 mr-2" />
          <Text className="text-gray-700 flex-1">{deliveryAddress}</Text>
        </View>
        <View className="flex-row items-center mb-2">
          <CreditCard size={16} className="text-gray-600 mr-2" />
          <Text className="text-gray-700">{paymentMethod}</Text>
        </View>
        <View className="flex-row items-center">
          <Clock size={16} className="text-gray-600 mr-2" />
          <Text className="text-gray-700">
            Estimated delivery: {estimatedDeliveryTime}
          </Text>
        </View>
      </View>

      {/* Confirm Order Button */}
      <TouchableOpacity
        className="bg-orange-500 py-3 rounded-lg items-center flex-row justify-center"
        onPress={onConfirmOrder}
      >
        <ShoppingBag size={20} color="white" className="mr-2" />
        <Text className="text-white font-bold text-lg">Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSummary;
