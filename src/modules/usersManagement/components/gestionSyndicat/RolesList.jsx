import React, { useState } from "react";
import { BsPlus, BsPrinter } from "react-icons/bs";
import StatTitle from "../../../../components/baseComponents/StatTitle";
import Button from "../../../../components/baseComponents/Button";
import MaterialTable from "../../../../components/baseComponents/MaterialTable";

const RolesList = () => {
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

  const columns = [
    {
      accessorFn: (row) => row.name, //simple recommended way to define a column
      header: "Nom",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => <span className="font-roboto font-semibold text-slate-800">{cell.getValue()}</span>, //optional custom cell render
      // size:258
    },
    {
      accessorFn: (row) => row.surname, //simple recommended way to define a column
      header: "Prenom",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => <span className="font-roboto font-semibold text-slate-800">{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorFn: (row) => row.age, //simple recommended way to define a column
      header: "Age",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => <span className="font-roboto font-semibold text-slate-800 ">{cell.getValue()}</span>, //optional custom cell render
    },
  ];

  const handleAdd = () => {
    console.log("add");
  };
  const handleEdit = (value, id) => {
    console.log("edit");
  };
  const handleDelete = (value, id) => {
    console.log("delete");
  };

  return (
    <div className="bg-white  p-4 rounded-xl h-fit ">
      <div className="flex flex-col md:flex-row  justify-between mt-2">
        <StatTitle title="Liste des roles au sein du syndicat" />
        <div className="flex ">
          <Button
            title="Nouveau role"
            icon={<BsPlus className="mr-2 scale-[1.8]" />}
            handleClick={() => {
              alert("test");
            }}
            filled={true}
            className=" font-semibold bg-secondary mr-2 border-secondary hover:bg-white hover:shadow-md hover:text-secondary rounded-md"
          />
          <Button
            title="Exporter en csv"
            icon={<BsPrinter className="mr-2" />}
            handleClick={() => {
              alert("exported");
            }}
            filled={true}
            className="rounded-md font-semibold"
          />
        </div>
      </div>
      <div className="my-4">
        <MaterialTable
          data={data}
          columnsList={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          name="role"
        />
      </div>
    </div>
  );
}

export default RolesList