import client from "@/apollo-client";
import Evolution from "@/components/Evolution";
import Navigation from "@/components/Navigation";
import { gql } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function PokemonDetails({ pokemon }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  let flag = false;
  const [evolution, setEvolution] = useState([
    {
      id: pokemon.id,
      name: pokemon.name,
      number: pokemon.number,
      image: pokemon.image,
      types: pokemon.types,
    },
  ]);

  if (evolution?.length > 1) {
    flag = true;
  }

  const handleOpen = async () => {
    if (!flag) {
      await client
        .query({
          query: gql`
            query pokemon($id: String, $name: String) {
              pokemon(id: $id, name: $name) {
                id
                name
                evolutions {
                  id
                  number
                  name
                  image
                  types
                }
              }
            }
          `,
          variables: {
            id: pokemon.id,
            name: pokemon.name,
          },
        })
        .then((res) => {
          setEvolution((prev) => [
            ...prev,
            ...(res?.data?.pokemon?.evolutions || []),
          ]);
          setOpen(true);
        })
        .catch((err) => {
          alert(err, "Cant get Evolution");
        });
    } else {
      setOpen(true);
    }
  };
  //   console.log(evolution);
  return (
    <>
      <Navigation />
      <div
        style={{
          backgroundImage:
            "url('https://wallup.net/wp-content/uploads/2016/05/24/143432-nature-Pokemon.jpg')",
        }}
      >
        {pokemon && (
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            spacing={2}
          >
            <Grid item xs={12} sm={6} md={5} lg={3.4}>
              <Container
                sx={{
                  m: 5,
                  mt: 3,
                  p: 5,
                  borderRadius: "10px",
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                  border: "1px solid #ff94ff",
                  backgroundColor: "#ffceff",

                  ":hover": {
                    boxShadow: "0 0 10px #ccc",
                    cursor: "pointer",
                  },
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    margin: "1rem",
                    mt: "0",
                    color: "purple",
                    textTransform: "uppercase",
                  }}
                  variant="h4"
                >
                  {pokemon.name}
                </Typography>
                <Stack
                  sx={{
                    textAlign: "center",
                    pb: "0.5rem",
                    borderBottom: "1px solid #ff94ff",
                    mb: "1rem",
                  }}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <img
                    style={{
                      mixBlendMode: "multiply",
                    }}
                    width={"250px"}
                    src={pokemon.image}
                    alt={pokemon.name}
                  />
                </Stack>
                <Typography variant="h6">
                  <span
                    style={{
                      color: "purple",
                      fontWeight: "bold",
                      marginRight: "1rem",
                    }}
                  >
                    Number
                  </span>
                  : {pokemon.number}
                </Typography>
                <Typography variant="h6">
                  <span
                    style={{
                      color: "purple",
                      fontWeight: "bold",
                      marginRight: "1rem",
                    }}
                  >
                    Classification
                  </span>
                  : {pokemon.classification}
                </Typography>
                <Typography variant="h6">
                  <span
                    style={{
                      color: "purple",
                      fontWeight: "bold",
                      marginRight: "1rem",
                    }}
                  >
                    Types
                  </span>
                  : {pokemon.types.join(", ")}
                </Typography>
                <Typography variant="h6">
                  <span
                    style={{
                      color: "purple",
                      fontWeight: "bold",
                      marginRight: "1rem",
                    }}
                  >
                    Resistant
                  </span>
                  : {pokemon.resistant.join(", ")}
                </Typography>
                <Typography variant="h6">
                  <span
                    style={{
                      color: "purple",
                      fontWeight: "bold",
                      marginRight: "1rem",
                    }}
                  >
                    Weaknesses
                  </span>
                  : {pokemon.weaknesses.join(", ")}
                </Typography>
                <Typography variant="h6">
                  <span
                    style={{
                      color: "purple",
                      fontWeight: "bold",
                      marginRight: "1rem",
                    }}
                  >
                    Weight
                  </span>
                  : {pokemon.weight.minimum} - {pokemon.weight.maximum}
                </Typography>
                <Typography variant="h6">
                  <span
                    style={{
                      color: "purple",
                      fontWeight: "bold",
                      marginRight: "1rem",
                    }}
                  >
                    Height
                  </span>
                  : {pokemon.height.minimum} - {pokemon.height.maximum}
                </Typography>
                <Stack justifyContent={"center"} alignItems={"center"}>
                  <Button
                    sx={{
                      textTransform: "none",
                      mt: "1.5rem",
                      fontSize: "1.2rem",
                    }}
                    onClick={handleOpen}
                    color="primary"
                    variant="contained"
                  >
                    Show Evolution
                  </Button>
                </Stack>
              </Container>
            </Grid>
          </Grid>
        )}
        <Modal open={open} onClose={handleClose}>
          <Evolution evolution={evolution} />
        </Modal>
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (req, res) => {
  const { id } = req.params;
  const { data } = await client.query({
    query: gql`
      query pokemon($id: String, $name: String) {
        pokemon(id: $id, name: $name) {
          id
          number
          name
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
          fleeRate
          maxCP
          maxHP
          image
        }
      }
    `,
    variables: {
      id: id,
    },
  });
  return {
    props: {
      pokemon: data.pokemon,
    },
  };
};
