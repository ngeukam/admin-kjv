import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	TextField,
	Button,
	Box,
	Typography,
	Autocomplete,
	AppBar,
	Toolbar
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLogout from "../utils/logout";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const AddVerse_n = () => {
	const navigate = useNavigate();
	const [book, setBook] = useState(null);
	const [chapter, setChapter] = useState("");
	const [verse, setVerse] = useState("");
	const [text, setText] = useState("");
	const [message, setMessage] = useState("");
	const baseUrl = process.env.REACT_APP_API_BASE_URL;
	const token = localStorage.getItem("token");
	// List of French Bible books for the dropdown
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
		{ label: "Matthieu" },
		{ label: "Marc" },
		{ label: "Luc" },
		{ label: "Jean" },
		{ label: "Actes" },
		{ label: "Romains" },
		{ label: "1 Corinthiens" },
		{ label: "2 Corinthiens" },
		{ label: "Galates" },
		{ label: "Éphésiens" },
		{ label: "Philippiens" },
		{ label: "Colossiens" },
		{ label: "1 Thessaloniciens" },
		{ label: "2 Thessaloniciens" },
		{ label: "1 Timothée" },
		{ label: "2 Timothée" },
		{ label: "Tite" },
		{ label: "Philémon" },
		{ label: "Hébreux" },
		{ label: "Jacques" },
		{ label: "1 Pierre" },
		{ label: "2 Pierre" },
		{ label: "1 Jean" },
		{ label: "2 Jean" },
		{ label: "3 Jean" },
		{ label: "Jude" },
		{ label: "Apocalypse" },
	];

	const handleGoToVerseTable = () => {
		navigate("/nbls-versetable");
	};
	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		// Validation to check if all fields are filled
		if (!book || !chapter || !verse || !text) {
			setMessage("Veuillez remplir tous les champs.");
			return;
		}

		try {
			const response = await axios.post(`${baseUrl}/newbls/create-verse`, {
				book: book.label, // Use label from Autocomplete
				chapter,
				verse,
				text,
			},{
				headers: {
					Authorization: `Bearer ${token}`, // Include the token in the header
				},
			});

			if (response.status === 201) {
				setMessage("");
				toast.success("Le verset a été enregistré avec succès !");
				setBook(null);
				setChapter("");
				setVerse("");
				setText("");
			} else {
				setMessage("Erreur lors de l'enregistrement du verset.");
			}
		} catch (error) {
			if (error.response.data.message === "This verse already exists.") {
				setMessage("Ce verset existe déjà!");
			} else {
				setMessage("Erreur lors de l'enregistrement. Réessayer plu tard.");
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
							Nouveau testament: Ajouter un verset
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
							value={book}
							onChange={(event, newValue) => setBook(newValue)}
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
							type="number"
							label="Chapitre"
							value={chapter}
							onChange={(e) => setChapter(e.target.value)}
							placeholder="Chapitre"
							fullWidth
						/>
					</Box>

					<Box sx={{ marginBottom: 2 }}>
						<TextField
							type="number"
							label="Verset"
							value={verse}
							onChange={(e) => setVerse(e.target.value)}
							placeholder="Verset"
							fullWidth
						/>
					</Box>

					<Box sx={{ marginBottom: 2 }}>
						<TextField
							label="Texte"
							value={text}
							onChange={(e) => setText(e.target.value)}
							placeholder="Texte du verset"
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
							onClick={handleGoToVerseTable}
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

export default AddVerse_n;
