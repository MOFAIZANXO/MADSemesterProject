import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

import { login, registerWithEmail, signInWithEmail } from "@/lib/appwrite";
import { Redirect } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import images from "@/constants/images";

const { width } = Dimensions.get("window");

const Auth = () => {
  const { refetch, loading, isLogged } = useGlobalContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  if (!loading && isLogged) return <Redirect href="/" />;

  const handleEmailAuth = async () => {
    if (isRegistering && (!name || !email || !password)) {
      Alert.alert("Error", "All fields are required for registration.");
      return;
    }

    const result = isRegistering
      ? await registerWithEmail(name, email, password)
      : await signInWithEmail(email, password);

    if (result) {
      refetch();
    } else {
      Alert.alert("Error", `Failed to ${isRegistering ? "register" : "login"}`);
    }
  };

  return (
    <SafeAreaView className="bg-gray-100 h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center px-6">
          {/* Header Image */}
          <Image
            source={images.onboarding}
            style={{ width: width, height: width * 0.75 }} // Adjusting height proportionally
            resizeMode="contain"
          />

          {/* Title Section */}
          <Text className="text-xl font-bold text-gray-700 text-center mt-6">
            Welcome to{" "}
            <Text className="text-primary-500">Property Manager</Text>
          </Text>
          <Text className="text-lg text-gray-500 text-center mt-2">
            {isRegistering
              ? "Create an account to find your dream home."
              : "Sign in to continue managing properties."}
          </Text>

          {/* Input Section */}
          <View className="w-full mt-8 space-y-4">
            {isRegistering && (
              <TextInput
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                className="bg-white border border-gray-300 rounded-md px-4 py-3 shadow-sm text-gray-700"
                placeholderTextColor="#9CA3AF"
              />
            )}
            <TextInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              className="bg-white border border-gray-300 rounded-md px-4 py-3 shadow-sm text-gray-700"
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="bg-white border border-gray-300 rounded-md px-4 py-3 shadow-sm text-gray-700"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Action Button */}
          <TouchableOpacity
            onPress={handleEmailAuth}
            className="bg-blue-500 rounded-full w-full py-4 mt-6"
          >
            <Text className="text-lg font-medium text-white text-center">
              {isRegistering ? "Register" : "Login"}
            </Text>
          </TouchableOpacity>

          {/* Toggle Button */}
          <TouchableOpacity
            onPress={() => setIsRegistering(!isRegistering)}
            className="mt-4"
          >
            <Text className="text-sm text-primary-500 text-center">
              {isRegistering
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Text>
          </TouchableOpacity>

          {/* Google Login Button */}
          <TouchableOpacity
            onPress={login}
            className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full w-full py-4 mt-6 shadow-md"
          >
            <Image
              source={icons.google}
              className="w-5 h-5"
              resizeMode="contain"
            />
            <Text className="text-lg font-medium text-gray-700 ml-2">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Auth;
