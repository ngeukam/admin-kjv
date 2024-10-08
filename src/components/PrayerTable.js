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
    Toolbar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Pour les icônes FontAwesome
import useLogout from "../utils/logout";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";


const PrayerTable = () => {
	const [prayers, setPrayers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const navigate = useNavigate();
	const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const token = localStorage.getItem("token");
	useEffect(() => {
		fetchPrayers();
	}, []);

	const fetchPrayers = async () => {
		try {
			const response = await axios.get(`${baseUrl}/prayer/prayers`, {
                headers: {
					Authorization: `Bearer ${token}`, // Include the token in the header
				},
            }); // URL pour récupérer les prières
			setPrayers(response.data);
		} catch (error) {
			console.error("Error fetching prayers:", error);
		}
	};

	const handleDeletePrayer = async (id) => {
		const confirmDelete = window.confirm(
			"Voulez-vous vraiment supprimer cette prière ?"
		);
		if (confirmDelete) {
			try {
				await axios.delete(`${baseUrl}/prayer/delete-prayer/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the header
                    },
                }); // URL pour supprimer une prière
				fetchPrayers(); // Rafraîchir la liste après suppression
			} catch (error) {
				console.error("Error deleting prayer:", error);
			}
		}
	};

	const handleEditPrayer = (id) => {
		navigate(`/edit-prayer/${id}`); // Naviguer vers la page d'édition d'une prière
	};

	const handleAddPrayer = () => {
		navigate("/add-prayer"); // Naviguer vers la page d'ajout d'une prière
	};

	const handleHome = () => {
		navigate("/"); // Naviguer vers la page d'accueil
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const filteredPrayers = prayers.filter((prayer) => {
		const searchLower = searchTerm.toLowerCase();
		return (
			prayer.title.toLowerCase().includes(searchLower) ||
			prayer.author.toLowerCase().includes(searchLower) ||
			prayer.date.toLowerCase().includes(searchLower) ||
			prayer.description.toLowerCase().includes(searchLower)
		);
	});

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
							Liste des prières
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
			<TableContainer>
				<Button
					variant="contained"
					color="primary"
					onClick={handleAddPrayer}
					style={{ margin: "10px" }}
				>
					Ajouter une prière
				</Button>
				<Button
					variant="outlined"
					color="primary"
					onClick={handleHome}
					style={{ margin: "10px", }}
				>
					Dashboard
				</Button>
				<TextField
					label="Rechercher une prière"
					variant="outlined"
					fullWidth
					onChange={(e) => setSearchTerm(e.target.value)}
					style={{ marginBottom: "20px" }}
				/>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Titre</TableCell>
							<TableCell>Auteur</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredPrayers.length > 0 ? (
							filteredPrayers
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((prayer) => (
									<TableRow key={prayer._id}>
										<TableCell>{prayer.title}</TableCell>
										<TableCell>{prayer.author}</TableCell>
										<TableCell>{prayer.description}</TableCell>
										<TableCell>
											<IconButton
												color="primary"
												onClick={() => handleEditPrayer(prayer._id)}
											>
												<i className="fas fa-edit"></i>{" "}
												{/* Icône de modification */}
											</IconButton>
											<IconButton
												color="secondary"
												onClick={() => handleDeletePrayer(prayer._id)}
											>
												<i className="fas fa-trash-alt"></i>{" "}
												{/* Icône de suppression */}
											</IconButton>
										</TableCell>
									</TableRow>
								))
						) : (
							<TableRow>
								<TableCell colSpan={4} align="center">
									Aucune prière trouvée
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={filteredPrayers.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</TableContainer>
		</Box>
	);
};

export default PrayerTable;
