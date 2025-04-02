import { Input, InputField, InputSlot } from "./ui/input";
import { InputIcon } from "./ui/input";
import { SearchIcon } from "./ui/icon";

import { colors } from "@/constants/colors";

export const SearchBar = ({
  value,
  onChangeText,
}: {
  value?: string;
  onChangeText?: (text: string) => void;
}) => {
  return (
    <Input className="rounded-full">
      <InputSlot className="pl-3">
        <InputIcon as={SearchIcon} color={colors?.violet} />
      </InputSlot>
      <InputField
        placeholder="Search..."
        value={value}
        onChangeText={onChangeText}
      />
    </Input>
  );
};
