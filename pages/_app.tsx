import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider, Switch, useMantineTheme } from "@mantine/core";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useMantineTheme();

  const [colorScheme, setColorScheme]: ["light" | "dark", any] =
    useState("light");

  return (
    <MantineProvider theme={{ colorScheme: colorScheme }}>
      <Switch
        checked={colorScheme === "light"}
        onChange={({ target }) => {
          setColorScheme(target.checked ? "light" : "dark");
        }}
        style={{ position: "absolute", top: 10, left: 10 }}
      />
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
