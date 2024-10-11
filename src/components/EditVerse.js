import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
	TextField,
	Button,
	Typography,
	Box,
	Autocomplete,
	Toolbar,
	AppBar,
	Grid,
} from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import useLogout from "../utils/logout";

const EditVerse = () => {
	const { id } = useParams(); // Get the verse ID from the URL
	const navigate = useNavigate(); // Use navigate for redirection
	const baseUrl = process.env.REACT_APP_API_BASE_URL;
	const [verse, setVerse] = useState({
		book: "",
		chapter: "",
		verse: "",
		text: "",
	});
	const [loading, setLoading] = useState(false);
	const bookOptions = [
		{ label: "Genèse" },
		{ label: "Exode" },
		{ label: "Lévitique" },
		{ label: "Nombres" },
		{ label: "Deutéronome" },
		{ label: "Josué" },
		{ label: "Juges" },
		{ label: "Ruth" },
		{ label: "1 Samuel" },
		{ label: "2 Samuel" },
		{ label: "1 Rois" },
		{ label: "2 Rois" },
		{ label: "1 Chroniques" },
		{ label: "2 Chroniques" },
		{ label: "Esdras" },
		{ label: "Néhémie" },
		{ label: "Esther" },
		{ label: "Job" },
		{ label: "Psaumes" },
		{ label: "Proverbes" },
		{ label: "Ecclésiaste" },
		{ label: "Cantique des Cantiques" },
		{ label: "Ésaïe" },
		{ label: "Jérémie" },
		{ label: "Lamentations" },
		{ label: "Ézéchiel" },
		{ label: "Daniel" },
		{ label: "Osée" },
		{ label: "Joël" },
		{ label: "Amos" },
		{ label: "Abdias" },
		{ label: "Jonas" },
		{ label: "Michée" },
		{ label: "Nahum" },
		{ label: "Habacuc" },
		{ label: "Sophonie" },
		{ label: "Aggée" },
		{ label: "Zacharie" },
		{ label: "Malachie" },
	];
	useEffect(() => {
		const fetchVerse = async () => {
			try {
				const token = localStorage.getItem("token");
				// Fetch the verse by ID
				const response = await axios.get(`${baseUrl}/bls/retrieve-verse`, {
					params: {
						_id: id,
					},
					headers: {
						Authorization: `Bearer ${token}`, // Include the token in the header
					},
					// Pass the query parameters if needed
				});
				setVerse(response.data[0]); // Assuming you get an array, take the first element
			} catch (error) {
				console.error("Error fetching verse:", error);
			}
		};

		fetchVerse(); // Call the function to fetch the verse data
	}, [id]); // Depend on ID, fetch verse when component mounts

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVerse({ ...verse, [name]: value }); // Update state with input values
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		const token = localStorage.getItem("token");
		e.preventDefault();
		try {
			// Send a PUT request to update the verse
			await axios.put(`${baseUrl}/bls/update-verse/${id}`, verse, {
				headers: {
					Authorization: `Bearer ${token}`, // Include the token in the header
				},
			});
			toast.success("Verset modifié avec succès !");
			//navigate("/versetable"); // Redirect to the main page after updating
		} catch (error) {
			console.error("Error updating verse:", error);
		}finally {
			setLoading(false); // Arrête le chargement dans tous les cas
		}
	};
	const handleGoBack = () => {
		navigate(-1); // Go back to the previous page
	};
	const handleClick = () => {
		navigate("/");
	};
	return (
		<Box>
			<Box sx={{ marginBottom: 2 }}>
				<AppBar position="static">
					<Toolbar sx={{ justifyContent: "space-between" }}>
						<Typography
							variant="h6"
							sx={{ flexGrow: 1 }}
							onClick={handleClick}
							style={{ cursor: "pointer" }}
						>
							Admin Panel
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
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				style={{ marginTop: "20px" }}
			>
				<Box
					sx={{
						padding: "10px",
						width: "500px", // Defined width
						borderRadius: "8px",
						boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
					}}
				>
					<ToastContainer
						position="top-right" // You can adjust the position
						autoClose={3000} // Duration before the toast disappears
						hideProgressBar={false} // Show progress bar
						newestOnTop={false} // New toasts appear on top
						closeOnClick // Close toast on click
						rtl={false} // Right to left
						pauseOnFocusLoss // Pause when the window is not focused
						draggable // Enable dragging
						pauseOnHover // Pause when hovering
					/>
					<form onSubmit={handleSubmit}>
						<Typography
							variant="h4"
							style={{ marginBottom: "16px", textAlign: "center" }}
						>
							Ancien testament: Modifier le verset
						</Typography>
						<Box sx={{ marginBottom: 2 }}>
							<Autocomplete
								options={bookOptions}
								value={verse.book}
								onChange={(event, newValue) =>
									setVerse({ ...verse, book: newValue })
								}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Livre"
										placeholder="Sélectionner un livre"
										fullWidth
									/>
								)}
							/>
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<TextField
								label="Chapitre"
								name="chapter"
								value={verse.chapter}
								onChange={handleChange}
								fullWidth
								required
							/>
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<TextField
								label="Verset"
								name="verse"
								value={verse.verse}
								onChange={handleChange}
								fullWidth
								required
							/>
						</Box>
						<Box sx={{ marginBottom: 2 }}>
							<TextField
								label="Texte"
								name="text"
								value={verse.text}
								onChange={handleChange}
								fullWidth
								required
								multiline
								rows={4}
							/>
						</Box>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							sx={{ mb: { xs: 1, sm: 0 } }}
							disabled={loading}
						>
							{loading ? "Modification..." : "Modifier"}
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
			</Grid>
		</Box>
	);
};

export default EditVerse;
