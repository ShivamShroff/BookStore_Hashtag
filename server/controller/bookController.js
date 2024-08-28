const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();  

//controller to fetch all books from db
exports.getBooks = async (req,res) => {
  try{
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
};
// controller for  adding a new book in db
exports.addBook = async (req,res) => {
  try{
    const {title, author, genre, price, availability} = req.body; //destructuring fields

    if (!title || !author || !genre || !price || !availability){  //validating all fields
      return res.status(400).json({ error: "All fields are required" });
    }
    const newBook = await prisma.book.create({  //created entry in book table
    data:{title, author, genre, price, availability},
    });
    res.status(200).json({ message: "Book is being added", bookId: newBook.id });
  }
  catch(err){ //error while creating book
    console.error("Error in addBook:", err);
    res.status(500).json({ error: err.message });
  }
};
//controller for upating book
exports.updateBook = async (req,res)=>{
  const {id} = req.params; //extracting book ID from parameters
  let {title, author, genre, price} = req.body; //destructruing
// console.log(id)
  try{
    const thisBook = await prisma.book.findUnique({
      where:{id:Number(id)}, //finding book with the input id
  
    });
    if(!thisBook){ //if that id does not exist
      return res.status(404).json("book is not there");
    }
    //if any field not privided then use the preivious one
    if(title==null || title.length == 0) title=thisBook.title;
    if(author==null || author.length == 0) author=thisBook.author;
    if(genre==null || genre.length == 0) genre=thisBook.genre;
    if(price==null) price=thisBook.price;
    
    //all updated data assigning in updatedData
    const updatedData ={
      title: title ,
      author: author ,
      genre: genre ,
      price: price ,
    };
    //updating the book
    const updatedBook = await prisma.book.update({
      where: {id: Number(id)},
      data: updatedData,
    });
    res.status(201).json({message:"Book updated", book:updatedBook,genre:genre});
  }
  catch(err){
    res.status(501).json({error:err.message,genre:genre});
  }
};
//contorller for purchase book
exports.purchaseBook = async (req,res) => {
  const {title} = req.body; 

  //finding the first available book with title
  try{  
    const bookToPurchase = await prisma.book.findFirst({
      where: { title, availability: true },
    });
    if (!bookToPurchase) {  //in case book is not available
      return res.status(404).json({ message: "Sorry! Book out of stock or not found" });
    }
    await prisma.book.update({   //after book purchased update availb-false
      where: { id: bookToPurchase.id },
      data: { availability: false },
    });
    res.status(200).json({ message: "Book purchased successfully" });
  }
  catch(err){
    console.error("Error in purchaseBook:", err);
    res.status(500).json({ error: "An error occurred while purchasing the book" });
  }
};




