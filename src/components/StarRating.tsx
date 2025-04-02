import { memo } from "react";

import { Box } from "./ui/box";
import { Text } from "./ui/text";

export const StarRating = memo(({ rating }: { rating: number }) => {
  return (
    <Box className="flex-row items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const starFilled = Math.round(rating / 2) >= star;
        return (
          <Text
            key={star}
            className={`text-lg ${starFilled ? "text-violet" : "text-quartz"}`}
            accessibilityLabel={`${starFilled ? "filled" : "empty"} star`}
          >
            ★
          </Text>
        );
      })}
      <Text className="text-xs text-quartz ml-1 self-center">
        ({rating.toFixed(1)})
      </Text>
    </Box>
  );
});
