import { Box, Container, Stack, Typography } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Evolution({ evolution }) {
  console.log(evolution);
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        border: "2px solid #000",
        borderRadius: 5,
        boxShadow: 24,
        p: 4,
      }}
    >
      <Container>
        <Stack direction="row" spacing={2}>
          {evolution.map((evol, index) => (
            <>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  border: "1px solid #D3D3D3",
                  backgroundColor: "#ffceff",
                  borderRadius: "15px",
                  border: "1px solid #ff94ff",
                }}
              >
                <Box
                  sx={{
                    width: "230px",
                    height: "250px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      padding: "2rem",
                      mixBlendMode: "multiply",
                      maxWidth: "250px",
                      maxHeight: "250px",
                    }}
                    src={evol.image}
                    alt={evol.name}
                  />
                </Box>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontFamily: "Gill Sans MT",
                    color: "#000",
                  }}
                  variant="h6"
                >
                  {evol.name} #{evol.number}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontFamily: "Gill Sans MT",
                    color: "#000",
                  }}
                  variant="h6"
                >
                  Type: {evol.types.join(", ")}
                </Typography>
              </Box>
              {}
              <Box
                sx={{
                  display: evolution.length - 1 === index ? "none" : "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AiOutlineArrowRight
                  style={{
                    fontSize: "3.5rem",
                    color: "#000",
                  }}
                />
              </Box>
            </>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
