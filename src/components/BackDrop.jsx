import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';

import Button from '@mui/material/Button';

export default function SimpleBackdrop() {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClose = () => {
    isLoading(false);
  };
  const handleOpen = () => {
    isLoading(true);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Show backdrop</Button>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        isLoading={isLoading}
        onClick={handleClose}
      >
        <div className='loader'></div>
      </Backdrop>
    </div>
  );
}
