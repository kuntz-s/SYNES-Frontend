import React,{useState, useMemo} from 'react';
import { BsDownload, BsPen, BsTrash } from "react-icons/bs";
import {
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import MaterialReactTable from "material-react-table";
import "../../assets/css/Mui.css";

const MaterialTable = () => {
    const [data, setData] = useState([
      {
        name: "NCHOUWET MFOUAPON", // key "name" matches `accessorKey` in ColumnDef down below
        surname: "kuntz stephane",
        age: 20, // key "age" matches `accessorKey` in ColumnDef down below
      },
      {
        name: "NCHOUWET GHANE",
        surname: "eliezer loic",
        age: 25,
      },
      {
        name: "NZIE NCHOUWET",
        surname: "Richelle Leslie",
        age: 35,
      },
    ]);
  
    const handleEdit = (value, id) => {
      var newData = [...data];
      newData[id] = {
        name: "un nom",
        surname: "un surnom",
        age: 22,
      };
      setData(newData);
    };
  
    const columns = useMemo(
      () => [
        {
          accessorFn: (row) => row.name, //simple recommended way to define a column
          header: "Nom",
          muiTableHeadCellProps: { sx: { color: "black", fontSize: 16 } }, //optional custom props
          Cell: ({ cell }) => <span className="bg-red">{cell.getValue()}</span>, //optional custom cell render
          // size:258
        },
        {
          accessorFn: (row) => row.surname, //simple recommended way to define a column
          header: "Prenom",
          muiTableHeadCellProps: { sx: { color: "black", fontSize: 16 } }, //optional custom props
          Cell: ({ cell }) => <span className="bg-red">{cell.getValue()}</span>, //optional custom cell render
        },
        {
          accessorFn: (row) => row.age, //simple recommended way to define a column
          header: "Age",
          muiTableHeadCellProps: { sx: { color: "black", fontSize: 16 } }, //optional custom props
          Cell: ({ cell }) => <span className="bg-red ">{cell.getValue()}</span>, //optional custom cell render
        },
      ],
      []
    );
  
    return (
      <section className=" w-screen h-screen mtr bg-blue-200 ">
        <div className=" w-[90%] mx-auto ">
          <MaterialReactTable
            displayColumnDefOptions={{
              "mrt-row-actions": {
                muiTableHeadCellProps: {
                  align: "left",
                },
                size: 120,
              },
            }}
            columns={columns}
            data={data}
            editingMode="modal" //default
            enableColumnOrdering
            enableEditing
            muiTablePaperProps={{
              sx: {
                backgroundColor: "white",
                borderRadius: "20px",
                boxShadow: "0px",
                padding: "0px 58px",
              },
            }}
            muiBottomToolbarProps={{
              sx: {
                backgroundColor: "white",
                borderRadius: "20px",
                boxShadow: "0px",
              },
            }}
            muiTopToolbarProps={{
              sx: {
                backgroundColor: "white",
                borderRadius: "20px",
                boxShadow: "0px",
              },
            }}
            muiSearchTextFieldProps={{
              placeholder: 'Rechercher',
              sx: { minWidth: '300px' },
              variant: 'outlined',
            }}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => handleEdit(row.original, row.index)}>
                    <BsPen />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton color="error" onClick={() => console.log(row)}>
                    <BsTrash />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />
        </div>
      </section>
    );
  };

export default MaterialTable