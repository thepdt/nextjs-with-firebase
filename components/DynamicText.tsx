import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { Container, Heading } from "@chakra-ui/react";
import { DynamicTextRefInterface } from "@/model/Dynamic";

const DynamicText = forwardRef((props, ref: Ref<DynamicTextRefInterface>) => {
  const [value, setValue] = useState("Random Text");
  useImperativeHandle(ref, () => ({ changeValue }));

  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxW="container.lg" centerContent>
      <Heading as="h1" size="md" wordBreak="break-word">
        {value}
      </Heading>
    </Container>
  );
});

export default DynamicText;
