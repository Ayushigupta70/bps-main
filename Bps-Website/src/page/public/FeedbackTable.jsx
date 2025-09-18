// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { Button } from '@mui/material';

// const columns = [
//   { id: 'name', label: 'S.No.', minWidth: 50 },
//   { id: 'code', label: 'Date', minWidth: 150 },
//   {
//     id: 'population',
//     label: 'Name',
//     minWidth: 170,
//     align: 'left',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Tour/Location',
//     minWidth: 170,
//     align: 'left',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Image',
//     minWidth: 170,
//     align: 'left',
//     format: (value) => value.toFixed(2),
//   },
//   {
//     id: 'status',
//     label: 'Status',
//     minWidth: 170,
//     align: 'left',
//     format: (value) => value.toFixed(2),
//   },
// ];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// // const rows = [
// //   createData('1', 'IN', 1324171354, 3287263),
// //   createData('2', 'CN', 1403500365, 9596961),
// //   createData('3', 'IT', 60483973, 301340),
// //   createData('4', 'US', 327167434, 9833520),
// //   createData('5', 'CA', 37602103, 9984670),
// //   createData('6', 'AU', 25475400, 7692024),
// //   createData('7', 'DE', 83019200, 357578),
// //   createData('8', 'IE', 4857000, 70273),
// //   createData('9', 'MX', 126577691, 1972550),
// //   createData('10', 'JP', 126317000, 377973),
// //   createData('11', 'FR', 67022000, 640679),
// //   createData('12', 'GB', 67545757, 242495),
// //   createData('13', 'RU', 146793744, 17098246),
// //   createData('14', 'NG', 200962417, 923768),
// //   createData('15', 'BR', 210147125, 8515767),
// // ];

// const rows = [
//     { name: '1', code: '2025-03-01', population: 'Alice Johnson', size: 'Paris City Tour', density: 'img1.jpg', status: <Button variant="text" size="small" color="success">Confirmed</Button> },
//     { name: '2', code: '2025-03-05', population: 'Bob Williams', size: 'Rome Explorer', density: 'img2.jpg', status: <Button variant="text" size="small" color="warning">Pending</Button> },
//     { name: '3', code: '2025-03-10', population: 'Charlie Brown', size: 'Tokyo Adventure', density: 'img3.jpg', status: <Button variant="text" size="small" color="error">Cancelled</Button> },
//     { name: '4', code: '2025-03-15', population: 'Dana White', size: 'New York Tour', density: 'img4.jpg', status: <Button variant="text" size="small" color="success">Confirmed</Button> },
//     { name: '5', code: '2025-03-20', population: 'Evan Parker', size: 'Sydney Explorer', density: 'img5.jpg', status: <Button variant="text" size="small" color="warning">Pending</Button> },
//     { name: '6', code: '2025-03-25', population: 'Fiona Green', size: 'Berlin Culture Trip', density: 'img6.jpg', status: <Button variant="text" size="small" color="success">Confirmed</Button> },
//     { name: '7', code: '2025-03-30', population: 'George Smith', size: 'Dubai Desert Safari', density: 'img7.jpg', status: <Button variant="text" size="small" color="error">Cancelled</Button> },
//     { name: '8', code: '2025-04-01', population: 'Hannah Lee', size: 'Iceland Northern Lights', density: 'img8.jpg', status: <Button variant="text" size="small" color="success">Confirmed</Button> },
//     { name: '9', code: '2025-04-05', population: 'Ian Thompson', size: 'Madrid Fiesta Tour', density: 'img9.jpg', status: <Button variant="text" size="small" color="warning">Pending</Button> },
//     { name: '10', code: '2025-04-10', population: 'Jane Doe', size: 'Venice Canal Ride', density: 'img10.jpg', status: <Button variant="text" size="small" color="success">Confirmed</Button> },
//     { name: '11', code: '2025-04-15', population: 'Kyle Adams', size: 'Amsterdam Windmills', density: 'img11.jpg', status: <Button variant="text" size="small" color="success">Confirmed</Button> },
//     { name: '12', code: '2025-04-20', population: 'Laura Scott', size: 'Athens Historic Tour', density: 'img12.jpg', status: <Button variant="text" size="small" color="warning">Pending</Button> },
//     { name: '13', code: '2025-04-25', population: 'Michael Brown', size: 'Rio Carnival Experience', density: 'img13.jpg', status: <Button variant="text" size="small" color="success">Confirmed</Button> },
//     { name: '14', code: '2025-04-30', population: 'Nancy Wilson', size: 'Cape Town Safari', density: 'img14.jpg', status: <Button variant="text" size="small" color="error">Cancelled</Button> },
//     { name: '15', code: '2025-05-01', population: 'Oliver Taylor', size: 'Moscow Kremlin Tour', density: 'img15.jpg', status: <Button variant="text" size="small" color="success">Confirmed</Button> },
//   ];

// export default function ColumnGroupingTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: '100%' }}>
//       <TableContainer sx={{ maxHeight: "500" }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
            
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ top: 2, minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }
