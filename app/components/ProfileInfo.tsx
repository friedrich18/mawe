import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { User, Edit2, Check } from "lucide-react-native";

interface ProfileInfoProps {
  name?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  onSave?: (data: { name: string; email: string; phone: string }) => void;
}

const ProfileInfo = ({
  name = "John Doe",
  email = "john.doe@example.com",
  phone = "+1 (555) 123-4567",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  onSave = () => {},
}: ProfileInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedPhone, setEditedPhone] = useState(phone);

  const handleSave = () => {
    onSave({
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
    });
    setIsEditing(false);
  };

  return (
    <View className="w-full bg-white rounded-lg p-4 shadow-sm">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-800">
          Profile Information
        </Text>
        {isEditing ? (
          <TouchableOpacity
            onPress={handleSave}
            className="p-2 bg-orange-500 rounded-full"
          >
            <Check size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            className="p-2 bg-gray-100 rounded-full"
          >
            <Edit2 size={20} color="#f97316" />
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row mb-6">
        <View className="mr-4">
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              className="w-20 h-20 rounded-full bg-gray-200"
            />
          ) : (
            <View className="w-20 h-20 rounded-full bg-gray-200 items-center justify-center">
              <User size={32} color="#9ca3af" />
            </View>
          )}
        </View>

        <View className="flex-1 justify-center">
          {isEditing ? (
            <TextInput
              value={editedName}
              onChangeText={setEditedName}
              className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2"
              placeholder="Your name"
            />
          ) : (
            <Text className="text-lg font-semibold text-gray-800 mb-1">
              {name}
            </Text>
          )}

          <View className="bg-orange-100 rounded-full px-3 py-1 self-start">
            <Text className="text-xs text-orange-600">Customer</Text>
          </View>
        </View>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-sm text-gray-500 mb-1">Email</Text>
          {isEditing ? (
            <TextInput
              value={editedEmail}
              onChangeText={setEditedEmail}
              className="text-base text-gray-800 border-b border-gray-300 pb-1"
              placeholder="Your email"
              keyboardType="email-address"
            />
          ) : (
            <Text className="text-base text-gray-800">{email}</Text>
          )}
        </View>

        <View>
          <Text className="text-sm text-gray-500 mb-1">Phone</Text>
          {isEditing ? (
            <TextInput
              value={editedPhone}
              onChangeText={setEditedPhone}
              className="text-base text-gray-800 border-b border-gray-300 pb-1"
              placeholder="Your phone number"
              keyboardType="phone-pad"
            />
          ) : (
            <Text className="text-base text-gray-800">{phone}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileInfo;
