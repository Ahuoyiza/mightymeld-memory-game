import { Box, GridItem } from "@chakra-ui/react";

export function Tile({ content: Content, flip, state }) {
  switch (state) {
    case "start":
      return (
        <GridItem
          onClick={flip}
          display="inline-block"
          width="100%"
          height="100%"
          textAlign="center"
          p="8px"
          borderRadius="10px"
          bg= "#68d391"
        >
          <Content 
            style={{
              display: "hidden",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
              color:"#68d391"
                
            }}
            />
        </GridItem>
      );
    case "flipped":
      return (
        <GridItem
          display="inline-block"
          width="100%"
          height="100%"
          textAlign="center"
          bg="#37a169"
          borderRadius= "10px"
          p= "8px"
        >
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
              color: "#fff"
            }}
          />
        </GridItem>
      );
    case "matched":
      return (
        <GridItem
          display="inline-block"
          width="100%"
          height="100%"
          textAlign="center"
          bg="#f0fff4"
          padding= "8px"
          borderRadius = "10px"
        >
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
              color: "#c6f6d5"
            }}
          />
        </GridItem>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}
