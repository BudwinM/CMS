import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Avatar, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Edit, Delete, Add, TableView, BarChart as BarChartIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddSupplier from '../Admin/Suppliers/AddSupplier';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import html2canvas from 'html2canvas';

const URL = "http://localhost:4001/suppliers";

const fetchSuppliers = async () => {
    try {
        const response = await axios.get(URL);
        return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

function SupplierList() {
    const [suppliers, setSuppliers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [showAddSupplierForm, setShowAddSupplierForm] = useState(false);
    const [viewMode, setViewMode] = useState('table'); // state for toggling between table and chart view
    const navigate = useNavigate();
    const chartRef = useRef(null); // Ref for capturing the chart as an image

    useEffect(() => {
        fetchSuppliers().then(data => {
            setSuppliers(data);
            setNoResults(false);
        }).catch(error => {
            console.error("Error fetching suppliers:", error);
        });
    }, []);

    const handleEdit = (id) => {
        navigate(`/suppliers/${id}`);
    };

    const deleteSupplier = async (id) => {
        if (window.confirm("Are you sure you want to delete this supplier?")) {
            try {
                console.log(`Attempting to delete supplier with ID: ${id}`);
                const response = await axios.delete(`${URL}/${id}`);

                if (response.status === 200) {
                    setSuppliers(prev => prev.filter(item => item._id !== id));
                }
            } catch (error) {
                console.error("Error deleting supplier:", error);
            }
        }
    };

    const handlePDF = () => {
        const doc = new jsPDF();
        doc.text("Supplier Details Report", 10, 10);
        doc.autoTable({
            head: [['Name', 'Email', 'Quality', 'Phone']],
            body: suppliers.map(item => [
                item.name, item.email, item.quality, item.phone
            ]),
            startY: 20,
        });
        doc.save('supplier-details.pdf');
    };

    const handleAddSupplier = () => {
        setShowAddSupplierForm(true);
    };

    const handleBack = () => {
        setShowAddSupplierForm(false);
    };

    const toggleView = () => {
        setViewMode(viewMode === 'table' ? 'chart' : 'table');
    };

    const generateDocument = async () => {
        const doc = new jsPDF();
        doc.text("Supplier Analysis Report", 10, 10);

        // Capture the chart as an image
        const canvas = await html2canvas(chartRef.current);
        const chartImage = canvas.toDataURL('image/png');
        doc.addImage(chartImage, 'PNG', 10, 20, 180, 80); // Adjust positioning and size

        // Add table of suppliers
        doc.autoTable({
            head: [['Name', 'Email', 'Quality', 'Phone']],
            body: suppliers.map(item => [
                item.name, item.email, item.quality, item.phone
            ]),
            startY: 110, // Positioning after the chart
        });

        // Save the document
        doc.save('supplier-analysis-report.pdf');
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <Box sx={{ width: 240, backgroundColor: '#1C1C1C', color: '#FFF', minHeight: '100vh', paddingTop: 2 }}>
                <Typography variant="h6" sx={{ paddingLeft: 2 }}>Budwin Mendis</Typography>
                <Typography variant="subtitle2" sx={{ paddingLeft: 2 }}>Supplier Manager</Typography>
                <Box sx={{ paddingTop: 4 }}>
                    <Button
                        component={Link}
                        to="/SupplierDashboard"
                        startIcon={<DashboardIcon />}
                        fullWidth
                        sx={{ justifyContent: 'flex-start', color: '#FFF' }}
                    >
                        Dashboard
                    </Button>
                    <Button
                        component={Link}
                        to="/suppliers"
                        startIcon={<PeopleIcon />}
                        fullWidth
                        sx={{ justifyContent: 'flex-start', color: '#FFF' }}
                    >
                        Suppliers
                    </Button>
                    <Button
                        component={Link}
                        to="/quotation"
                        startIcon={<DescriptionIcon />}
                        fullWidth
                        sx={{ justifyContent: 'flex-start', color: '#FFF' }}
                    >
                        Quotation
                    </Button>
                    <Button
                        component={Link}
                        to="/supplier-quality"
                        startIcon={<AssessmentIcon />}
                        fullWidth
                        sx={{ justifyContent: 'flex-start', color: '#FFF' }}
                    >
                        Supplier Quality
                    </Button>
                    <Button
                        component={Link}
                        to="/inventory-requests"
                        startIcon={<InventoryIcon />}
                        fullWidth
                        sx={{ justifyContent: 'flex-start', color: '#FFF' }}
                    >
                        Inventory Requests
                    </Button>
                    {/* Add more navigation buttons if necessary */}
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flex: 1, padding: 4, backgroundColor: '#F5F6FA' }}>
                {showAddSupplierForm ? (
                    <AddSupplier onBack={handleBack} />
                ) : (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                            <TextField
                                label="Search Supplier"
                                variant="outlined"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                sx={{ backgroundColor: 'white', borderRadius: 1, width: '300px' }}
                            />
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#FEC304', color: 'white' }}
                                onClick={handlePDF}
                                startIcon={<DescriptionIcon />}
                            >
                                Download Supplier Report
                            </Button>

                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#FEC304', color: 'white' }}
                                onClick={handleAddSupplier}
                                startIcon={<Add />}
                            >
                                Register Supplier
                            </Button>

                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#000', color: '#FFF' }}
                                onClick={toggleView}
                                startIcon={viewMode === 'table' ? <BarChartIcon /> : <TableView />}
                            >
                                {viewMode === 'table' ? 'Chart View' : 'Table View'}
                            </Button>
                        </Box>

                        {viewMode === 'table' ? (
                            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Quality</TableCell>
                                            <TableCell>Phone</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {noResults ? (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center">No suppliers found.</TableCell>
                                            </TableRow>
                                        ) : (
                                            suppliers.map((item) => (
                                                <TableRow key={item._id}>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar alt={item.name} src={item.avatar} sx={{ marginRight: 2 }} />
                                                            {item.name}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>{item.email}</TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Box sx={{ width: 100, height: 10, backgroundColor: '#000', marginRight: 1 }}>
                                                                <Box sx={{ width: `${item.quality}%`, height: '100%', backgroundColor: '#FEC304' }} />
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>{item.phone}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="contained"
                                                            sx={{ backgroundColor: '#FFC107', color: 'black', marginRight: 1 }}
                                                            onClick={() => handleEdit(item._id)} // Use item._id here
                                                        >
                                                            Details
                                                        </Button>
                                                        <Button sx={{ backgroundColor: '#000', color: 'white' }} onClick={() => deleteSupplier(item._id)}>Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Box sx={{ height: 400 }} ref={chartRef}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={suppliers}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="quality" fill="#FEC304" />
                                    </BarChart>
                                </ResponsiveContainer>
                                {/* Button to generate PDF document */}
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#FEC304', color: 'black', marginTop: 2 }}
                                    onClick={generateDocument}
                                >
                                    Download Chart and Supplier Report
                                </Button>
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}

export default SupplierList;
