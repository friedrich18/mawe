import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { CreditCard, Plus, Check } from "lucide-react-native";

interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "applepay" | "googlepay";
  name: string;
  details: string;
  isDefault?: boolean;
}

interface PaymentMethodSelectorProps {
  selectedMethod?: string;
  onSelectMethod?: (methodId: string) => void;
  paymentMethods?: PaymentMethod[];
  onAddNewMethod?: () => void;
}

const PaymentMethodSelector = ({
  selectedMethod,
  onSelectMethod = () => {},
  paymentMethods = [
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4242",
      details: "Expires 12/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "card",
      name: "Mastercard ending in 5555",
      details: "Expires 10/24",
    },
    {
      id: "3",
      type: "paypal",
      name: "PayPal",
      details: "example@email.com",
    },
  ],
  onAddNewMethod = () => {},
}: PaymentMethodSelectorProps) => {
  const [selected, setSelected] = useState<string>(
    selectedMethod || paymentMethods[0]?.id || "",
  );

  const handleSelect = (methodId: string) => {
    setSelected(methodId);
    onSelectMethod(methodId);
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm">
      <Text className="text-lg font-semibold mb-4">Payment Method</Text>

      <ScrollView className="max-h-[150px]">
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            className={`flex-row items-center p-3 mb-2 border rounded-md ${selected === method.id ? "border-orange-500 bg-orange-50" : "border-gray-200"}`}
            onPress={() => handleSelect(method.id)}
          >
            <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
              <CreditCard size={20} color="#f97316" />
            </View>

            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="font-medium">{method.name}</Text>
                {method.isDefault && (
                  <View className="ml-2 px-2 py-0.5 bg-gray-100 rounded">
                    <Text className="text-xs text-gray-600">Default</Text>
                  </View>
                )}
              </View>
              <Text className="text-sm text-gray-500">{method.details}</Text>
            </View>

            {selected === method.id && (
              <View className="w-6 h-6 bg-orange-500 rounded-full items-center justify-center">
                <Check size={14} color="white" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        className="flex-row items-center justify-center p-3 mt-3 border border-dashed border-gray-300 rounded-md"
        onPress={onAddNewMethod}
      >
        <Plus size={18} color="#f97316" />
        <Text className="ml-2 text-orange-500 font-medium">
          Add Payment Method
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethodSelector;
