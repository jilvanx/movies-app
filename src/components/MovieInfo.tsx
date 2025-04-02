import { Box } from "./ui/box";
import { Text } from "./ui/text";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

export const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <Box className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-bold text-sm text-violet">
      {label}
    </Text>
    <Text className="text-light-100 font-medium text-sm mt-2 text-violet">
      {value || "N/A"}
    </Text>
  </Box>
);
