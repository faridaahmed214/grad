import React, { useEffect, useState, forwardRef } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Button, useTheme, Slide, SlideProps } from "@mui/material";
import { styles } from "../styles/Modal.styles";

const Transition = forwardRef(function Transition(props: SlideProps, ref: React.Ref<unknown>) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface ModalProps {
  open: boolean;
  onClose: () => void;
  formComponent: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, formComponent }) => {
  const theme = useTheme();
  const sx = styles(theme);
  const [showBlur, setShowBlur] = useState(open);

  useEffect(() => {
    if (open) {
      setShowBlur(true);
    } else {
      const timeout = setTimeout(() => setShowBlur(false), 300); 
      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    <>
      {showBlur && (
        <Box
          sx={{
            ...sx.blurOverlay,
            opacity: open ? 1 : 0,
          }}
        />
      )}

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        sx={{
          "& .MuiDialog-container": sx.dialogContainer,
        }}
      >
        <Box sx={sx.modalBox}>
          <DialogContent>{formComponent}</DialogContent>
          <DialogActions sx={sx.actions}>
            <Button onClick={onClose} sx={sx.cancelButton}>
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default Modal;
