import { useRef } from "react";
import { Box, TextField } from "@mui/material";

const OTPInput = ({
  value,
  onChange,
}) => {

  const inputRefs = useRef([]);

  const handleChange = (
    index,
    event
  ) => {

    const digit =
      event.target.value.replace(
        /\D/g,
        ""
      );

    if (!digit) {

      const otp = value.split("");

      otp[index] = "";

      onChange(otp.join(""));

      return;
    }

    const otp = value
      .padEnd(6, " ")
      .split("");

    otp[index] = digit[0];

    onChange(
      otp.join("").replace(/\s/g, "")
    );

    if (
      index < 5 &&
      inputRefs.current[index + 1]
    ) {

      inputRefs.current[
        index + 1
      ].focus();

    }

  };

  const handleKeyDown = (
    index,
    event
  ) => {

    if (
      event.key === "Backspace"
    ) {

      if (
        !value[index] &&
        index > 0
      ) {

        inputRefs.current[
          index - 1
        ].focus();

      }

    }

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {

      inputRefs.current[
        index - 1
      ].focus();

    }

    if (
      event.key ===
        "ArrowRight" &&
      index < 5
    ) {

      inputRefs.current[
        index + 1
      ].focus();

    }

  };

  const handlePaste = (
    event
  ) => {

    event.preventDefault();

    const pasted =
      event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

    onChange(pasted);

    const last =
      Math.min(
        pasted.length,
        6
      ) - 1;

    if (
      last >= 0 &&
      inputRefs.current[last]
    ) {

      inputRefs.current[
        last
      ].focus();

    }

  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      gap={1}
      mt={2}
      mb={2}
    >
      {Array.from({
        length: 6,
      }).map((_, index) => (

        <TextField
          key={index}

          inputRef={(el) =>
            (inputRefs.current[index] =
              el)
          }

          value={
            value[index] || ""
          }

          onChange={(e) =>
            handleChange(
              index,
              e
            )
          }

          onKeyDown={(e) =>
            handleKeyDown(
              index,
              e
            )
          }

          onPaste={
            handlePaste
          }

          inputProps={{
            maxLength: 1,
            style: {
              textAlign:
                "center",
              fontSize: 24,
              fontWeight:
                "bold",
            },
          }}

          sx={{
            width: 55,
          }}
        />

      ))}
    </Box>
  );

};

export default OTPInput;