import { Toolbar } from "@mui/material";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();
  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffceff",
          color: "white",
          height: "80px",
        }}
      >
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
          }
          style={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
          width={"180px"}
        />
      </Toolbar>
    </>
  );
}
