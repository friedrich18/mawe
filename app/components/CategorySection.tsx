import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";

interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisineType: string;
  rating: number;
  deliveryTime: string;
}

interface CategorySectionProps {
  title: string;
  restaurants: Restaurant[];
  onSeeAll?: () => void;
}

const RestaurantCard = ({
  id = "1",
  name = "Restaurant Name",
  image = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
  cuisineType = "Cuisine",
  rating = 4.5,
  deliveryTime = "20-30 min",
}) => {
  return (
    <View className="w-[160px] bg-white rounded-lg overflow-hidden shadow-sm">
      <View className="h-[100px] bg-gray-200">
        {image && (
          <View className="w-full h-full">
            <View
              className="w-full h-full bg-orange-100"
              style={{
                backgroundColor: "#FEF3C7",
              }}
            >
              {/* Image would be rendered here */}
              <Text className="text-center pt-10 text-orange-500">
                Image: {name}
              </Text>
            </View>
          </View>
        )}
      </View>
      <View className="p-2">
        <Text className="font-bold text-gray-800 text-sm" numberOfLines={1}>
          {name}
        </Text>
        <Text className="text-gray-500 text-xs">{cuisineType}</Text>
        <View className="flex-row justify-between items-center mt-1">
          <View className="flex-row items-center">
            <Text className="text-xs text-orange-500">
              ★ {rating.toFixed(1)}
            </Text>
          </View>
          <Text className="text-xs text-gray-500">{deliveryTime}</Text>
        </View>
      </View>
    </View>
  );
};

const CategorySection = ({
  title = "Popular Restaurants",
  restaurants = [
    {
      id: "1",
      name: "Burger Palace",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
      cuisineType: "American",
      rating: 4.5,
      deliveryTime: "20-30 min",
    },
    {
      id: "2",
      name: "Pizza Heaven",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
      cuisineType: "Italian",
      rating: 4.2,
      deliveryTime: "25-35 min",
    },
    {
      id: "3",
      name: "Sushi Express",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80",
      cuisineType: "Japanese",
      rating: 4.7,
      deliveryTime: "30-40 min",
    },
    {
      id: "4",
      name: "Taco Fiesta",
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80",
      cuisineType: "Mexican",
      rating: 4.3,
      deliveryTime: "15-25 min",
    },
  ],
  onSeeAll = () => {},
}: CategorySectionProps) => {
  return (
    <View className="mb-6 bg-white">
      <View className="flex-row justify-between items-center px-4 py-2">
        <Text className="text-lg font-bold text-gray-800">{title}</Text>
        <TouchableOpacity onPress={onSeeAll} className="flex-row items-center">
          <Text className="text-orange-500 mr-1">See all</Text>
          <ChevronRight size={16} color="#f97316" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
        className="py-2"
      >
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            href={`/restaurant/${restaurant.id}`}
            asChild
          >
            <TouchableOpacity className="mr-3">
              <RestaurantCard
                id={restaurant.id}
                name={restaurant.name}
                image={restaurant.image}
                cuisineType={restaurant.cuisineType}
                rating={restaurant.rating}
                deliveryTime={restaurant.deliveryTime}
              />
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategorySection;
