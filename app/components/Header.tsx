import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { User } from "lucide-react-native";

interface HeaderProps {
  username?: string;
}

const Header = ({ username = "Guest" }: HeaderProps) => {
  const router = useRouter();

  const handleProfilePress = () => {
    router.push("/profile");
  };

  return (
    <View className="bg-white pt-12 pb-4 px-4 shadow-sm">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Image
            source={require("../../assets/images/icon.png")}
            className="w-10 h-10 rounded-full mr-2"
          />
          <View>
            <Text className="text-gray-500 text-sm">Hello,</Text>
            <Text className="text-xl font-bold">{username}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleProfilePress}
          className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center"
        >
          <User size={20} color="#f97316" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
