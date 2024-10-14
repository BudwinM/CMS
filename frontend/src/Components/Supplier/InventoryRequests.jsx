import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { Link } from 'react-router-dom'; 
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';

const InventoryRequests = () => {
  const [open, setOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false); // Add dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false); // Edit dialog state
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [newReqNo, setNewReqNo] = useState(''); // New Request Number
  const [newStatus, setNewStatus] = useState('QUOTATION PENDING'); // New Request Status
  const [editRow, setEditRow] = useState(null); // Row to be edited
  const [rows, setRows] = useState([
    { inventoryReqNo: '01', status: 'QUOTATION PENDING' },
    { inventoryReqNo: '02', status: 'QUOTATION REQUESTED' },
    { inventoryReqNo: '03', status: 'QUOTATION REQUESTED' },
    { inventoryReqNo: '04', status: 'QUOTATION REQUESTED' },
    { inventoryReqNo: '05', status: 'QUOTATION REQUESTED' },
    { inventoryReqNo: '06', status: 'QUOTATION REQUESTED' },
    { inventoryReqNo: '07', status: 'QUOTATION REQUESTED' },
    { inventoryReqNo: '08', status: 'QUOTATION REQUESTED' },
    { inventoryReqNo: '09', status: 'QUOTATION REQUESTED' },
    { inventoryReqNo: '10', status: 'QUOTATION REQUESTED' }

  ]);

  // Sample material data
  const materialData = {
    '01': [
      { name: '1*1 2mm Box Bar', quantity: 100 },
      { name: 'Amano Sheets', quantity: 55 },
    ],
    '02': [
      { name: 'Sand Cubes', quantity: 10 },
      { name: 'Metal Cubes', quantity: 5 },
    ],
    '03': [
      { name: 'Cement Bags', quantity: 200 },
      { name: 'Steel Rods', quantity: 120 },
    ],
    '04': [
      { name: 'Wood Planks', quantity: 150 },
      { name: 'Plywood Sheets', quantity: 75 },
    ],
    '05': [
      { name: 'Glass Panels', quantity: 50 },
      { name: 'Aluminum Frames', quantity: 30 },
    ],
    '06': [
      { name: 'Electrical Cables', quantity: 300 },
      { name: 'Switchboards', quantity: 25 },
    ],
    '07': [
      { name: 'Bricks', quantity: 500 },
      { name: 'Mortar Mix', quantity: 100 },
    ],
    '08': [
      { name: 'PVC Pipes', quantity: 200 },
      { name: 'Pipe Fittings', quantity: 120 },
    ],
    '09': [
      { name: 'Paint Buckets', quantity: 40 },
      { name: 'Roller Brushes', quantity: 60 },
    ],
    '10': [
      { name: 'Tiles', quantity: 150 },
      { name: 'Grout Mix', quantity: 80 },
    ],
    '11': [
      { name: 'Insulation Foam', quantity: 100 },
      { name: 'Roof Sheets', quantity: 50 },
    ],
    '12': [
      { name: 'Waterproofing Membranes', quantity: 35 },
      { name: 'Adhesive Sealant', quantity: 20 },
    ],
  };
  

  const renderStatusChip = (status) => {
    if (status === 'QUOTATION PENDING') {
      return <Chip label="QUOTATION PENDING" color="warning" />;
    } else if (status === 'QUOTATION REQUESTED') {
      return <Chip label="QUOTATION REQUESTED" color="success" />;
    }
  };

  const handleDetailsClick = (inventoryReqNo) => {
    setSelectedMaterials(materialData[inventoryReqNo]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddDialogOpen(false);
    setEditDialogOpen(false);
  };

  const handleRequestClick = (inventoryReqNo) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.inventoryReqNo === inventoryReqNo
          ? {
              ...row,
              status: row.status === 'QUOTATION PENDING' ? 'QUOTATION REQUESTED' : 'QUOTATION PENDING',
            }
          : row
      )
    );
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Inventory Requests Report', 14, 22);
    doc.setFontSize(12);

    const tableColumn = ["Inventory Req No", "Status"];
    const tableRows = rows.map(row => [row.inventoryReqNo, row.status]);

    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    doc.save('inventory_requests_report.pdf');
  };

  // CRUD Operations

  const handleAddRequest = () => {
    if (newReqNo) {
      setRows([...rows, { inventoryReqNo: newReqNo, status: newStatus }]);
      setNewReqNo('');
      setNewStatus('QUOTATION PENDING');
      setAddDialogOpen(false);
    }
  };

  const handleDelete = (inventoryReqNo) => {
    setRows(rows.filter(row => row.inventoryReqNo !== inventoryReqNo));
  };

  const handleEditClick = (row) => {
    setEditRow(row);
    setNewReqNo(row.inventoryReqNo);
    setNewStatus(row.status);
    setEditDialogOpen(true);
  };

  const handleUpdateRequest = () => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.inventoryReqNo === editRow.inventoryReqNo ? { inventoryReqNo: newReqNo, status: newStatus } : row
      )
    );
    setEditDialogOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box sx={{ width: 240, backgroundColor: '#1C1C1C', color: '#FFF', minHeight: '100vh', paddingTop: 2 }}>
        <Typography variant="h6" sx={{ paddingLeft: 2 }}>Budwin Mendis</Typography>
        <Typography variant="subtitle2" sx={{ paddingLeft: 2 }}>Supplier Manager</Typography>
        <Box sx={{ paddingTop: 4 }}>
          <Button component={Link} to="/SupplierDashboard" startIcon={<DashboardIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
            Dashboard
          </Button>
          <Button component={Link} to="/suppliers" startIcon={<PeopleIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
            Suppliers
          </Button>
          <Button component={Link} to="/quotation" startIcon={<DescriptionIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
            Quotation
          </Button>
          <Button component={Link} to="/supplier-quality" startIcon={<AssessmentIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
            Supplier Quality
          </Button>
          <Button component={Link} to="/inventory-requests" startIcon={<InventoryIcon />} fullWidth sx={{ justifyContent: 'flex-start', color: '#FFF' }}>
            Inventory Requests
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="inventory requests table">
            <TableHead>
              <TableRow>
                <TableCell>INVENTORY REQ NO</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.inventoryReqNo}>
                  <TableCell>{row.inventoryReqNo}</TableCell>
                  <TableCell>{renderStatusChip(row.status)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleRequestClick(row.inventoryReqNo)}
                    >
                      {row.status === 'QUOTATION PENDING' ? 'Request' : 'Revoke'}
                    </Button>
                    &nbsp;
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() => handleDetailsClick(row.inventoryReqNo)}
                    >
                      Details
                    </Button>
                    &nbsp;
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => handleEditClick(row)}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(row.inventoryReqNo)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Request Dialog */}
        <Dialog open={addDialogOpen} onClose={handleClose}>
          <DialogTitle>Add New Inventory Request</DialogTitle>
          <DialogContent>
            <TextField
              label="Inventory Request No"
              fullWidth
              value={newReqNo}
              onChange={(e) => setNewReqNo(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Status"
              fullWidth
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleAddRequest} color="primary">Add</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Request Dialog */}
        <Dialog open={editDialogOpen} onClose={handleClose}>
          <DialogTitle>Edit Inventory Request</DialogTitle>
          <DialogContent>
            <TextField
              label="Inventory Request No"
              fullWidth
              value={newReqNo}
              onChange={(e) => setNewReqNo(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Status"
              fullWidth
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleUpdateRequest} color="primary">Update</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for Material List */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Material List</DialogTitle>
          <DialogContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Material Name</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedMaterials.map((material, index) => (
                  <TableRow key={index}>
                    <TableCell>{material.name}</TableCell>
                    <TableCell>{material.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default InventoryRequests;
