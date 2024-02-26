import { Box } from "@chakra-ui/react";

export function Tile({ content: Content, flip, state }) {
  switch (state) {
    case "start":
      return (
        <Box
          onClick={flip}
          display="inline-block"
          width={8}
          height={8}
          textAlign="center"
          bg="gray.500"
        >
          ?
        </Box>
      );
    case "flipped":
      return (
        <Box
          display="inline-block"
          width={8}
          height={8}
          textAlign="center"
          bg="yellow.500"
        >
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Box>
      );
    case "matched":
      return (
        <Box
          display="inline-block"
          width={8}
          height={8}
          textAlign="center"
          color="gray.300"
        >
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Box>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}
