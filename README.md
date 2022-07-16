# Earthquake Visualization

This is a [Next.js](https://nextjs.org/) application that visualizes data from the [USGS](https://earthquake.usgs.gov/). 
Hosted on AWS, the app is accessible at [https://earthquake.johannes-jahn.com/](https://earthquake.johannes-jahn.com/).
It utilizes the [zustand](https://github.com/pmndrs/zustand) library for global state management to keep the data flow simple.
For visualizations, the app uses the declarative [Vega-Lite](https://vega.github.io/vega-lite/) grammar wrapped with a react package that makes the tool accessible as a react component.

## Getting Started

install the dependencies

```bash
yarn install
```

run the application in dev mode

```bash
yarn dev
```

run the application in prod mode

```bash
yarn build
yarn start
```

## File Structure

Three main directories contain the code of the web app. First, the [pages/](pages/) directory contains as per usual, all pages of the Next.js app.
Next, the [components/](components/) directory has all the components used in the pages.
And lastly, the [data/](data/) directory contains a mixture of different data-related source files.
The last one could be refactored to other directories if the app gets more complex since it includes the schemas, constants, and the global state, but it is kept simple for now.
