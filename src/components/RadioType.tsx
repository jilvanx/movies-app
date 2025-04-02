import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from "./ui/radio";
import { Box } from "./ui/box";
import { CircleIcon } from "./ui/icon";

import { colors } from "@/constants/colors";

export const RadioType = ({
  type,
  setType,
}: {
  type: "movie" | "tv";
  setType: (type: "movie" | "tv") => void;
}) => {
  return (
    <RadioGroup className="my-5" value={type} onChange={setType}>
      <Box className="flex-row gap-4">
        <Radio value="movie">
          <RadioIndicator>
            <RadioIcon as={CircleIcon} color={colors.violet} />
          </RadioIndicator>
          <RadioLabel>Movies</RadioLabel>
        </Radio>
        <Radio value="tv">
          <RadioIndicator>
            <RadioIcon as={CircleIcon} color={colors.violet} />
          </RadioIndicator>
          <RadioLabel>TV Shows</RadioLabel>
        </Radio>
      </Box>
    </RadioGroup>
  );
};
