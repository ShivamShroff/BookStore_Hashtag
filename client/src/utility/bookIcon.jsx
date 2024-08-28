import { Icon } from '@mui/material';
import book from '../assets/book2.png';

const BookIcon =() => {
  return (
    <Icon style={{width:'190px', height:'190px'}}>
      <img src={book} alt="Book Icon" style={{width:'100%', height: '100%'}}/>
    </Icon>
  );
};
export default BookIcon;
