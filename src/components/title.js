import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { CardHeader } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Banner({ setOpenDialog, setIsAdd }) {
  return (
    <CardHeader
      sx={{ bgcolor: "primary.dark", color: "white", textAlign: "center" }}
      title={
        <Typography
          variant="h5"
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <MenuIcon fontSize="large" />
          <span>FRAMEWORKS</span>
        </Typography>
      }
      action={
        <Button
          variant="contained"
          onClick={() => {
            setIsAdd(true);
            setOpenDialog(true);
          }}
          sx={{ width: 100, marginRight: "8px" }}
        >
          <AddCircleIcon fontSize="large" sx={{ mr: 1 }} />
          <Typography>ADD</Typography>
        </Button>
      }
    />
  );
}
