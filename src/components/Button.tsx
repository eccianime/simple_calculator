import { Center, Text } from "native-base";
import { Dimensions, TouchableHighlight } from "react-native";

type ButtonProps = {
  label: string;
  isOperation?: boolean;
  buttonWidth?: number;
  onPress: (value: string) => void;
};

export default function Button({
  label,
  isOperation,
  buttonWidth,
  onPress,
}: ButtonProps) {
  const buttonSize = Dimensions.get("window").width / 4;
  return (
    <TouchableHighlight onPress={() => onPress(label)}>
      <Center
        h={`${buttonSize}px`}
        w={`${buttonSize * (buttonWidth || 1)}px`}
        bg={isOperation ? "#FA8231" : "#F0F0F0"}
        borderWidth={1}
        borderColor={"#888"}
      >
        <Text
          textAlign={"center"}
          color={isOperation ? "white" : "#000"}
          allowFontScaling={false}
          fontSize={"40px"}
        >
          {label}
        </Text>
      </Center>
    </TouchableHighlight>
  );
}
