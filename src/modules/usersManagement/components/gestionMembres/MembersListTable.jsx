import React, { useState, useEffect } from "react";
import { BsPlus, BsPrinter } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import StatTitle from "../../../../components/baseComponents/StatTitle"
import Button from "../../../../components/baseComponents/Button";
import MaterialTable from "../../../../components/baseComponents/MaterialTable";
import noProfile from "../../../../assets/img/profile1.png"

const MembersListTable = ({ listeMembres }) => {
  const dispatch = useDispatch();

  const columns = [
    {
      accessorFn: (row) => row.membre.photo, //simple recommended way to define a column
      header: "Photo",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => (
        <div className="w-full">
          {cell.getValue() ? (
            <img
              src={cell.getValue()}
              alt="photo membre"
              className=" mx-auto rounded-full object-cover w-10 h-10"
            />
          ) : (
            <img
              src={noProfile}
              alt="aucune photo"
              className=" mx-auto rounded-full object-cover w-10 h-10 "
            />
          )}
        </div>
      ), //optional custom cell render
      size: 10,
    },
    {
      accessorFn: (row) => row.membre.matricule, //simple recommended way to define a column
      header: "Matricule",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorFn: (row) => row.membre.noms, //simple recommended way to define a column
      header: "Nom",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
      // size:258
    },
    {
      accessorFn: (row) => row.membre.prenom, //simple recommended way to define a column
      header: "Prenom",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorFn: (row) => row.membre.email, //simple recommended way to define a column
      header: "Email",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
        accessorFn: (row) => row.membre.universite.nom, //simple recommended way to define a column
        header: "Université",
        muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
        Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
      },
      
    {
      accessorFn: (row) => row.membre.role.nom, //simple recommended way to define a column
      header: "Role",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorFn: (row) => row.membre.dateInscription, //simple recommended way to define a column
      header: "Date inscription",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setUniversityInfo({
      nom: "",
      localisation: "",
      logo: "",
    });
    setModifyInfo({
      modifyStatus: false,
      modifyId: null,
      modifyValue: {
        id: "",
        nom: "",
        localisation: "",
        logo: "",
      },
    });
    setOpen(false);
  };

  
  return (
    <div className="bg-white w-full  p-4 rounded-xl h-fit overflow-hidden mt-8">
      <div className="flex flex-col md:flex-row  justify-between mt-2">
        <StatTitle title={`Nombre de membres ${listeMembres? listeMembres.length :0}`} />
        <div className="flex ">
          <Button
            title="Nouveau membre"
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
      <div className="my-4 ">
        <MaterialTable
          data={listeMembres}
          columnsList={columns}
          handleEdit={() => {alert("we are editin")}}
          handleDelete={() => {alert("we are delting")}}
          name="université"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default MembersListTable;
