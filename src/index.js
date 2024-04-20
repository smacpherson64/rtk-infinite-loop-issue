import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configureStore } from "@reduxjs/toolkit";

///////////////////////////////
//
///////////////////////////////

const pokemonApi = createApi({
  // Intentionally using a bad endpoint
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost/not-realssss" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: ({ name }) => `pokemon/${name}`,
    }),
  }),
});

const { useGetPokemonByNameQuery } = pokemonApi;

const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

function Parent() {
  const { isLoading } = useGetPokemonByNameQuery({ name: "bulbasaur" });
  console.log("PARENT isLoading", isLoading);

  if (isLoading) return <div>Parent Loading...</div>;

  return <Child />;
}

function Child() {
  const { isLoading, error } = useGetPokemonByNameQuery({
    name: "bulbasaur",
  });

  return (
    <div>
      {error && <>Child error...</>}
      {isLoading && <>Child loading...</>}
    </div>
  );
}

const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <Parent />
  </Provider>,
  rootElement
);
