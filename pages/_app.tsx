import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider, Switch, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useMantineTheme();

  const [colorScheme, setColorScheme]: ["light" | "dark", any] =
    useState("light");

  useEffect(() => {
    const colorScheme = localStorage.getItem("theme");
    if (colorScheme) {
      setColorScheme(colorScheme);
    }
  }, []);

  return (
    <MantineProvider theme={{ colorScheme: colorScheme }}>
      <Head>
        <title>Earthquakes</title>
      </Head>
      <Switch
        checked={colorScheme === "light"}
        onChange={({ target }) => {
          setColorScheme(target.checked ? "light" : "dark");
          localStorage.setItem("theme", target.checked ? "light" : "dark");
        }}
        style={{ position: "absolute", top: 10, left: 10 }}
      />
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
