import React, { useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { data } from './makeData';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel } from '@mui/material';

const SidePanel = ({ removeGrouping, applyFilter, applyGrouping, toggleColumn, columns }) => {
  const [filterValue, setFilterValue] = useState('');
  const [groupingValue, setGroupingValue] = useState('');
  const [showColumns, setShowColumns] = useState(() => {
    const initialColumns = {};
    columns.forEach(column => {
      initialColumns[column.accessorKey] = true;
    });
    return initialColumns;
  });

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleGroupingChange = (e) => {
    setGroupingValue(e.target.value);
  };

  const handleApplyFilter = () => {
    applyFilter(filterValue);
  };

  const handleApplyGrouping = () => {
    applyGrouping(groupingValue);
  };

  const handleToggleColumn = (columnName) => {
    setShowColumns(prevState => ({
      ...prevState,
      [columnName]: !prevState[columnName]
    }));
    toggleColumn(columnName);
  };

  return (
    <div style={{ padding: '20px', borderRight: '1px solid #ccc', width: '300px' }}>
      <h2>Filter & Group</h2>
      <TextField
        label="Filter"
        variant="outlined"
        value={filterValue}
        onChange={handleFilterChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleApplyFilter}>Apply Filter</Button>
      <FormControl fullWidth margin="normal">
        <InputLabel id="grouping-label">Group By</InputLabel>
        <Select
          labelId="grouping-label"
          value={groupingValue}
          onChange={handleGroupingChange}
          variant="outlined"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          {/* Add more grouping options as needed */}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleApplyGrouping}>Apply Grouping</Button>
      <Button onClick={removeGrouping}>Remove Grouping</Button>

      {/* Toggle buttons for columns */}
      {columns.map(column => (
        <FormControlLabel
          key={column.accessorKey}
          control={<Switch checked={showColumns[column.accessorKey]} onChange={() => handleToggleColumn(column.accessorKey)} />}
          label={column.header}
        />
      ))}
    </div>
  );
};

const Example = () => {
  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'subcategory', header: 'Subcategory' },
    { accessorKey: 'createdAt', header: 'CreatedAt' },
    { accessorKey: 'updatedAt', header: 'UpdatedAt' },
    { accessorKey: 'price', header: 'Price' },
    { accessorKey: 'sale_price', header: 'Sale Price' },
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
    enableGrouping: true,
  });

  const applyFilter = (filterValue) => {
    table
  };

  const applyGrouping = (groupingValue) => {
    if (groupingValue === 'name') {
      const nameColumn = columns.find(column => column.accessorKey === 'name');
      if (nameColumn) {
        nameColumn.defaultGroupOrder = 0;
      }
      table.setGrouping(groupingState => [...groupingState, 'name']);
    } else {
      table.setGrouping(groupingState => groupingState.filter(columnId => columnId !== 'name'));
    }
  };

  const removeGrouping = () => {
    // Call the resetGrouping function to remove grouping
    table.resetGrouping();
  };

  const toggleColumn = (columnName) => {
    table.getAllFlatColumns(columnName);
  };

  return (
    <div style={{ display: 'flex' }}>
      <SidePanel removeGrouping={removeGrouping} applyFilter={applyFilter} applyGrouping={applyGrouping} toggleColumn={toggleColumn} columns={columns} />
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Example;
