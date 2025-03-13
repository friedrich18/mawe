import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import ProfileInfo from "../components/ProfileInfo";
import ProfileMenu from "../components/ProfileMenu";

export default function ProfileScreen() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  });

  const handleProfileUpdate = (data: {
    name: string;
    email: string;
    phone: string;
  }) => {
    setUserProfile((prev) => ({
      ...prev,
      ...data,
    }));
    // In a real app, you would send this data to your backend
  };

  const handleLogout = () => {
    // In a real app, you would clear auth tokens and user data
    router.replace("/auth");
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="bg-white pt-12 pb-4 px-4 shadow-sm">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 rounded-full bg-gray-100 mr-3"
          >
            <ArrowLeft size={20} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">My Profile</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Information Section */}
        <ProfileInfo
          name={userProfile.name}
          email={userProfile.email}
          phone={userProfile.phone}
          avatarUrl={userProfile.avatarUrl}
          onSave={handleProfileUpdate}
        />

        {/* Menu Section */}
        <View className="mt-6 mb-8">
          <ProfileMenu onLogout={handleLogout} />
        </View>

        {/* App Version */}
        <View className="items-center mb-8">
          <Text className="text-gray-400 text-sm">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}
