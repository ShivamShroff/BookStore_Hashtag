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
  CircularProgress,
} from '@mui/material';
import { Search, Refresh, ShoppingCart } from '@mui/icons-material';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreBooks, setHasMoreBooks] = useState(true);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = async () => {
    if (!hasMoreBooks || loading) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_DB_URL}/books?page=${currentPage}&limit=${itemsPerPage}`);
      const newBooks = response.data.book;
      setBooks(prevBooks => [...prevBooks, ...newBooks]);
      if (newBooks.length < itemsPerPage) {
        setHasMoreBooks(false);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error in fetching books', error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= documentHeight - 100) { // Trigger when close to bottom
      if (hasMoreBooks && !loading) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMoreBooks, loading]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setBooks([]); // Reset books
    setCurrentPage(1); // Reset to first page
    setHasMoreBooks(true);
    fetchBooks();
  };
  

  const handleRefresh = () => {
    setBooks([]);
    setCurrentPage(1);
    setHasMoreBooks(true);
    fetchBooks();
  };

  const handlePurchase = async (bookId) => {
    try {
      await axios.post('http://localhost:3001/api/purchase', { id: bookId });
      alert('Book purchased successfully!');
      fetchBooks();
    } catch (error) {
      console.error('Error purchasing book', error);
      alert('Failed to purchase book.');
    }
  };

  const filteredBooks = books.filter((book) =>
    searchQuery === '' || book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
              backgroundColor: '#808080',
              '&:hover': {
                backgroundColor: '#666666',
              },
            }}
            startIcon={<Refresh />}
            onClick={handleRefresh}
          >
            Refresh
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
      {loading && (
        <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
          <CircularProgress />
        </Grid>
      )}
    </Container>
  );
}

export default BookList;
