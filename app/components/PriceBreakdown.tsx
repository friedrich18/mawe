import React from "react";
import { View, Text } from "react-native";

interface PriceBreakdownProps {
  subtotal?: number;
  commissionFee?: number;
  deliveryFee?: number;
  total?: number;
}

const PriceBreakdown = ({
  subtotal = 24.99,
  commissionFee = 1.99,
  deliveryFee = 3.99,
  total = subtotal + commissionFee + deliveryFee,
}: PriceBreakdownProps) => {
  return (
    <View className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-full">
      <Text className="text-lg font-semibold mb-3 text-gray-800">
        Price Breakdown
      </Text>

      <View className="space-y-2 mb-3">
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Subtotal</Text>
          <Text className="text-gray-800">${subtotal.toFixed(2)}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Commission Fee</Text>
          <Text className="text-gray-800">${commissionFee.toFixed(2)}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Delivery Fee</Text>
          <Text className="text-gray-800">${deliveryFee.toFixed(2)}</Text>
        </View>
      </View>

      <View className="h-px bg-gray-200 my-2" />

      <View className="flex-row justify-between mt-2">
        <Text className="text-gray-800 font-bold">Total</Text>
        <Text className="text-orange-500 font-bold text-lg">
          ${total.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default PriceBreakdown;
