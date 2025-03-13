import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  Clock,
  CreditCard,
  LogOut,
  MapPin,
  Settings,
  ShoppingBag,
} from "lucide-react-native";

interface ProfileMenuItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  route?: string;
  action?: () => void;
}

interface ProfileMenuProps {
  items?: ProfileMenuItem[];
  onLogout?: () => void;
}

export default function ProfileMenu({
  items = [
    {
      icon: <ShoppingBag size={24} color="#FF6B00" />,
      title: "Order History",
      description: "View your past orders",
      route: "/orders",
    },
    {
      icon: <MapPin size={24} color="#FF6B00" />,
      title: "Delivery Addresses",
      description: "Manage your delivery locations",
      route: "/addresses",
    },
    {
      icon: <CreditCard size={24} color="#FF6B00" />,
      title: "Payment Methods",
      description: "Manage your payment options",
      route: "/payment-methods",
    },
    {
      icon: <Clock size={24} color="#FF6B00" />,
      title: "Favorite Restaurants",
      description: "View your saved restaurants",
      route: "/favorites",
    },
    {
      icon: <Settings size={24} color="#FF6B00" />,
      title: "Account Settings",
      description: "Manage your account preferences",
      route: "/settings",
    },
    {
      icon: <LogOut size={24} color="#FF3B30" />,
      title: "Logout",
      description: "Sign out of your account",
      action: () => {},
    },
  ],
  onLogout = () => {},
}: ProfileMenuProps) {
  const router = useRouter();

  const handleItemPress = (item: ProfileMenuItem) => {
    if (item.action) {
      item.action();
      if (item.title === "Logout") {
        onLogout();
      }
    } else if (item.route) {
      router.push(item.route);
    }
  };

  return (
    <View className="w-full bg-white rounded-lg shadow-sm">
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          className={`flex-row items-center p-4 ${index !== items.length - 1 ? "border-b border-gray-100" : ""}`}
          onPress={() => handleItemPress(item)}
        >
          <View className="mr-4">{item.icon}</View>
          <View className="flex-1">
            <Text
              className={`font-medium text-base ${item.title === "Logout" ? "text-red-500" : "text-gray-800"}`}
            >
              {item.title}
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              {item.description}
            </Text>
          </View>
          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>
      ))}
    </View>
  );
}
