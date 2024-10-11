import React, { useState } from "react";
import axios from "axios";
import {
	TextField,
	Button,
	Grid,
	Typography,
	Paper,
	Box,
	AppBar,
	Toolbar,
} from "@mui/material";
import ReactQuill from "react-quill"; // Import Quill
import "react-quill/dist/quill.snow.css"; // Import Quill style
import { useNavigate } from "react-router-dom";
import useLogout from "../utils/logout";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const FormComponent = () => {
	const baseUrl = process.env.REACT_APP_API_BASE_URL;
	const [formData, setFormData] = useState({
		body1: "",
		body2: [
			{ label: "Thème", titles: [""] },
			{ label: "Première référence", titles: [""] },
			{ label: "Sommaire", titles: [""] },
			{ label: "Dernière référence", titles: [""] },
		],
		body3: "",
	});
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const [loading, setLoading] = useState(false);
	
	const handleQuillChange = (value, name) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Gestion des titres de body2
	const handleBody2Change = (labelIndex, titleIndex, e) => {
		const { value } = e.target;
		const newBody2 = [...formData.body2];
		newBody2[labelIndex].titles[titleIndex] = value;
		setFormData((prev) => ({ ...prev, body2: newBody2 }));
	};

	// Ajout d'un titre sous un label spécifique
	const addTitleField = (labelIndex) => {
		const newBody2 = [...formData.body2];
		newBody2[labelIndex].titles.push("");
		setFormData((prev) => ({ ...prev, body2: newBody2 }));
	};

	// Suppression d'un titre sous un label spécifique
	const removeTitleField = (labelIndex, titleIndex) => {
		const newBody2 = [...formData.body2];
		newBody2[labelIndex].titles.splice(titleIndex, 1);
		setFormData((prev) => ({ ...prev, body2: newBody2 }));
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
	
		// Transform body2 array to a map-like structure
		const formattedBody2 = formData.body2.reduce((acc, curr) => {
			acc[curr.label] = curr.titles.filter(title => title.trim() !== ""); // Ignore empty titles
			return acc;
		}, {});
	
		// Prepare final form data
		const finalFormData = {
			...formData,
			body2: formattedBody2,  // Replace body2 with the transformed map-like structure
		};
		
		// Log final form data for debugging
		console.log('Final Form Data:', finalFormData);
	
		try {
			const response = await axios.post(`${baseUrl}/form/form`, finalFormData, {
				headers: {
					Authorization: `Bearer ${token}`, // Include the token in the header
				},
			});
			console.log("Form submitted:", response.data);
			alert("Guide thématique enregistré avec succès!");
			navigate(`/`);
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("Erreur d'enregistrement!");
		} finally {
			setLoading(false); // Stop loading in all cases
		}
	};
	
	const handleGoBack = () => {
		navigate(-1); // Go back to the previous page
	};

	const handleClick = () => {
		navigate("/"); // Navigate to the home page
	};

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
					<Button color="inherit" onClick={useLogout()}>
						<PowerSettingsNewIcon />
					</Button>
				</Toolbar>
			</AppBar>
			<Toolbar /> {/* Empty Toolbar to push content below AppBar */}
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				style={{ marginTop: "20px" }}
			>
				<Paper
					style={{
						padding: "10px",
						width: "1500px",
						borderRadius: "8px",
						boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
					}}
				>
					<Typography
						variant="h4"
						style={{ marginBottom: "16px", textAlign: "center" }}
					>
						Guide Thématique
					</Typography>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Typography variant="h6" style={{ margin: "16px 0 8px" }}>
									Texte
								</Typography>
								<ReactQuill
									value={formData.body1}
									onChange={(value) => handleQuillChange(value, "body1")}
									style={{ height: "200px", marginBottom:'20px' }}
								/>
							</Grid>
							{/* Body2 tableau */}
							{formData.body2.map((item, labelIndex) => (
								<Grid item xs={12} key={labelIndex}>
									<Typography variant="h6">{item.label}</Typography>
									{item.titles.map((title, titleIndex) => (
										<Grid
											container
											spacing={1}
											key={titleIndex}
											alignItems="flex-end"
										>
											<Grid item xs={10}>
												<TextField
													label={`Titre ${titleIndex + 1}`}
													value={title}
													onChange={(e) =>
														handleBody2Change(labelIndex, titleIndex, e)
													}
													required
													fullWidth
													variant="outlined"
												/>
											</Grid>
											<Grid item xs={2}>
												<Button
													variant="contained"
													color="error"
													onClick={() =>
														removeTitleField(labelIndex, titleIndex)
													}
													style={{ height: "100%" }}
												>
													Supprimer
												</Button>
											</Grid>
										</Grid>
									))}
									<Button
										variant="contained"
										color="primary"
										onClick={() => addTitleField(labelIndex)}
										style={{ marginTop: "16px" }}
									>
										Ajouter un titre
									</Button>
								</Grid>
							))}

							{/* Body3 */}
							<Grid item xs={12}>
								<Typography variant="h6" style={{ margin: "16px 0 8px" }}>
									Texte en dessous du tableau
								</Typography>
								<ReactQuill
									value={formData.body3}
									onChange={(value) => handleQuillChange(value, "body3")}
									style={{ height: "200px", marginBottom: "20px" }}
								/>
							</Grid>

							<Grid item xs={5}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									style={{ marginTop: "16px", marginRight: "10px" }}
									disabled={loading}
								>
									{loading ? "Chargement..." : "Enregistrer"}
								</Button>
								<Button
									onClick={handleGoBack}
									variant="outlined"
									color="primary"
									style={{ marginTop: "16px" }}
								>
									Retour
								</Button>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Grid>
		</Box>
	);
};

export default FormComponent;
