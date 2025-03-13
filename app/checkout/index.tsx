import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, ShoppingBag } from "lucide-react-native";

import DeliveryAddressSelector from "../components/DeliveryAddressSelector";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import OrderSummary from "../components/OrderSummary";

const CheckoutScreen = () => {
  const router = useRouter();
  const [selectedAddressId, setSelectedAddressId] = useState("1");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("1");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddNewAddress = () => {
    // In a real app, this would navigate to an address form
    console.log("Navigate to add new address form");
  };

  const handleAddNewPaymentMethod = () => {
    // In a real app, this would navigate to a payment method form
    console.log("Navigate to add new payment method form");
  };

  const handleConfirmOrder = () => {
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to order confirmation/tracking screen
      router.push("/");
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Checkout</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="space-y-4">
          {/* Delivery Address Section */}
          <DeliveryAddressSelector
            selectedAddressId={selectedAddressId}
            onSelectAddress={setSelectedAddressId}
            onAddNewAddress={handleAddNewAddress}
          />

          {/* Payment Method Section */}
          <PaymentMethodSelector
            selectedMethod={selectedPaymentMethod}
            onSelectMethod={setSelectedPaymentMethod}
            onAddNewMethod={handleAddNewPaymentMethod}
          />

          {/* Order Summary Section */}
          <OrderSummary onConfirmOrder={handleConfirmOrder} />

          {/* Disclaimer */}
          <View className="mt-4 p-3 bg-gray-100 rounded-lg">
            <Text className="text-xs text-gray-500 text-center">
              By confirming your order, you agree to our Terms of Service and
              Privacy Policy. Your order will be processed immediately and you
              will be charged the total amount shown above.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Checkout Button for Mobile */}
      <View className="p-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          className={`py-3 rounded-lg items-center flex-row justify-center ${isProcessing ? "bg-orange-400" : "bg-orange-500"}`}
          onPress={handleConfirmOrder}
          disabled={isProcessing}
        >
          <ShoppingBag size={20} color="white" className="mr-2" />
          <Text className="text-white font-bold text-lg">
            {isProcessing ? "Processing..." : "Place Order"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
