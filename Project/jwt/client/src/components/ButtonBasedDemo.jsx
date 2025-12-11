import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 120,
  width: 200,
  borderRadius: 10,
  overflow: "hidden",
  border: "2px solid white",
  color: "white",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(5px)",
  transition: "0.3s",

  "&:hover": {
    background: "rgba(255,255,255,0.3)",
  },
}));

export default function ButtonBaseDemo({ title }) {
  return (
    <ImageButton>
      <Typography variant="h6" sx={{ zIndex: 2 }}>
        {title}
      </Typography>
    </ImageButton>
  );
}
