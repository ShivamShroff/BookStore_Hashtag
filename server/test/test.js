const request = require('supertest'); //importing this module for testing http servers
const express = require('express');
const {PrismaClient} = require('@prisma/client'); //for interacting with db
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
const {getBooks, addBook, updateBook, purchaseBook} = require('../controller/bookController');
//defining all api endpoints
app.get('/api/books', getBooks);
app.post('/api/add-book', addBook);
app.put('/api/update-book/:id', updateBook);
app.post('/api/purchase', purchaseBook);

//starting test
describe('Book Controller Tests', () => {

  //dicsonnect prisma client after all tests
  afterAll(async() =>{
    await prisma.$disconnect();
  });
  
  test('GET /api/books should return a list of books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  test('POST /api/add-book should add a book', async () => {
    const response = await request(app)
      .post('/api/add-book')
      .send({ title:'Test Book', author:'Test Author', genre:'Sci_fi', price:10, availability:true, });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Book added');
  });
  test('PUT /api/update-book/:id should update a book', async () => {
    const response = await request(app)
    .put('/api/update-book/103')
    .send({ title:'Updated Title', author:'Updated Author',});
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Book updated');
  });
  test('POST /api/purchase should purchase a book', async () => {
    const response = await request(app) .post('/api/purchase')
    .send({ title:'Test Book',});
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Book purchased successfully');
  });
});
