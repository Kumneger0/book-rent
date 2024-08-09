import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { TextField } from "@mui/material";
import { data } from "./owner-Table";
import { MUITypes } from "@/types";
import Image from "next/image";

const style: MUITypes = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 550,
  width: "80%",
  height: "80%",
  maxHeight: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "center",
  justifyContent: "center",
};

export default function BasicModal({
  open,
  setOpen,
  onSubmit,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={onSubmit}
        color="primary"
        sx={{ py: 3, px: 5, borderRadius: "20px" }}
        variant="contained"
      >
        Submit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Image src={"/smile 1.png"} width={100} height={100} alt="smile" />
          </Box>
          <Box>
            <Typography>
              You have uploaded the book successfully! wait until we approve it
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
