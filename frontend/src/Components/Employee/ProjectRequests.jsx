import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => (
  <Box sx={{ width: 240, backgroundColor: '#1C1C1C', color: '#FFF', minHeight: '100vh', paddingTop: 2 }}>
    <Typography variant="h6" sx={{ paddingLeft: 2 }}>Hiruna Kithsadu</Typography>
    <Typography variant="subtitle2" sx={{ paddingLeft: 2 }}>Employee management</Typography>
    <Box sx={{ paddingTop: 4 }}>
      <Button component={Link} to="/EmployeeDashboard" startIcon={<DashboardIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
        Dashboard
      </Button>
      <Button component={Link} to="/EmployeeList" startIcon={<PeopleIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
        Employees
      </Button>
      <Button component={Link} to="/attendance" startIcon={<ListAltIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
        Attendance
      </Button>
      <Button component={Link} to="/project-requests" startIcon={<InventoryIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF', backgroundColor: '#FBBF24' }}>
        Project Requests
      </Button>
          <Button component={Link} to="/" startIcon={<LogoutIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
            Logout
          </Button>
    </Box>
  </Box>
);

const ProjectRequests = () => {
  const [projects, setProjects] = useState([
    { id: 1, emptype: "Manager", empcnt: 10, name: "House Colombo", status: "COMPLETE" },
    { id: 3, emptype: "Manager", empcnt: 10, name: "Lanka Hospitals", status: "PENDING" },
    { id: 5, emptype: "Manager", empcnt: 10, name: "Villa", status: "COMPLETE" },
  ]);

  const [newProject, setNewProject] = useState({ name: '', status: 'PENDING', emptype: '', empcnt: '' });
  const [editingProject, setEditingProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Adding a Project
  const handleAddProject = () => {
    if (!newProject.name.trim()) {
      alert('Project name cannot be empty.');
      return;
    }

    const newId = projects.length > 0 ? projects[projects.length - 1].id + 1 : 1;
    setProjects([...projects, { id: newId, ...newProject }]);
    setNewProject({ name: '', status: 'PENDING', emptype: '', empcnt: 0 });
  };

  // Handle Deleting a Project
  const handleDelete = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  // Handle Assign and Decline actions
  const handleAssign = (projectId) => {
    setProjects(projects.map(project =>
      project.id === projectId
        ? { ...project, status: 'COMPLETE', empcnt: project.empcnt + 1 }
        : project
    ));
  };


  const handleDecline = (projectId) => {
    setProjects(projects.map(project =>
      project.id === projectId ? { ...project, status: 'DECLINED' } : project
    ));
  };

  // Handle Editing Project
  const handleEdit = (projectId) => {
    const project = projects.find(proj => proj.id === projectId);
    setEditingProject(project);
  };

  const handleUpdateProject = () => {
    if (!editingProject.name.trim()) {
      alert('Project name cannot be empty.');
      return;
    }

    setProjects(projects.map(project =>
      project.id === editingProject.id ? editingProject : project
    ));
    setEditingProject(null);
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 4, backgroundColor: '#F9FAFB' }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>Project Requests</Typography>

        {/* Search Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 3 }}>
          <TextField
            label="Search Projects"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ backgroundColor: 'white', width: 300 }}
          />
        </Box>

        {/* 
        Add Project Form 
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6">Add New Project</Typography>
          <TextField
            label="Project Name"
            variant="outlined"
            size="small"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            sx={{ marginRight: 2, marginBottom: 1 }}
          />
          <TextField
            label="Project Name"
            variant="outlined"
            size="small"
            value={newProject.emptype}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            sx={{ marginRight: 2, marginBottom: 1 }}
          />
          <Button variant="contained" onClick={handleAddProject} sx={{ backgroundColor: '#34D399' }}>
            Add Project
          </Button>
        </Box>
        
        */}

        {/* Edit Project Form */}
        {editingProject && (
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6">Edit Project</Typography>
            <TextField
              label="Project Name"
              variant="outlined"
              size="small"
              value={editingProject.name}
              onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
              sx={{ marginRight: 2, marginBottom: 1 }}
            />
            <TextField
              label="Employee Type"
              variant="outlined"
              size="small"
              value={newProject.emptype}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              sx={{ marginRight: 2, marginBottom: 1 }}
            />
            <TextField
              label="Employee Count"
              variant="outlined"
              size="small"
              value={newProject.empcnt}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              sx={{ marginRight: 2, marginBottom: 1 }}
            />
            <Button variant="contained" onClick={handleUpdateProject} sx={{ backgroundColor: '#34D399' }}>
              Update Project
            </Button>
          </Box>
        )}

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle1">Project Name</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">Project ID</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">Employee Type</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">No of Employees</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">Status</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.emptype}</TableCell>
                  <TableCell>{project.empcnt}</TableCell>
                  <TableCell>
                    <Box sx={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      color: '#FFF',
                      backgroundColor: project.status === 'COMPLETE' ? '#FBBF24' : project.status === 'PENDING' ? '#34D399' : '#EF4444'
                    }}>
                      {project.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleAssign(project.id)}
                      sx={{ backgroundColor: '#FBBF24', marginRight: 2 }}>
                      Assign
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleDecline(project.id)}
                      sx={{ backgroundColor: '#1C1C1C', color: '#FFF', marginRight: 2 }}>
                      Decline
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(project.id)}
                      sx={{ backgroundColor: '#34D399', marginRight: 2 }}>
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(project.id)}
                      sx={{ backgroundColor: '#EF4444' }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ProjectRequests;
