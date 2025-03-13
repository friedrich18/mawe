import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Pressable } from "react-native";
import { Search, X } from "lucide-react-native";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const SearchBar = ({
  onSearch = () => {},
  placeholder = "Search restaurants, cuisines, dishes...",
  initialValue = "",
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  const handleSubmit = () => {
    onSearch(searchQuery);
  };

  return (
    <View className="w-full px-5 bg-white">
      <View className="flex-row items-center bg-gray-100 rounded-full px-4 h-12">
        <Search size={20} color="#9CA3AF" />
        <TextInput
          className="flex-1 ml-2 text-base text-gray-800"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={handleClear} className="p-1">
            <X size={18} color="#9CA3AF" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default SearchBar;
