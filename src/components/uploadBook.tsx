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

const books = [
  { name: "Book 1", author: "author name", category: "category" },
  { name: "Book 1", author: "author name", category: "category" },
];

function UploadBook() {
  const [book, setBook] = useState<{
    name: string;
    author: string;
    category: string;
  }>();

  const [bookQuantity, setBookQuantity] = useState<number>(0);
  const [bookPrice, setBookPrice] = useState<number>(0);

  async function handleBookUpload() {
    const bookToUpload = {
      name: book?.name,
      author: book?.author,
      category: book?.category,
      quantity: bookQuantity,
      price: bookPrice,
    };
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookToUpload),
      });
      const data = (await response.json()) as APIResponse;
      if (data.status === "success") {
        alert("Book uploaded successfully");
      } else {
        alert("Book upload failed");
      }
    } catch (e) {
      console.error(e);
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
          options={books.map((book) => ({
            label: book.name,
            value: book.name,
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
              {(book ? books.concat([book]) : books).map((book) => (
                <Typography
                  onClick={(e) => e.stopPropagation()}
                  key={book.name}
                  sx={{ marginBottom: "10px" }}
                >
                  {book.name}
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
          <Button
            onClick={handleBookUpload}
            color="primary"
            sx={{ py: 3, px: 5, borderRadius: "20px" }}
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default UploadBook;
