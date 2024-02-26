import { useState } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  Flex,
  Grid,
} from "@chakra-ui/react";
import { Tile } from "./Tile";

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({ start }) {
  return (
    <Center
      display="flex"
      flexDirection="column"
      bg="#E6fffa"
      color="#319795"
      h="41vh"
      borderRadius="12px"
      mx="40px"
      mt="20%"
    >
      <Heading>Memory</Heading>
      <Text my={8} fontSize="13px">
        Flip over tiles looking for pairs
      </Text>
      <Button
        onClick={start}
        variant="solid"
        w="35%"
        borderRadius="full"
        color="white"
        style={{
          boxShadow: "rgb(0,0,0) 5px 5px 25px -50px",
          background: "linear-gradient(179deg, #37aea9 21%, #2f8584 70%)",
        }}
      >
        Play
      </Button>
    </Center>
  );
}

export function PlayScreen({ end }) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti();
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setTimeout(end, 0);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  return (
    <Center display="flex" flexDirection="column" mt={20}>
      <Flex>
        <Text color="#2f855a" mr="10px" fontWeight="500">
          Tries
        </Text>
        <Text
          color="#25855a"
          bg="#9ae6b4"
          px="8px"
          py={0}
          fontWeight="700"
          borderRadius="5px"
        >
          {tryCount}
        </Text>
      </Flex>
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={3}
        bg="#f0fff4"
        w="80%"
        p="12px"
        borderRadius="12px"
        mt="30px"
      >
        {getTiles(16).map((tile, i) => (
          <Tile key={i} flip={() => flip(i)} {...tile} bg="red" />
        ))}
      </Grid>
    </Center>
  );
}
