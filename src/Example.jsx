import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { data } from './makeData';



const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        filterVariant: 'range',
      },
      {
        accessorKey: 'name',
        header: 'Name',
        filterVariant: 'text', 
        
      },
      {
        accessorKey: 'category',
        header: 'category',
        filterVariant: 'text',
        
        
      },
      {
        accessorKey: 'subcategory',
        header: 'subcategory',
        filterVariant: 'text',
        
        
      },
      {
        accessorKey: 'createdAt',
        header: 'createdAt',
        filterVariant: 'text',
      },
      {
        accessorKey: 'updatedAt',
        header: 'updatedAt',
        filterVariant: 'text',
      },
      {
        accessorKey: 'price',
        header: 'price',
        filterVariant: 'range',
      },
      {
        accessorKey: 'sale_price',
        header: 'sale_price',
        
        filterVariant: 'range',
      },
      
      
     
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },

  enableGrouping: true,
  
   
  });

  return <MaterialReactTable table={table} />;
};


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const ExampleWithLocalizationProvider = () => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Example />
  </LocalizationProvider>
);

export default ExampleWithLocalizationProvider;
