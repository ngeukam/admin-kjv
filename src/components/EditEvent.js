import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
	TextField,
	Button,
	Typography,
	Box,
	Toolbar,
	AppBar,
} from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import useLogout from "../utils/logout";

const EditEvent = () => {
	const { id } = useParams(); // Obtenir l'ID de l'événement à partir de l'URL
	const navigate = useNavigate(); // Utiliser navigate pour redirection
	const baseUrl = process.env.REACT_APP_API_BASE_URL;
	const [event, setEvent] = useState({
		title: "",
		date: "",
		description: "",
	});

	useEffect(() => {
		const fetchEvent = async () => {
			const token = localStorage.getItem("token");
			try {
				// Récupérer l'événement par ID
				const response = await axios.get(
					`${baseUrl}/event/retrieve-event/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`, // Include the token in the header
						},
					}
				);
				// Convertir la date en format 'yyyy-MM-dd' pour l'affichage
				if (response.data.date) {
					response.data.date = new Date(response.data.date)
						.toISOString()
						.split("T")[0];
				}
				setEvent(response.data); // Remplacer par votre API pour récupérer un événement
			} catch (error) {
				console.error("Error fetching event:", error);
			}
		};

		fetchEvent(); // Appeler la fonction pour récupérer les données de l'événement
	}, [id]); // Dépend de l'ID, récupérer l'événement lorsque le composant est monté

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEvent({ ...event, [name]: value }); // Mettre à jour l'état avec les valeurs des entrées
	};

	const handleSubmit = async (e) => {
		const token = localStorage.getItem("token");
		e.preventDefault();
		try {
			// Envoyer une requête PUT pour mettre à jour l'événement
			await axios.put(`${baseUrl}/event/update-event/${id}`, event, {
				headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the header
                },
			});
			toast.success("Événement modifié avec succès !");
			//navigate("/eventtable"); // Rediriger vers la page principale après la mise à jour
		} catch (error) {
			console.error("Error updating event:", error);
		}
	};

	const handleGoBack = () => {
		navigate(-1); // Retourner à la page précédente
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
							Modifier un événement
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
							name="title"
							value={event.title}
							onChange={handleChange}
							fullWidth
							required
						/>
					</Box>
					<Box sx={{ marginBottom: 2 }}>
						<TextField
							label="Date"
							name="date"
							type="date"
							value={event.date}
							onChange={handleChange}
							fullWidth
							required
						/>
					</Box>
					<Box sx={{ marginBottom: 2 }}>
						<TextField
							label="Description"
							name="description"
							value={event.description}
							onChange={handleChange}
							fullWidth
							required
							multiline
							rows={4}
						/>
					</Box>
					<Button type="submit" variant="contained" color="primary">
						Modifier
					</Button>
					<Button
						variant="outlined"
						color="secondary"
						onClick={handleGoBack}
						style={{ marginLeft: "10px" }} // Ajout d'un espacement
					>
						Retour
					</Button>
				</form>
			</Box>
		</Box>
	);
};

export default EditEvent;
