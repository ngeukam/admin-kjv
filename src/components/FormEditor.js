import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Paper,
    Box,
	AppBar,
	Toolbar
} from "@mui/material";
import ReactQuill from "react-quill"; // Import Quill
import "react-quill/dist/quill.snow.css"; // Import Quill style
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useLogout from "../utils/logout";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";


const FormEditor = () => {
	const { id } = useParams();
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const [loading, setLoading] = useState(false);
	const [_isloading, setisLoading] = useState(false);
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

    // Chargez les données de l'API lors du montage du composant
    useEffect(() => {
		const fetchData = async () => {
			try {
				setisLoading(true);
				const response = await axios.get(`${baseUrl}/form/form/${id}`,{
					headers: {
						Authorization: `Bearer ${token}`, // Include the token in the header
					},
				});
				const data = response.data;
				console.log('Fetched Data:', data); // Log the entire response
		
				if (typeof data.body2 === 'object' && !Array.isArray(data.body2)) {
					// Transform the object into an array
					const transformedBody2 = Object.keys(data.body2).map((key) => ({
						label: key,
						titles: data.body2[key],
					}));
		
					// Update formData with the transformed structure
					setFormData({
						...data,
						body2: transformedBody2, // Set the transformed body2
					});
				} else {
					console.error('Unexpected body2 format:', data.body2);
					// Handle error or set a default value
					setFormData({
						...data,
						body2: [
							{ label: "Thème", titles: [""] },
							{ label: "Première référence", titles: [""] },
							{ label: "Sommaire", titles: [""] },
							{ label: "Dernière référence", titles: [""] },
						],
					});
				}
			} catch (error) {
				console.error('Erreur lors de la récupération des données:', error);
			}finally {
				setisLoading(false); // Stop loading in all cases
			}
		};
		
		
        fetchData();
    }, [baseUrl, id]);

    const handleQuillChange = (value, name) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBody2Change = (labelIndex, titleIndex, e) => {
        const { value } = e.target;
        const newBody2 = [...formData.body2];
        newBody2[labelIndex].titles[titleIndex] = value;
        setFormData((prev) => ({ ...prev, body2: newBody2 }));
    };

    const addTitleField = (labelIndex) => {
        const newBody2 = [...formData.body2];
        newBody2[labelIndex].titles.push("");
        setFormData((prev) => ({ ...prev, body2: newBody2 }));
    };

    const removeTitleField = (labelIndex, titleIndex) => {
        const newBody2 = [...formData.body2];
        newBody2[labelIndex].titles.splice(titleIndex, 1);
        setFormData((prev) => ({ ...prev, body2: newBody2 }));
    };

    const handleAddLabel = () => {
        setFormData((prev) => ({
            ...prev,
            body2: [...prev.body2, { label: "Nouveau Label", titles: [""] }],
        }));
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
            const response = await axios.put(`${baseUrl}/form/form/${id}`, finalFormData, {
				headers: {
					Authorization: `Bearer ${token}`, // Include the token in the header
				},
			});
            console.log("Données du formulaire mises à jour:", response.data);
            alert("Formulaire mis à jour avec succès!");
            // Vous pouvez rediriger ou effectuer une autre action ici
        } catch (error) {
            console.error("Erreur lors de la mise à jour du formulaire:", error);
            alert("Erreur lors de la mise à jour du formulaire!");
        }finally {
			setLoading(false); // Stop loading in all cases
		}
    };
	const handleGoBack = () => {
		navigate(-1); // Go back to the previous page
	};
	const logout = useLogout();
	const handleLogout = () => {
		logout();
	};
	const handleClick = () => {
		navigate("/"); // Retour à l'accueil
	};

	if (_isloading)
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
            <Paper style={{ padding: "10px", borderRadius: "8px" }}>
                <Typography variant="h4" style={{ marginBottom: "16px" }}>
                    Éditeur de Formulaire
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" style={{ margin: "16px 0 8px" }}>
                                Guide Thématique
                            </Typography>
                            <ReactQuill
                                value={formData.body1}
                                onChange={(value) => handleQuillChange(value, "body1")}
                                style={{ height: "200px", marginBottom: '30px' }}
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

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddLabel}
                            style={{ marginTop: "16px" }}
                        >
                            Ajouter un label
                        </Button>

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

                        <Grid item xs={12}>
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
        </Box>
    );
};

export default FormEditor;
