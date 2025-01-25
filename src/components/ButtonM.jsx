
import Button from '@mui/material/Button';

function ButtonM({ text, startIcon, onClick, variant, className, disabled, type= "button" }) {
  const buttonVariant =
    variant || (text === "Cancel" ? "outlined" : "contained");

  const buttonStyles =
    variant === "text"
      ? { padding: 0, margin: 0, width: "10px" }
      : {};

  return (
    <Button
     type={type}
      variant={buttonVariant}
      startIcon={startIcon}
      onClick={onClick}
      style={buttonStyles} 
      className={className}
      disabled={disabled} 
    >
      {text}
    </Button>
  );
}

export default ButtonM;
