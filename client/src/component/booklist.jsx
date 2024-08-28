import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TypographyInfo from '../utility/typography';
import BookIcon from '../utility/bookIcon';
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CardMedia,
} from '@mui/material';
import { Search, Refresh, ShoppingCart } from '@mui/icons-material';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(()=>{  //call fun once when component mounts to load the prev data
    fetchBooks();
  },[]);

  const fetchBooks = async () => {
    try{
      //get req to fetch all books from db
      const response = await axios.get('http://localhost:3001/api/books');
      setBooks(response.data);
    } 
    catch(error) {
      console.error('Error in fetching books', error);
    }
  };
// updates the search query
  const handleSearchChange =(e)=> {
    setSearchQuery(e.target.value);
  };
//refreshes book list
  const handleRefresh =()=> {
    fetchBooks();
  };

  const handlePurchase = async(bookId)=> {
    try{
      //post req to purchase 
      await axios.post('http://localhost:3001/api/purchase', { id: bookId });
      alert('Book purchased successfully!');
      fetchBooks();
    } 
    catch(error){
      console.error('Error purchasing book', error);
      alert('Failed to purchase book.');
    }
  };
  //filter list based on serch field only matching titles
  const filteredBooks = books.filter((book)=> {
    return(
      (searchQuery === ''||book.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return(
    <Container maxWidth="lg" className="mt-4">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search by book name"
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            sx={{ marginBottom: 4 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            sx={{
              backgroundColor:'#808080',
              '&:hover':{
                backgroundColor:'#666666',
              },
            }}
            startIcon={<Refresh/>}
            onClick={handleRefresh}
          >Refresh 
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} className="mt-4">
        {filteredBooks.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <Card>
              <Grid container spacing={0}>
                <Grid item xs={6} sm={6} md={6}>
                  <CardContent>
                    <Typography variant="h5" component="h2"> {book.title}</Typography>
                    <TypographyInfo label="Author" value={book.author} />
                    <TypographyInfo label="Genre" value={book.genre} />
                    <TypographyInfo label="Price" value={book.price} />
                    <TypographyInfo
                        label="Availability"
                        value={book.availability ? "In stock" : "Out of stock"}
                      />
                  </CardContent>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                <CardMedia>
  {book.image ? (
    <img src={book.image} alt={book.title} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
  ) : (
    <BookIcon />
  )}
</CardMedia>
                </Grid>
              </Grid>
              <CardActions>
                <IconButton
                  aria-label="purchase"
                  onClick={() => handlePurchase(book.id)}
                >
                  <ShoppingCart />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default BookList;