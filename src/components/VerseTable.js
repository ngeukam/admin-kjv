import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
	Typography,
	TextField,
	TablePagination,
	Button,
	Box,
	AppBar,
	Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Pour la navigation
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Pour les icônes FontAwesome
import useLogout from "../utils/logout";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const VerseTable = () => {
	const [verses, setVerses] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(0); // Gérer la page actuelle
	const [rowsPerPage, setRowsPerPage] = useState(5); // Gérer le nombre de lignes par page
	const navigate = useNavigate(); // Utilisez useNavigate pour la navigation
	const baseUrl = process.env.REACT_APP_API_BASE_URL;
	const token = localStorage.getItem("token");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchVerses();
	}, []);
	const bookOrder = [
	"Genèse", "Exode", "Lévitique", "Nombres", "Deutéronome", "Josué", "Juges",
    "Ruth", "1 Samuel", "2 Samuel", "1 Rois", "2 Rois", "1 Chroniques",
    "2 Chroniques", "Esdras", "Néhémie", "Esther", "Job", "Psaumes",
    "Proverbes", "Ecclésiaste", "Cantique des Cantiques", "Ésaïe", "Jérémie",
    "Lamentations", "Ézéchiel", "Daniel", "Osée", "Joël", "Amos", "Abdias",
    "Jonas", "Michée", "Nahum", "Habacuc", "Sophonie", "Aggée", "Zacharie",
    "Malachie", "Matthieu", "Marc", "Luc", "Jean", "Actes", "Romains",
    "1 Corinthiens", "2 Corinthiens", "Galates", "Éphésiens", "Philippiens",
    "Colossiens", "1 Thessaloniciens", "2 Thessaloniciens", "1 Timothée",
    "2 Timothée", "Tite", "Philémon", "Hébreux", "Jacques", "1 Pierre",
    "2 Pierre", "1 Jean", "2 Jean", "3 Jean", "Jude", "Apocalypse",
	]
	const fetchVerses = async () => {
		try {
			const response = await axios.get(`${baseUrl}/bls/retrieve-verse`, {
				headers: {
					Authorization: `Bearer ${token}`, // Include the token in the header
				},
			});

			const sortedVerses = response.data.sort((a, b) => {
				const bookIndexA = bookOrder.indexOf(a.book);
				const bookIndexB = bookOrder.indexOf(b.book);
	
				if (bookIndexA === bookIndexB) {
					if (a.chapter === b.chapter) {
						return a.verse - b.verse; // Trie par verset
					}
					return a.chapter - b.chapter; // Trie par chapitre
				}
				return bookIndexA - bookIndexB; // Trie par livre
			});

			setVerses(sortedVerses);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				setVerses([]);
			}
			console.error("Error fetching verses:", error);
		}
	};

	const handleDeleteVerse = async (id) => {
		const confirmDelete = window.confirm(
			"Voulez-vous vraiment supprimer ce verset ?"
		);
		if (confirmDelete) {
			setLoading(true);
			try {
				await axios.delete(`${baseUrl}/bls/delete-verse/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`, // Include the token in the header
					},
				});
				fetchVerses(); // Store fetched verses
			} catch (error) {
				console.error("Error deleting verse:", error);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleEditVerse = (id) => {
		navigate(`/edit-verse/${id}`);
	};

	const handleAddVerse = () => {
		navigate("/add-verse");
	};

	const handleHome = () => {
		navigate("/");
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0); // Revenir à la première page
	};

	const filteredVerses = verses.filter((verse) => {
		const searchLower = searchTerm.toLowerCase();
		return (
			verse.book.toLowerCase().includes(searchLower) ||
			verse.chapter.toString().includes(searchLower) ||
			verse.verse.toString().includes(searchLower) ||
			verse.text.toLowerCase().includes(searchLower)
		);
	});
	const handleClick = () => {
		navigate("/");
	};
	const logout = useLogout();
	const handleLogout = () => {
		logout();
	};
	if (loading)
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
								onClick={handleLogout}
								sx={{ marginLeft: "auto" }}
							>
								<PowerSettingsNewIcon />
							</Button>
						</Toolbar>
					</AppBar>
				</Box>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh", // Prend toute la hauteur de la fenêtre
						textAlign: "center",
					}}
				>
					<h2>Suppression en cours...</h2>
				</div>
			</Box>
		);

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
							onClick={handleLogout}
							sx={{ marginLeft: "auto" }}
						>
							<PowerSettingsNewIcon />
						</Button>
					</Toolbar>
				</AppBar>
			</Box>
			<TableContainer>
				<Button
					variant="contained"
					color="primary"
					onClick={handleAddVerse}
					style={{ margin: "10px" }}
				>
					Ancien testament: Ajouter un verset
				</Button>
				<Button
					variant="outlined"
					color="primary"
					onClick={handleHome}
					style={{ margin: "10px" }}
				>
					Dashboard
				</Button>
				<TextField
					label="Rechercher un verset"
					variant="outlined"
					fullWidth
					onChange={(e) => setSearchTerm(e.target.value)}
					style={{ marginBottom: "20px" }}
				/>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Livre</TableCell>
							<TableCell>Chapitre</TableCell>
							<TableCell>Verset</TableCell>
							<TableCell>Texte</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredVerses.length > 0 ? (
							filteredVerses
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Pagination logic
								.map((verse) => (
									<TableRow key={verse._id}>
										<TableCell>{verse.book}</TableCell>
										<TableCell>{verse.chapter}</TableCell>
										<TableCell>{verse.verse}</TableCell>
										<TableCell>{verse.text}</TableCell>
										<TableCell>
											<IconButton
												color="primary"
												onClick={() => handleEditVerse(verse._id)}
											>
												<i className="fas fa-edit"></i>{" "}
												{/* Icone de modification */}
											</IconButton>
											<IconButton
												color="secondary"
												onClick={() => handleDeleteVerse(verse._id)}
											>
												<i className="fas fa-trash-alt"></i>{" "}
												{/* Icone de suppression */}
											</IconButton>
										</TableCell>
									</TableRow>
								))
						) : (
							<TableRow>
								<TableCell colSpan={5} align="center">
									Aucun verset trouvé
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={filteredVerses.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</TableContainer>
		</Box>
	);
};

export default VerseTable;
