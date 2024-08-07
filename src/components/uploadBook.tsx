"use client";

import React from "react";
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

const books = [{ title: "Book 1" }, { title: "Book 2" }];

function UploadBook() {
  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
      <Box sx={{ width: 300, margin: "0 auto", textAlign: "center" }}>
        <h2>Upload New Book</h2>
        <Autocomplete
          options={books}
          getOptionLabel={(option) => option.title}
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
                backgroundColor: "white",
                padding: "10px",
              }}
              {...props}
            >
              {books.map((book) => (
                <Typography key={book.title} sx={{ marginBottom: "10px" }}>
                  {book.title}
                </Typography>
              ))}
              <Divider
                sx={{ width: "100%", margin: "10px 0", color: "gray" }}
              />
              <Button
                sx={{ my: 2, mx: "auto" }}
                variant="outlined"
                color="primary"
              >
                Add
              </Button>
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
