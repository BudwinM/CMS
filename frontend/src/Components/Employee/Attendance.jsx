import React, { useState, useEffect } from 'react';
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';

const URL = "http://localhost:4001/employees";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function Sidebar() {
    return (
      <Box sx={{ width: 240, backgroundColor: '#1C1C1C', color: '#FFF', minHeight: '100vh', paddingTop: 2 }}>
        <Typography variant="h6" sx={{ paddingLeft: 2 }}>Hiruna Kithsandu</Typography>
        <Typography variant="subtitle2" sx={{ paddingLeft: 2 }}>Employee Manager</Typography>
        <Box sx={{ paddingTop: 4 }}>
          <Button component={Link} to="/EmployeeDashboard" startIcon={<DashboardIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
            Dashboard
          </Button>
          <Button component={Link} to="/EmployeeList" startIcon={<PeopleIcon />} fullWidth sx={{ justifyContent: 'flex-start', backgroundColor: '#FBBF24', color: '#FFF' }}>
            Employees
          </Button>
          <Button component={Link} to="/attendance" startIcon={<ListAltIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
            Attendance
          </Button>
          <Button component={Link} to="/project-requests" startIcon={<InventoryIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
            Project Requests
          </Button>
          <Button component={Link} to="/" startIcon={<LogoutIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
            Logout
          </Button>
        </Box>
      </Box>
    );
}

const fetchEmployees = async () => {
    try {
        const response = await axios.get(URL);
        return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees().then((data) => {
            const initialAttendance = {};
            data.forEach((employee) => {
                initialAttendance[employee._id] = false; // Default to 'absent' (false)
            });
            setAttendance(initialAttendance); // Initialize attendance state
            setEmployees(data);
        }).catch((error) => {
            console.error('Error fetching employees:', error);
        });
    }, []);

    const handleMarkAttendance = (id) => {
        setAttendance((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Toggle attendance status (present/absent)
        }));
    };

    const presentCount = Object.values(attendance).filter((status) => status).length;
    const absentCount = employees.length - presentCount;

    const data = {
        labels: ['Present', 'Absent'],
        datasets: [
            {
                data: [presentCount, absentCount],
                backgroundColor: ['#3b82f6', '#ef4444'],
            },
        ],
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ['Name', 'Email', 'Position', 'Phone', 'Attendance'];
        const tableRows = [];

        employees.forEach((employee) => {
            const employeeData = [
                employee.name,
                employee.email,
                employee.position,
                employee.phone,
                attendance[employee._id] ? 'Present' : 'Absent',
            ];
            tableRows.push(employeeData);
        });

        doc.text('Employee Attendance Report', 14, 15);
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });
        doc.save('attendance_report.pdf');
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={3}>
                {/* Employee Table Section (8/12 columns) */}
                <Grid item xs={12} md={8}>
                    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1, boxShadow: 3 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                            Attendance List
                        </Typography>
                        <Button variant="contained" color="primary" onClick={downloadPDF}>
                            Download PDF
                        </Button>
                        <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider', mt: 2 }}>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                                    <TableRow>
                                        <TableCell><strong>Name</strong></TableCell>
                                        <TableCell><strong>Email</strong></TableCell>
                                        <TableCell><strong>Job Role</strong></TableCell>
                                        <TableCell><strong>Phone</strong></TableCell>
                                        <TableCell><strong>Attendance</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {employees.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">No employees found.</TableCell>
                                        </TableRow>
                                    ) : (
                                        employees.map((employee) => (
                                            <TableRow key={employee._id}>
                                                <TableCell>{employee.name}</TableCell>
                                                <TableCell>{employee.email}</TableCell>
                                                <TableCell>{employee.position}</TableCell>
                                                <TableCell>{employee.phone}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color={attendance[employee._id] ? 'success' : 'error'}
                                                        onClick={() => handleMarkAttendance(employee._id)}
                                                    >
                                                        {attendance[employee._id] ? 'Present' : 'Absent'}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>

                {/* Attendance Summary Section (4/12 columns) */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Total Attendance
                        </Typography>
                        <Pie data={data} />
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
                            <Typography variant="body1" sx={{ color: '#3b82f6' }}>
                                Present: {((presentCount / employees.length) * 100).toFixed(2)}%
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#ef4444' }}>
                                Absent: {((absentCount / employees.length) * 100).toFixed(2)}%
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

function EmployeeManagementPage() {
    return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flex: 1, padding: 3 }}>
          <EmployeeList />
        </Box>
      </Box>
    );
}

export default EmployeeManagementPage;
