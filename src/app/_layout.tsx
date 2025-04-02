import { SplashScreen, Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";

import "@global";

import { StatusBar, TouchableOpacity } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { values } from "@/constants/values";
import { colors } from "@/constants/colors";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const { isIOS } = values;

  const [fontsLoaded] = useFonts({
    SpaceMono: require("@assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="movies/[id]"
            options={{
              title: "",
              headerLeft: () => (
                <TouchableOpacity
                  className="flex-row items-center gap-x-2"
                  onPress={router.back}
                >
                  <Icon as={ArrowLeftIcon} size="xl" color={colors.violet} />
                  <Text className="text-violet font-semibold text-lg">
                    Back
                  </Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="tv/[id]"
            options={{
              title: "",
              headerLeft: () => (
                <TouchableOpacity
                  className="flex-row items-center gap-x-2"
                  onPress={router.back}
                >
                  <Icon as={ArrowLeftIcon} size="xl" color={colors.violet} />
                  <Text className="text-violet font-semibold text-lg">
                    Back
                  </Text>
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
        {isIOS ? <StatusBar barStyle="dark-content" /> : <StatusBar hidden />}
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
