import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear the form fields
    setFormData({ name: "", email: "", message: "" });

    // Show a success toast
    toast.success("Message sent successfully!", {
      position: "top-center",
      autoClose: 3000, // Auto-close the toast after 3 seconds
    });
  };

  return (
    <Container maxWidth="sm" style={{ margin: "20px auto" }}>
      <Typography variant="h2" gutterBottom>
        Contact Us
      </Typography>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="message"
                label="Message"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                onChange={handleChange}
                value={formData.message}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            style={{ marginTop: "20px" }}
          >
            Send
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ContactForm;
