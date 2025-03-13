import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Eye, EyeOff, Mail, Lock } from "lucide-react-native";

interface AuthFormProps {
  mode?: "login" | "signup";
  onSubmit?: (data: { email: string; password: string; name?: string }) => void;
  onToggleMode?: () => void;
}

const AuthForm = ({
  mode = "login",
  onSubmit = () => {},
  onToggleMode = () => {},
}: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string } = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (mode === "signup" && !name) newErrors.name = "Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ email, password, ...(mode === "signup" ? { name } : {}) });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="w-full bg-white rounded-lg p-6 shadow-md"
    >
      <Text className="text-2xl font-bold text-center mb-6">
        {mode === "login" ? "Welcome Back" : "Create Account"}
      </Text>

      {mode === "signup" && (
        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">Name</Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
            <TextInput
              className="flex-1 text-base ml-2"
              placeholder="Your name"
              value={name}
              onChangeText={setName}
            />
          </View>
          {errors.name && (
            <Text className="text-red-500 mt-1 text-xs">{errors.name}</Text>
          )}
        </View>
      )}

      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Email</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
          <Mail size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 text-base ml-2"
            placeholder="your.email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {errors.email && (
          <Text className="text-red-500 mt-1 text-xs">{errors.email}</Text>
        )}
      </View>

      <View className="mb-6">
        <Text className="text-gray-700 mb-2 font-medium">Password</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
          <Lock size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 text-base ml-2"
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff size={20} color="#9ca3af" />
            ) : (
              <Eye size={20} color="#9ca3af" />
            )}
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text className="text-red-500 mt-1 text-xs">{errors.password}</Text>
        )}
      </View>

      <TouchableOpacity
        className="bg-orange-500 rounded-lg py-3 items-center mb-4"
        onPress={handleSubmit}
      >
        <Text className="text-white font-bold text-base">
          {mode === "login" ? "Login" : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text className="text-gray-600">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
        </Text>
        <TouchableOpacity onPress={onToggleMode}>
          <Text className="text-orange-500 font-semibold">
            {mode === "login" ? "Sign Up" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;
