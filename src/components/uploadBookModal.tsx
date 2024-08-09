import { addBookSchema } from "@/lib/utils";
import { MUITypes } from "@/types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as React from "react";
import toast from "react-hot-toast";
import { z } from "zod";

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

type BookSetter = React.Dispatch<
  React.SetStateAction<z.infer<typeof addBookSchema> | undefined>
>;

export default function UploadBookModal({ setBook }: { setBook: BookSetter }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={(ev) => {
          ev.stopPropagation();
          handleOpen();
        }}
        sx={{ my: 2, mx: "auto" }}
        variant="outlined"
        color="primary"
      >
        Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              id="outlined-name"
              label="Book Name"
              type="text"
              name="name"
              variant="filled"
            />
            <TextField
              id="outlined-name"
              label="Author Name"
              type="text"
              name="author"
              variant="filled"
            />
            <FormControl>
              <InputLabel id="demo-simple-select-required-label">
                category
              </InputLabel>

              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                label="Category *"
                variant="filled"
                sx={{ color: "black" }}
                name="category"
                onChange={() => {}}
              >
                <MenuItem value={"fiction"}>fiction</MenuItem>
                <MenuItem value={"selfHelp"}>selfHelp</MenuItem>
                <MenuItem value={"business"}>business</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2, px: 3, py: 2 }}
              formAction={(formData) => {
                const formDataObj = Object.fromEntries(formData.entries());
                try {
                  const book = addBookSchema.parse(formDataObj);
                  setBook(book);
                } catch (err) {
                  if (err instanceof z.ZodError) {
                    toast.error(err.message);
                    return;
                  }
                  if (err instanceof Error) {
                    toast.error(err.message);
                  }
                }
              }}
            >
              Add
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
