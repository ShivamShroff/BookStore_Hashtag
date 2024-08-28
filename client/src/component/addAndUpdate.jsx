import React, {useState} from 'react';
import axios from 'axios';
import {TextField, Button, Grid, Container, Paper, Typography, FormControl, MenuItem, Select, InputLabel} from '@mui/material';

function AddUpdateBook() { //managing state using usetate
  const [book, setBook] = useState({
    id: '',
    title: '',
    author: '',
    genre: '',
    price: '',
    availability: false,
  });
  const handleChange =(e)=> {  //upates state  while user typing inputs
    setBook({ ...book, [e.target.name]: e.target.value });
  };
  //it sends a post req for add book
  const handleAdd = async(e)=> {
    e.preventDefault();  // avoid default submission
    console.log('Data sent ', book);
    try{
      //check all requierd fields
      if (!book.title || !book.author || !book.genre || !book.price || book.availability === ''){
        alert('fill all fields');
        return;
      }

      // here creates a object of book to send and ensuring its datatypes
      const bookToSend = { ...book, price: parseFloat(book.price), availability: book.availability === 'In Stock'};
      //a post req is being send
      await axios.post('http://localhost:3001/api/add-book', bookToSend);
      alert('added successfully!');
      setBook({
        id: '',
        title: '',
        author: '',
        genre: '',
        price: '',
        availability:false,
      }); // resests book state to empty
    }
    catch(error){
      console.error('Error while adding book:', error.response?.data||error.message);
      alert('Failed to add book');
    }
  };
  //sends a put request to update
  const handleUpdate = async(e)=> {
    e.preventDefault();
    try{
      if(!book.id){
        alert('provide a book ID for updating');
        return;
      }
      // creates a object to send
      const bookToSend = { 
        title:book.title,
        author: book.author,
        genre: book.genre,
        price: parseFloat(book.price),
        availability: book.availability
      };
      //here sending req
      const response = await axios.put(`http://localhost:3001/api/update-book/${book.id}`, bookToSend);
      alert('Book updated successfully!!');
    } 
    catch(error){
      console.error('Error while updating book:', error);
      alert(`Failed to update book data: ${error.message}`);
    }
  };
  return(
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding:3, marginTop:3 }}>
        <Typography variant="h4" gutterBottom> Add or Update Book </Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}> <TextField label="ID (only for Update)" name="id" value={book.id} onChange={handleChange} fullWidth variant="outlined"/> </Grid>
            <Grid item xs={12} sm={6}> <TextField label="Title" name="title" value={book.title} onChange={handleChange} fullWidth variant="outlined"/> </Grid>
            <Grid item xs={12}> <TextField label="Author" name="author" value={book.author} onChange={handleChange} fullWidth variant="outlined" /> </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Genre</InputLabel>
                <Select
                  name="genre"
                  value={book.genre}
                  onChange={handleChange}
                  label="Genre"
                >
                  <MenuItem value="Sci_fi">Sci-fi</MenuItem>
                  <MenuItem value="Romantic">Romantic</MenuItem>
                  <MenuItem value="Action">Action</MenuItem>
                  <MenuItem value="Devotional">Devotional</MenuItem>
                  <MenuItem value="Historical_Fiction">Historical Fiction</MenuItem>
                  <MenuItem value="Horror">Horror</MenuItem>
                  <MenuItem value="Non_Fiction">Non-Fiction</MenuItem>
                  <MenuItem value="Biography">Biography</MenuItem>
                  <MenuItem value="Self_Help">Self-Help</MenuItem>
                  <MenuItem value="Young_Adult">Young Adult</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Price" name="price" value={book.price} onChange={handleChange}fullWidt ariant="outlined" type="number"/>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Availability</InputLabel>
                <Select
                  name="availability"
                  value={book.availability ? 'In Stock' : 'Out of Stock'}
                  onChange={handleChange}
                  label="Availability"
                >
                  <MenuItem value="In Stock">In Stock</MenuItem>
                  <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleAdd}
                sx={{
                  backgroundColor: '#808080',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#666666',
                  },
                }}
              >Add Book
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleUpdate}
                sx={{
                  backgroundColor: '#666666',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#808080',
                  },
                }}
              >Update Book
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
export default AddUpdateBook;
