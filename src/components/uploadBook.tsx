"use client";

import React, { useState } from "react";
import {
  TextField,
  Autocomplete,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
// import UpgradeIcon from "@mui/icons-material/Upgrade";
import { Button, Input, Box, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import UploadBookModal from "./uploadBookModal";
import { APIResponse } from "@/types";
import BasicModal from "./bookUploalSuccessModal";
import toast from "react-hot-toast";
import { Book } from "@prisma/client";

function UploadBook({ books }: { books: Partial<Book>[] }) {
  const [newBook, setBook] = useState<{
    name: string;
    author: string;
    category: string;
  }>();
  const [open, setOpen] = React.useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [bookQuantity, setBookQuantity] = useState<number>(0);
  const [bookPrice, setBookPrice] = useState<number>(0);

  async function handleBookUpload() {
    const bookToUpload = {
      name: newBook?.name,
      author: newBook?.author,
      category: newBook?.category,
      quantity: bookQuantity,
      price: bookPrice,
    };
    try {
      setIsUploading(true);
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookToUpload),
      });
      const data = (await response.json()) as APIResponse;
      if (data.status === "success") {
        setOpen(true);
      } else {
        toast.error("We Failed to upload your book try again");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
      <Box sx={{ width: 300, margin: "0 auto", textAlign: "center" }}>
        <h2>Upload New Book</h2>
        <Autocomplete
          open
          disableCloseOnSelect
          disablePortal
          onSelect={(e) => e.stopPropagation()}
          options={books?.map((book) => ({
            label: book.bookName,
            value: book.bookName,
          }))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search book by name or Author"
              variant="outlined"
            />
          )}
          sx={{ marginBottom: 2 }}
          PaperComponent={(props) => (
            <Box
              style={{
                backgroundColor: "slate",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              {...props}
            >
              {(newBook
                ? books.concat([
                    {
                      bookName: newBook.name,
                      author: newBook.author,
                      category: newBook.category as
                        | "fiction"
                        | "selfHelp"
                        | "business",
                      bookNo: "",
                      id: 0,
                      isApproved: false,
                      ownerId: 0,
                      price: 0,
                      status: "free",
                    },
                  ])
                : books
              ).map((book) => (
                <Typography
                  onClick={(e) => e.stopPropagation()}
                  key={book.id}
                  sx={{ marginBottom: "10px" }}
                >
                  {book.bookName}
                </Typography>
              ))}
              <Divider
                sx={{ width: "100%", margin: "10px 0", color: "gray" }}
              />

              <UploadBookModal setBook={setBook} />
            </Box>
          )}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "800px",
          justifyContent: "space-arround",
          margin: "0 auto",
        }}
      >
        <Box sx={{ minWidth: 300, mt: "150px", mx: "auto" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Book Quantity</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Book Quantity"
              onChange={(e) => setBookQuantity(Number(e.target.value))}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 300, mt: "150px", mx: "auto" }}>
          <OutlinedInput
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            placeholder="Rent Price for 2 weeks"
            value={bookPrice}
            type="number"
            onChange={(e) => setBookPrice(Number(e.target.value))}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "50%",
          maxWidth: "800px",
          margin: "30px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box display="flex" alignItems="center">
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="upload-book-cover"
          />
          <label htmlFor="upload-book-cover">
            <Button
              variant="contained"
              component="span"
              startIcon={<UploadIcon />}
            >
              Upload Book Cover
            </Button>
          </label>
        </Box>
        <Box sx={{ p: 2, my: 3 }} display="flex" alignItems="center">
          <BasicModal
            disabled={isUploading}
            onSubmit={handleBookUpload}
            open={open}
            setOpen={setOpen}
          >
            {isUploading ? "please wait ...." : "submit"}
          </BasicModal>
        </Box>
      </Box>
    </Box>
  );
}

export default UploadBook;
