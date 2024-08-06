"use client";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";

const data = [
  {
    No: 1,
    Author: "J.K. Rowling",
    Owner: "Alice Johnson",
    Category: "Fantasy",
    BookName: "Harry Potter and the Sorcerer's Stone",
    Status: "Available",
  },
  {
    No: 2,
    Author: "Stephen King",
    Owner: "Bob Smith",
    Category: "Horror",
    BookName: "The Shining",
    Status: "Borrowed",
  },
  {
    No: 3,
    Author: "Agatha Christie",
    Owner: "Carol Davis",
    Category: "Mystery",
    BookName: "Murder on the Orient Express",
    Status: "Available",
  },
  {
    No: 4,
    Author: "F. Scott Fitzgerald",
    Owner: "David Lee",
    Category: "Classic",
    BookName: "The Great Gatsby",
    Status: "Borrowed",
  },
  {
    No: 5,
    Author: "George Orwell",
    Owner: "Emily Hall",
    Category: "Dystopian",
    BookName: "1984",
    Status: "Available",
  },
  {
    No: 6,
    Author: "Jane Austen",
    Owner: "Frank Miller",
    Category: "Romance",
    BookName: "Pride and Prejudice",
    Status: "Borrowed",
  },
  {
    No: 7,
    Author: "Leo Tolstoy",
    Owner: "Grace Wilson",
    Category: "Classic",
    BookName: "War and Peace",
    Status: "Available",
  },
  {
    No: 8,
    Author: "Mark Twain",
    Owner: "Henry Baker",
    Category: "Adventure",
    BookName: "The Adventures of Huckleberry Finn",
    Status: "Borrowed",
  },
  {
    No: 9,
    Author: "William Shakespeare",
    Owner: "Isabella Carter",
    Category: "Drama",
    BookName: "Hamlet",
    Status: "Available",
  },
  {
    No: 10,
    Author: "Emily Bronte",
    Owner: "Jack Daniels",
    Category: "Romance",
    BookName: "Wuthering Heights",
    Status: "Borrowed",
  },
];

const Example = () => {
  const columns = useMemo(
    () => [
      { accessorKey: "No", header: "No." },
      { accessorKey: "Author", header: "Author" },
      { accessorKey: "Owner", header: "Owner" },
      { accessorKey: "Category", header: "Category" },
      { accessorKey: "BookName", header: "Book Name" },
      { accessorKey: "Status", header: "Status" },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enablePagination: false,
    enableFullScreenToggle: false,
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
