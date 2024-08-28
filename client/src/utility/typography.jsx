import { Typography } from '@mui/material';

const TypographyInfo = ({ label, value, color = 'textSecondary' }) => {
  return (
    <Typography variant="body2" color={color}>
      {label}: {value}
    </Typography>
  );
};

export default TypographyInfo;