import { AlertCircle } from "lucide-react-native";

import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { Button } from "./ui/button";

import { colors } from "@/constants/colors";

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export const Error: React.FC<ErrorProps> = ({ message, onRetry }) => {
  return (
    <Box
      testID="error-container"
      className="flex-1 justify-center items-center p-4 bg-antique"
    >
      <Box className="items-center gap-3">
        <AlertCircle size={48} color={colors.red} />
        <Text className="text-lg text-center font-medium">{message}</Text>
        {onRetry && (
          <Button variant="solid" onPress={onRetry} className="mt-2 bg-violet">
            <Text className="text-antique text-md">Try Again</Text>
          </Button>
        )}
      </Box>
    </Box>
  );
};
