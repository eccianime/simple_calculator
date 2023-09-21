import { Text, VStack } from "native-base";

type DisplayProps = {
  value: string;
};

export default function Display({ value }: DisplayProps) {
  return (
    <VStack
      bg={"rgba(0,0,0,.6)"}
      flex={1}
      p={5}
      justifyContent={"center"}
      alignItems={"flex-end"}
    >
      <Text
        allowFontScaling={false}
        numberOfLines={2}
        fontSize={"50px"}
        color={"#FFF"}
      >
        {value}
      </Text>
    </VStack>
  );
}
