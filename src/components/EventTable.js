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
    Toolbar,
    AppBar,
    Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Pour les icônes FontAwesome
import useLogout from "../utils/logout";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";


const EventTable = () => {
	const [events, setEvents] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(0); // Gérer la page actuelle
	const [rowsPerPage, setRowsPerPage] = useState(5); // Gérer le nombre de lignes par page
	const navigate = useNavigate();
	const baseUrl = process.env.REACT_APP_API_BASE_URL;

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		try {
            const token = localStorage.getItem("token");
			const response = await axios.get(`${baseUrl}/event/events`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the header
                },
            }); // Remplacez par votre URL d'API
			setEvents(response.data);
		} catch (error) {
			console.error("Error fetching events:", error);
		}
	};

	const handleDeleteEvent = async (id) => {
        const token = localStorage.getItem("token");
		const confirmDelete = window.confirm(
			"Voulez-vous vraiment supprimer cet événement ?"
		);
		if (confirmDelete) {
			try {
				await axios.delete(`${baseUrl}/event/delete-event/${id}`, {
                    headers: {
						Authorization: `Bearer ${token}`, // Include the token in the header
					},
                }); // Remplacez par votre URL d'API pour la suppression
				fetchEvents(); // Rafraîchir la liste des événements après la suppression
			} catch (error) {
				console.error("Error deleting event:", error);
			}
		}
	};

	const handleEditEvent = (id) => {
		navigate(`/edit-event/${id}`); // Naviguer vers la page d'édition
	};

	const handleAddEvent = () => {
		navigate("/add-event"); // Naviguer vers la page d'ajout
	};

	const handleHome = () => {
		navigate("/"); // Naviguer vers la page d'accueil
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0); // Revenir à la première page
	};

	const filteredEvents = events.filter((event) => {
		const searchLower = searchTerm.toLowerCase();
		return (
			event.title.toLowerCase().includes(searchLower) ||
			event.date.toLowerCase().includes(searchLower) ||
			event.description.toLowerCase().includes(searchLower)
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
							Liste des événements
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
					onClick={handleAddEvent}
					style={{ margin: "10px" }}
				>
					Ajouter un événement
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
					label="Rechercher un événement"
					variant="outlined"
					fullWidth
					onChange={(e) => setSearchTerm(e.target.value)}
					style={{ marginBottom: "20px" }}
				/>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Titre</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredEvents.length > 0 ? (
							filteredEvents
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Logique de pagination
								.map((event) => (
									<TableRow key={event._id}>
										<TableCell>{event.title}</TableCell>
										<TableCell>{event.date}</TableCell>
										<TableCell>{event.description}</TableCell>
										<TableCell>
											<IconButton
												color="primary"
												onClick={() => handleEditEvent(event._id)}
											>
												<i className="fas fa-edit"></i>{" "}
												{/* Icône de modification */}
											</IconButton>
											<IconButton
												color="secondary"
												onClick={() => handleDeleteEvent(event._id)}
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
									Aucun événement trouvé
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={filteredEvents.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</TableContainer>
		</Box>
	);
};

export default EventTable;
