import { HStack, NativeBaseProvider, StatusBar } from "native-base";
import { useState } from "react";
import { LogBox } from "react-native";
import Button from "./src/components/Button";
import Display from "./src/components/Display";

LogBox.ignoreLogs(["In React 18, SSRProvider is "]);

export default function App() {
  const [calcState, setCalcState] = useState({
    displayValue: "0",
    clearDisplay: false,
    operation: "",
    values: [0, 0],
    current: 0,
  });

  const addDigit = (digit: string) => {
    if (
      (digit === "." &&
        !calcState.clearDisplay &&
        calcState.displayValue.includes(".")) ||
      (digit === "0" && calcState.displayValue === "0")
    ) {
      return;
    }

    const displayValue =
      (calcState.displayValue === "0" && digit !== ".") ||
      calcState.clearDisplay
        ? digit
        : calcState.displayValue + digit;

    const newValue = parseFloat(displayValue);
    const values = calcState.values;
    values[calcState.current] = newValue;

    setCalcState({
      ...calcState,
      values,
      clearDisplay: false,
      displayValue: displayValue === "." ? "0." : displayValue,
    });
  };

  const clearMemory = () => {
    setCalcState({
      displayValue: "0",
      clearDisplay: false,
      operation: "",
      values: [0, 0],
      current: 0,
    });
  };

  const setOperation = (operation: string) => {
    const isEquals = operation === "=";
    if (calcState.current === 0) {
      setCalcState({
        ...calcState,
        current: 1,
        operation: isEquals ? "" : operation,
        clearDisplay: true,
      });
    } else {
      try {
        const realOperation =
          calcState.operation === "×"
            ? "*"
            : calcState.operation === "÷"
            ? "/"
            : calcState.operation === "−"
            ? "-"
            : calcState.operation;
        const values = [...calcState.values];
        const valueWithoutPrecision = Number(
          eval(`${values[0]} ${realOperation} ${values[1]}`).toFixed(10)
        );
        values[0] = valueWithoutPrecision;

        values[1] = 0;

        setCalcState({
          clearDisplay: true,
          current: isEquals ? 0 : 1,
          operation: isEquals ? "" : operation,
          displayValue: `${values[0]}`,
          values,
        });
      } catch (error) {
        setCalcState({
          displayValue: "0",
          clearDisplay: false,
          operation: "",
          values: [0, 0],
          current: 0,
        });
      }
    }
  };

  return (
    <NativeBaseProvider>
      <Display value={calcState.displayValue} />
      <HStack flexWrap={"wrap"}>
        <Button label="AC" buttonWidth={3} onPress={clearMemory} />
        <Button label="÷" isOperation onPress={setOperation} />
        <Button label="7" onPress={addDigit} />
        <Button label="8" onPress={addDigit} />
        <Button label="9" onPress={addDigit} />
        <Button label="×" isOperation onPress={setOperation} />
        <Button label="4" onPress={addDigit} />
        <Button label="5" onPress={addDigit} />
        <Button label="6" onPress={addDigit} />
        <Button label="−" isOperation onPress={setOperation} />
        <Button label="1" onPress={addDigit} />
        <Button label="2" onPress={addDigit} />
        <Button label="3" onPress={addDigit} />
        <Button label="+" isOperation onPress={setOperation} />
        <Button label="0" buttonWidth={2} onPress={addDigit} />
        <Button label="." onPress={addDigit} />
        <Button label="=" isOperation onPress={setOperation} />
      </HStack>
      <StatusBar translucent={false} />
    </NativeBaseProvider>
  );
}
