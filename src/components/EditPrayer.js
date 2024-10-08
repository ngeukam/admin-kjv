import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, AppBar, Toolbar } from "@mui/material";
import useLogout from "../utils/logout";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";


const EditPrayer = () => {
	const { id } = useParams(); // Obtenir l'ID de la prière à partir de l'URL
	const navigate = useNavigate(); // Utiliser navigate pour redirection
	const baseUrl = process.env.REACT_APP_API_BASE_URL;
	const [prayer, setPrayer] = useState({
		title: "",
		description: "",
		author: "",
	});

	useEffect(() => {
		const fetchPrayer = async () => {
			try {
				const token = localStorage.getItem("token");
				// Récupérer la prière par ID
				const response = await axios.get(
					`${baseUrl}/prayer/retrieve-prayer/${id}`,{
						headers: {
							Authorization: `Bearer ${token}`, // Include the token in the header
						},
					}
				);
				setPrayer(response.data); // Mettre à jour les champs avec les données de l'API
			} catch (error) {
				console.error("Error fetching prayer:", error);
			}
		};

		fetchPrayer(); // Appeler la fonction pour récupérer les données de la prière
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPrayer({ ...prayer, [name]: value }); // Mettre à jour l'état avec les valeurs des entrées
	};

	const handleSubmit = async (e) => {
		const token = localStorage.getItem("token");
		e.preventDefault();
		try {
			// Envoyer une requête PUT pour mettre à jour la prière
			await axios.put(`${baseUrl}/prayer/update-prayer/${id}`, prayer, {
				headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the header
                },
			});
			toast.success("Prière modifiée avec succès !");
			// navigate("/prayertable"); // Rediriger vers la liste des prières après la mise à jour
		} catch (error) {
			console.error("Error updating prayer:", error);
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
							Modifier la Prière
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
							value={prayer.title}
							onChange={handleChange}
							fullWidth
							required
						/>
					</Box>
					<Box sx={{ marginBottom: 2 }}>
						<TextField
							label="Auteur"
							name="author"
							value={prayer.author}
							onChange={handleChange}
							fullWidth
							required
						/>
					</Box>
					<Box sx={{ marginBottom: 2 }}>
						<TextField
							label="Description"
							name="description"
							value={prayer.description}
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

export default EditPrayer;
