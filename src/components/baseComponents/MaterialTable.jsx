import React, {  useMemo } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Box } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { Tooltip } from "react-tooltip";
import "../../assets/css/Mui.css";

const MaterialTable = ({ data, handleEdit, handleDelete, columnsList, name }) => {
  const columns = useMemo(
    () =>columnsList,
    []
  );

  return (
    <section className=" w-full h-auto mtr ">
      <MaterialReactTable
        columns={columns}
        data={data}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        muiTablePaperProps={{
          sx: {
            boxShadow: "none",
          },
        }}
        muiTableBodyCellEditTextFieldProps={({ cell }) => ({
          sx:{
          }
        })}
        muiSearchTextFieldProps={{
          placeholder: "Rechercher",
          sx: { minWidth: "300px" },
        }}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <FiEdit2
              data-tooltip-id="edit"
              data-tooltip-content={`Modifier ${name}`}
              className="hover:cursor-pointer text-xl text-secondary"
              onClick={() => handleEdit(row.original, row.index)}
            />
            <FiTrash2
              data-tooltip-id="delete"
              data-tooltip-content={`Supprimer ${name}`}
              className="hover:cursor-pointer text-xl text-red-400"
              onClick={() => handleDelete(row.original, row.index)}
            />
          </Box>
        )}
      />
      
      <Tooltip id="edit" place="bottom" />
      <Tooltip id="delete" place="bottom" />
    </section>
  );
};

export default MaterialTable;
