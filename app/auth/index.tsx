import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import AuthForm from "../components/AuthForm";

const AuthScreen = () => {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const router = useRouter();

  const handleToggleMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  const handleSubmit = (data: {
    email: string;
    password: string;
    name?: string;
  }) => {
    // In a real app, this would handle authentication logic
    console.log("Auth data:", data);

    // Navigate to home screen after successful authentication
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 px-6 pt-10 pb-6">
        {/* Logo and App Name */}
        <View className="items-center mb-8">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80",
            }}
            className="w-20 h-20 rounded-full mb-4"
          />
          <Text className="text-3xl font-bold text-orange-500">
            FoodDelivery
          </Text>
          <Text className="text-gray-500 text-center mt-2">
            {authMode === "login"
              ? "Welcome back! Sign in to continue"
              : "Create an account to get started"}
          </Text>
        </View>

        {/* Auth Form */}
        <View className="mb-6">
          <AuthForm
            mode={authMode}
            onToggleMode={handleToggleMode}
            onSubmit={handleSubmit}
          />
        </View>

        {/* Alternative Sign In Options */}
        <View className="mt-6">
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500">Or continue with</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          <View className="flex-row justify-center space-x-4">
            <TouchableOpacity className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center">
              <Text className="text-2xl">G</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center">
              <Text className="text-2xl">f</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center">
              <Text className="text-2xl">a</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms and Privacy */}
        <View className="mt-auto">
          <Text className="text-center text-gray-500 text-xs">
            By continuing, you agree to our{" "}
            <Text className="text-orange-500">Terms of Service</Text> and{" "}
            <Text className="text-orange-500">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
