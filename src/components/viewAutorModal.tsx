import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { TextField } from "@mui/material";
import { data } from "./owner-Table";
import { MUITypes } from "@/types";

const style: MUITypes = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

export default function BasicModal({
  author,
}: {
  author: (typeof data)[number];
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <RemoveRedEyeIcon fontSize="small" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="outlined-name"
            label="Name"
            type="text"
            value={author.owner}
          />
          <TextField
            id="outlined-email"
            label="Email"
            type="email"
            value={`${author.owner.replaceAll(" ", "")}@gmail.com`}
          />
          <TextField
            id="outlined-location-input"
            label="Location"
            type="text"
            value={author.location}
          />
          <TextField
            id="outlined-phonenum-input"
            label="Phone Number"
            value="99999999"
            type="tel"
          />
        </Box>
      </Modal>
    </div>
  );
}
