import { gql } from "@apollo/client";
import client from "../apollo-client";
import styles from "../styles/Home.module.css";
import { Box, Grid, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navigation from "@/components/Navigation";

export default function Home({ pokemons }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(20);
  const [pokemonData, setPokemonData] = useState(pokemons);
  const router = useRouter();

  const currentData = pokemonData.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  useEffect(() => {
    const first = currentPage * 20;
    if (currentPage > 3) {
      client
        .query({
          query: gql`
        query Pokemon {
          pokemons(first: ${first}) {
            id
            number
            name
            image
            weight {
              minimum
              maximum
            }
            height {
              minimum
              maximum
            }
            classification
            types
            resistant
            weaknesses
          }
        }
      `,
        })
        .then((res) => {
          setPokemonData(res.data.pokemons);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Navigation />
      <Grid
        sx={{
          backgroundImage:
            "url('https://wallup.net/wp-content/uploads/2016/05/24/143432-nature-Pokemon.jpg')",
        }}
        justifyContent={"center"}
        alignItems={"center"}
        container
        spacing={2}
      >
        <Pagination
          sx={{
            mt: 5,
          }}
          count={10}
          shape="rounded"
          size="large"
          page={currentPage}
          onChange={handleChange}
          color="primary"
        />

        <div className={styles.container}>
          {currentData.map((pokemon) => (
            <Box
              sx={{
                ":hover": {
                  boxShadow: "0 0 10px #ccc",
                  transform: "rotate(5deg)",
                  cursor: "pointer",
                  backgroundColor: "#ffceff",
                },
              }}
              onClick={() => router.push(`/${pokemon.id}`)}
              key={pokemon.id}
              className={styles.card}
            >
              <h1 className={styles.name}>{pokemon.name}</h1>
              <img className={styles.image} src={pokemon.image} />
              <p className={styles.number}>Number: {pokemon.number}</p>
              <p className={styles.types}>Types: {pokemon.types.join(", ")}</p>
            </Box>
          ))}
        </div>
        <Pagination
          sx={{
            mt: 5,
            mb: 5,
          }}
          count={10}
          shape="rounded"
          size="large"
          page={currentPage}
          onChange={handleChange}
          color="primary"
        />
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  const first = 60;
  const { data } = await client.query({
    query: gql`
      query Pokemon {
        pokemons(first: ${first}) {
          id
          number
          name
          image
          weight {
            minimum
            maximum
          }
          height {
            minimum
            maximum
          }
          classification
          types
          resistant
          weaknesses
        }
      }
    `,
  });
  return {
    props: {
      pokemons: data.pokemons,
    },
  };
}
