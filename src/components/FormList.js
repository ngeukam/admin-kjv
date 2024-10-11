import React, { useEffect, useState } from "react";
import { Typography, Button, Box, Toolbar, AppBar, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLogout from "../utils/logout";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const FormListAdmin = () => {
	const [form, setForm] = useState(null);
	const navigate = useNavigate();
	const baseUrl = process.env.REACT_APP_API_BASE_URL;
	const token = localStorage.getItem("token");
	const [loading, setLoading] = useState(false);
	const fetchForm = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${baseUrl}/form/forms`, {
				headers: {
					Authorization: `Bearer ${token}`, // Include the token in the header
				},
			});
			
			setForm(response.data[0]); // Supposons que vous n'avez besoin que du premier élément
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des formulaires:",
				error.response?.data || error.message
			);
		} finally {
			setLoading(false); // Arrête le chargement dans tous les cas
		}
	};

	useEffect(() => {
		fetchForm();
	}, []);

	const handleEdit = (id) => {
		navigate(`/edit-form/${id}`); // Redirige vers la page d'édition
	};

	const handleGoBack = () => {
		navigate(-1); // Retourner à la page précédente
	};
	const logout = useLogout();
	const handleLogout = () => {
		logout();
	};
	const handleClick = () => {
		navigate("/"); // Retour à l'accueil
	};
	const handleGoToAddForm = () => {
		navigate("/form"); // Retour à l'accueil
	};
	if (loading)
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh", // Prend toute la hauteur de la fenêtre
					textAlign: "center",
				}}
			>
				<h2>Chargement...</h2>
			</div>
		);

	return (
		<Box>
			<AppBar position="fixed">
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<Typography
						variant="h6"
						sx={{ flexGrow: 1 }}
						onClick={handleClick}
						style={{ cursor: "pointer" }}
					>
						Admin Panel
					</Typography>
					<Button color="inherit" onClick={handleLogout}>
						<PowerSettingsNewIcon />
					</Button>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				style={{ marginTop: "10px" }}
			>
				{!form ? (
					<>
						<Button
							variant="outlined"
							color="error"
							onClick={handleGoToAddForm}
							style={{ marginTop: "20px", marginRight: "10px" }}
						>
							Ajouter
						</Button>
						<Button
							variant="outlined"
							color="primary"
							onClick={handleGoBack}
							style={{ marginTop: "20px" }}
						>
							Retour
						</Button>
					</>
				) : (
					<>
						<Typography variant="body2" style={{padding:'10px'}}>
							<span dangerouslySetInnerHTML={{ __html: form.body1 }} />
						</Typography>
						<Button
							variant="outlined"
							color="warning"
							onClick={() => handleEdit(form._id)}
							style={{ marginRight: "10px" }}
						>
							<i className="fas fa-edit" style={{ fontSize: "24px" }}></i>
							Modifier
						</Button>
						<Button
							variant="outlined"
							color="info"
							onClick={handleGoBack}
						>
							Retour
						</Button>
					</>
				)}
			</Grid>
		</Box>
	);
};

export default FormListAdmin;
