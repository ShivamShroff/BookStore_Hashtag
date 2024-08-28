import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/navbar';
import BookList from './component/booklist';
import AddUpdateBook from './component/addAndUpdate';
import InventoryManagement from './component/inventoryManagement';

function App(){
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path= "/" element={<BookList/>}/>
        <Route path= "/add-update" element={<AddUpdateBook/>}/>
        <Route path= "/inventory" element={<InventoryManagement/>}/>
      </Routes>
    </Router>
  );
}
export default App;