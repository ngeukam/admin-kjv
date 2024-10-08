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
	AppBar
} from "@mui/material";
import useLogout from "../utils/logout";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const EditVerse_n = () => {
	const { id } = useParams(); // Get the verse ID from the URL
	const navigate = useNavigate(); // Use navigate for redirection
	const baseUrl = process.env.REACT_APP_API_BASE_URL;
	const [verse, setVerse] = useState({
		book: "",
		chapter: "",
		verse: "",
		text: "",
	});
	const bookOptions = [
		"Genèse",
		"Exode",
		"Lévitique",
		"Nombres",
		"Deutéronome",
		"Josué",
		"Juges",
		"Ruth",
		"1 Samuel",
		"2 Samuel",
		"1 Rois",
		"2 Rois",
		"1 Chroniques",
		"2 Chroniques",
		"Esdras",
		"Néhémie",
		"Esther",
		"Job",
		"Psaumes",
		"Proverbes",
		"Ecclésiaste",
		"Cantique des cantiques",
		"Ésaïe",
		"Jérémie",
		"Lamentations",
		"Ézéchiel",
		"Daniel",
		"Osée",
		"Joël",
		"Amos",
		"Abdias",
		"Jonas",
		"Michée",
		"Nahum",
		"Habacuc",
		"Sophonie",
		"Aggée",
		"Zacharie",
		"Malachie",
		"Matthieu",
		"Marc",
		"Luc",
		"Jean",
		"Actes",
		"Romains",
		"1 Corinthiens",
		"2 Corinthiens",
		"Galates",
		"Éphésiens",
		"Philippiens",
		"Colossiens",
		"1 Thessaloniciens",
		"2 Thessaloniciens",
		"1 Timothée",
		"2 Timothée",
		"Tite",
		"Philémon",
		"Hébreux",
		"Jacques",
		"1 Pierre",
		"2 Pierre",
		"1 Jean",
		"2 Jean",
		"3 Jean",
		"Jude",
		"Apocalypse",
	];
	useEffect(() => {
		const fetchVerse = async () => {
			try {
				// Fetch the verse by ID
				const token = localStorage.getItem("token");
				const response = await axios.get(`${baseUrl}/newbls/retrieve-verse`, {
					params: {
						_id: id,
					},
					headers: {
						Authorization: `Bearer ${token}`, // Include the token in the header
					}, // Pass the query parameters if needed
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
		const token = localStorage.getItem("token");
		e.preventDefault();
		try {
			// Send a PUT request to update the verse
			await axios.put(`${baseUrl}/newbls/update-verse/${id}`, verse, {
				headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the header
                },
			});
			toast.success("Verset modifié avec succès !");
			//navigate("/versetable"); // Redirect to the main page after updating
		} catch (error) {
			console.error("Error updating verse:", error);
		}
	};
	const handleGoBack = () => {
		navigate(-1); // Go back to the previous page
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
							Nouveau testament: Modifier le verset
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

export default EditVerse_n;
