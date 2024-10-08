import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	TextField,
	Button,
	Box,
	Typography,
	AppBar,
	Toolbar,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLogout from "../utils/logout";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";


const AddEvent = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [description, setDescription] = useState("");
	const [message, setMessage] = useState("");
	const baseUrl = process.env.REACT_APP_API_BASE_URL;
	const token = localStorage.getItem("token");
	const handleGoToEventTable = () => {
		navigate("/eventtable");
	};

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		// Validation to check if all fields are filled
		if (!title || !date || !time || !description) {
			setMessage("Veuillez remplir tous les champs.");
			return;
		}

		try {
			const response = await axios.post(`${baseUrl}/event/add-event`, {
				title,
				date,
				time,
				description,
			}, {
				headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the header
                },
			});

			if (response.status === 201) {
				setMessage("");
				toast.success("L'événement a été enregistré avec succès !");
				setTitle("");
				setDate("");
				setTime("");
				setDescription("");
			} else {
				setMessage("Erreur lors de l'enregistrement de l'événement.");
			}
		} catch (error) {
			if (error.response && error.response.data.message) {
				setMessage(error.response.data.message);
			} else {
				setMessage("Erreur lors de l'enregistrement. Réessayez plus tard.");
			}
		}
	};

	return (
		<Box>
			<Box sx={{ marginBottom: 2 }}>
				<AppBar position="static">
					<Toolbar sx={{ justifyContent: "space-between" }}>
						<Typography variant="h6" sx={{ flexGrow: 1 }}>
							Admin Panel
						</Typography>

						<Typography
							variant="h6"
							sx={{
								textAlign: "center",
								flexGrow: 1,
								marginLeft: "auto",
								marginRight: "auto",
							}}
						>
							Ajouter un événement
						</Typography>

						<Button
							color="inherit"
							onClick={useLogout()}
							sx={{ marginLeft: "auto" }}
						>
							<PowerSettingsNewIcon />
						</Button>
					</Toolbar>
				</AppBar>
			</Box>
			<Box
				sx={{
					maxWidth: 500,
					margin: "0 auto",
					padding: 4,
					backgroundColor: "#f4f4f4",
					borderRadius: 2,
					boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
				}}
			>
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<form onSubmit={handleSubmit}>
					<Box sx={{ marginBottom: 2 }}>
						<TextField
							label="Titre"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Titre de l'événement"
							fullWidth
						/>
					</Box>

					<Box sx={{ marginBottom: 2 }}>
						<TextField
							type="date"
							label="Date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							fullWidth
						/>
					</Box>

					<Box sx={{ marginBottom: 2 }}>
						<TextField
							type="time"
							label="Heure"
							value={time}
							onChange={(e) => setTime(e.target.value)}
							fullWidth
						/>
					</Box>

					<Box sx={{ marginBottom: 2 }}>
						<TextField
							label="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Description de l'événement"
							multiline
							rows={4}
							fullWidth
						/>
					</Box>

					{message && (
						<Typography
							variant="body2"
							color="error"
							align="center"
							sx={{ marginBottom: 2 }}
						>
							{message}
						</Typography>
					)}

					<Box
						sx={{
							marginBottom: 2,
							display: "flex",
							justifyContent: "space-between",
							flexWrap: "wrap",
						}}
					>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							sx={{ mb: { xs: 1, sm: 0 } }}
						>
							Enregistrer
						</Button>

						<Button
							variant="outlined"
							color="info"
							onClick={handleGoToEventTable}
							sx={{ marginLeft: { xs: 0, sm: 2 }, mt: { xs: 1, sm: 0 } }}
						>
							Voir la Liste
						</Button>
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default AddEvent;
