import React, { useState } from "react";
import { BsPlus, BsPrinter } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import StatTitle from "../../../../../components/baseComponents/StatTitle";
import Button from "../../../../../components/baseComponents/Button";
import MaterialTable from "../../../../../components/baseComponents/MaterialTable";
import OrgansModal from "./OrgansModal";

const universitéList = [
  "Université de yaoundé 1",
  "Université de yaoundé 2",
  "Université de douala",
];

const OrgansList = ({organs}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [organInfo, setOrganInfo] = useState({
    nom: "",
    description: "",
    fondAlloue: 0,
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOrganInfo({
      nom: "",
      description: "",
      fondAlloue: 0,
    });
    setOpen(false);
  };


  const columns = [
    {
      accessorFn: (row) => row.nom, //simple recommended way to define a column
      header: "Nom",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
      // size:258
    },
    {
      accessorFn: (row) => row.description, //simple recommended way to define a column
      header: "Description",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorFn: (row) => row.fondAlloue, //simple recommended way to define a column
      header: "Fond Alloue",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()} cfa</span>, //optional custom cell render
    },
    {
      accessorFn: (row) => row.idUniversite, //simple recommended way to define a column
      header: "Université affiliée",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => (
        <span>
          {cell.getValue()
            ? universitéList[cell.getValue()]
            : "aucune université"}
        </span>
      ), //optional custom cell render
    },
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setOrganInfo({ ...organInfo, [name]: value });
  };

  const handleAdd = () => {
    setIsLoading(true);
    setTimeout(() => {
     // setData([...data, {...organInfo, idUniversite:null}]);
      setIsLoading(false);
      handleClose();
      toast.success("Nouvel organe ajouté", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }, 3000);
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
        <StatTitle title="Liste des organes du syndicat" />
        <div className="flex ">
          <Button
            title="Nouvel organe"
            icon={<BsPlus className="mr-2 scale-[1.8]" />}
            handleClick={handleOpen}
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
          data={organs}
          columnsList={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          name="organe"
        />
      </div>
      <OrgansModal
        open={open}
        addOrgan={handleAdd}
        isLoading={isLoading}
        handleClose={handleClose}
        handleChange={handleChange}
        data={organInfo}
      />
      <ToastContainer/>
    </div>
  );
};

export default OrgansList;
