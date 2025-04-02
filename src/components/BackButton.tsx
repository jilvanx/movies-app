import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { colors } from "@/constants/colors";

interface BackButtonProps {
  label?: string;
  onPress?: () => void;
}

export function BackButton({ label = "Back", onPress }: BackButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity
      className="flex-row items-center gap-x-2"
      onPress={handlePress}
    >
      <Icon as={ArrowLeftIcon} size="xl" color={colors.violet} />
      <Text className="text-violet font-semibold text-lg">{label}</Text>
    </TouchableOpacity>
  );
}
