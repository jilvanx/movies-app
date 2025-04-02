import { Spinner } from "./ui/spinner";
import { Box } from "./ui/box";

import { colors } from "@/constants/colors";

export const Loading = () => {
  return (
    <Box className="flex-1 justify-center items-center bg-antique">
      <Spinner size="large" color={colors.violet} />
    </Box>
  );
};
