import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MapPin, Plus, Check, ChevronRight } from "lucide-react-native";

interface Address {
  id: string;
  label: string;
  address: string;
  isDefault?: boolean;
}

interface DeliveryAddressSelectorProps {
  addresses?: Address[];
  selectedAddressId?: string;
  onSelectAddress?: (addressId: string) => void;
  onAddNewAddress?: () => void;
}

const DeliveryAddressSelector = ({
  addresses = [
    {
      id: "1",
      label: "Home",
      address: "123 Main Street, Apt 4B, New York, NY 10001",
      isDefault: true,
    },
    {
      id: "2",
      label: "Work",
      address: "456 Office Plaza, Suite 200, New York, NY 10002",
    },
    {
      id: "3",
      label: "Gym",
      address: "789 Fitness Ave, New York, NY 10003",
    },
  ],
  selectedAddressId = "1",
  onSelectAddress = () => {},
  onAddNewAddress = () => {},
}: DeliveryAddressSelectorProps) => {
  const [selected, setSelected] = useState(selectedAddressId);

  const handleSelectAddress = (id: string) => {
    setSelected(id);
    onSelectAddress(id);
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold">Delivery Address</Text>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={onAddNewAddress}
        >
          <Plus size={16} color="#FF6B00" />
          <Text className="text-[#FF6B00] ml-1">Add New</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="max-h-[150px]"
        showsVerticalScrollIndicator={false}
      >
        {addresses.map((address) => (
          <TouchableOpacity
            key={address.id}
            className={`flex-row items-center p-3 mb-2 border rounded-md ${selected === address.id ? "border-[#FF6B00] bg-orange-50" : "border-gray-200"}`}
            onPress={() => handleSelectAddress(address.id)}
          >
            <View className="mr-3">
              {selected === address.id ? (
                <View className="bg-[#FF6B00] h-5 w-5 rounded-full items-center justify-center">
                  <Check size={12} color="white" />
                </View>
              ) : (
                <View className="border border-gray-300 h-5 w-5 rounded-full" />
              )}
            </View>
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="font-medium">{address.label}</Text>
                {address.isDefault && (
                  <View className="ml-2 px-2 py-0.5 bg-gray-100 rounded">
                    <Text className="text-xs text-gray-500">Default</Text>
                  </View>
                )}
              </View>
              <View className="flex-row items-center mt-1">
                <MapPin size={14} color="#6B7280" />
                <Text className="text-sm text-gray-500 ml-1 flex-1">
                  {address.address}
                </Text>
              </View>
            </View>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default DeliveryAddressSelector;
