import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import BookRecords from "./components/BookRecords";
import AuthorRecords from "./components/AuthorRecords";
import CreateBook from "./components/CreateBook";
import CreateAuthor from "./components/CreateAuthor";
import EditBook from "./components/EditBook";
import EditAuthor from "./components/EditAuthor";
import AuthorInfo from "./components/AuthorInfo";
import ReadBook from "./components/ReadBook";
import ReadAuthor from "./components/ReadAuthor";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Dashboard} />
      <Route path="/books" Component={BookRecords} />
      <Route path="/authors" Component={AuthorRecords} />
      <Route path="/create-book" Component={CreateBook} />
      <Route path="/create-author" Component={CreateAuthor} />
      <Route path="/edit-book/:id" Component={EditBook} />
      <Route path="/edit-author/:id" Component={EditAuthor} />
      <Route path="/authorinfo/:id" Component={AuthorInfo} />
      <Route path="/read-book/:id" Component={ReadBook} />
      <Route path="/read-author/:id" Component={ReadAuthor} />
    </Routes>
  );
}

export default App;
