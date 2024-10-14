import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddEmployee from '../Admin/Employees/AddEmployee'; // Adjust path as necessary
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4001/employees";

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
    console.error("Error fetching data:", error);
    throw error;
  }
};

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const [toggleView, setToggleView] = useState('table'); // New state for toggle view
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees().then(data => {
      setEmployees(data);
    }).catch(error => {
      console.error("Error fetching employees:", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/employee/${id}`);
  };

  const deleteEmployee = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmed) {
      return;
    }

    try {
      const response = await axios.delete(`${URL}/${id}`);
      if (response.status === 200) {
        setEmployees(prev => prev.filter(employee => employee._id !== id));
      }
    } catch (error) {
      console.error("Error deleting employee:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Details Report", 10, 10);
    doc.autoTable({
      head: [['ID', 'Name', 'Email', 'Position', 'Phone', 'Address']],
      body: employees.map(employee => [employee.EMPID, employee.name, employee.email, employee.position, employee.phone, employee.address]),
      startY: 20,
      margin: { top: 20 },
      styles: {
        overflow: 'linebreak',
        fontSize: 10,
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
      },
    });

    doc.save('employee-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchEmployees().then(data => {
        setEmployees(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching employees:", error);
      });
      return;
    }

    const filteredEmployees = employees.filter(employee =>
      Object.values(employee).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setEmployees(filteredEmployees);
    setNoResults(filteredEmployees.length === 0);
  };

  const handleAddEmployee = () => {
    setShowAddEmployeeForm(true);
  };

  const handleBack = () => {
    setShowAddEmployeeForm(false);
  };

  const switchToAnalysisView = () => {
    setToggleView('analysis');
  };

  const switchToTableView = () => {
    setToggleView('table');
  };

  // Employee analysis summary
  const renderAnalysisView = () => {
    const totalEmployees = employees.length;
    const employeesByRole = employees.reduce((acc, employee) => {
      acc[employee.position] = (acc[employee.position] || 0) + 1;
      return acc;
    }, {});

    return (
      <Box>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Employee Analysis Summary</Typography>
        <Typography>Total Employees: {totalEmployees}</Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }}>Employees by Role</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>Number of Employees</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(employeesByRole).map((role) => (
                <TableRow key={role}>
                  <TableCell>{role}</TableCell>
                  <TableCell>{employeesByRole[role]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5' }}>
      {showAddEmployeeForm ? (
        <Box>
          <AddEmployee onBack={handleBack} />
        </Box>
      ) : (
        <>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>Employees</Typography>

          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center' }}>
            <TextField
              label="Search Employees"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flexShrink: 1,
                width: '250px',
                backgroundColor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.300',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ borderRadius: 2 }}
            >
              Search
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#FFC107', color: 'black', borderRadius: 2, marginLeft: 'auto' }}
              onClick={handleAddEmployee}
              startIcon={<Add />}
            >
              Register Employees
            </Button>
            <Button
              variant="outlined"
              sx={{ marginLeft: 2, borderRadius: 2 }}
              onClick={toggleView === 'table' ? switchToAnalysisView : switchToTableView}
            >
              {toggleView === 'table' ? 'Switch to Analysis View' : 'Switch to Table View'}
            </Button>
          </Box>

          <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
            {toggleView === 'table' ? (
              <>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  All Employees
                </Typography>
                <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Position</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {employees.map((employee) => (
                        <TableRow key={employee._id}>
                          <TableCell>{employee.EMPID}</TableCell>
                          <TableCell>{employee.name}</TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell>{employee.phone}</TableCell>
                          <TableCell>{employee.address}</TableCell>
                          <TableCell>
                            <Button variant="outlined" onClick={() => handleEdit(employee._id)} sx={{ marginRight: 1 }}>
                              Edit
                            </Button>
                            <Button variant="outlined" color="error" onClick={() => deleteEmployee(employee._id)}>
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              renderAnalysisView()
            )}
          </Box>

          {noResults && (
            <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
              No results found.
            </Typography>
          )}

          <Button variant="contained" onClick={handlePDF} sx={{ marginTop: 2 }}>
            Generate PDF Report
          </Button>
        </>
      )}
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
