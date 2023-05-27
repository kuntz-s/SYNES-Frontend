import React, { useState } from "react";
import { BsPlus, BsPrinter } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import UniversityModal from "./UniversityModal";
import StatTitle from "../../../../components/baseComponents/StatTitle";
import Button from "../../../../components/baseComponents/Button";
import MaterialTable from "../../../../components/baseComponents/MaterialTable";

const UniversitiesList = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [universityInfo, setUniversityInfo] = useState({
    nom: "",
    localisation: "",
    logo: "",
  });
  const [data, setData] = useState([
    {
      nom: "Univeristé de Yaoundé 1", // key "name" matches `accessorKey` in ColumnDef down below
      localisation: "Yaoundé",
      logo: null, // key "age" matches `accessorKey` in ColumnDef down below
    },
    {
      nom: "Université de Douala",
      localisation: "Douala",
      logo: null,
    },
    {
      nom: "Université de Soa",
      localisation: "Yaoundé",
      logo: null,
    },
  ]);

  const columns = [
    {
      accessorFn: (row) => row.logo, //simple recommended way to define a column
      header: "Logo",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => (
        <div className="w-full">
          {cell.getValue() ? (
           <img src={ cell.getValue()} alt="logo uni" className=" mx-auto rounded-full object-cover w-10 h-10"  />
          ) : (
            <span className="font-roboto font-semibold text-slate-800">
              Aucune photo
            </span>
          )}
        </div>
      ), //optional custom cell render
      size: 10,
    },
    {
      accessorFn: (row) => row.nom, //simple recommended way to define a column
      header: "Nom",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => (
        <span className="font-roboto font-semibold text-slate-800">
          {cell.getValue()}
        </span>
      ), //optional custom cell render
      // size:258
    },
    {
      accessorFn: (row) => row.localisation, //simple recommended way to define a column
      header: "Localisation",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => (
        <span className="font-roboto font-semibold text-slate-800">
          {cell.getValue()}
        </span>
      ), //optional custom cell render
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
    setOpen(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log("hande change ", e);
    if (name === "logo" && value) {
      const image = e.target.files[0];
      setUniversityInfo({
        ...universityInfo,
        logo: URL.createObjectURL(image),
      });
    } else {
      setUniversityInfo({ ...universityInfo, [name]: value });
    }
  };

  const handleAdd = () => {
    setIsLoading(true);
    setTimeout(() => {
      setData([...data, universityInfo]);
      setIsLoading(false);
      handleClose();
      toast.success("Nouvelle université ajoutée", {
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
    <div className="bg-white  p-4 rounded-xl h-fit">
      <div className="flex flex-col md:flex-row  justify-between mt-2">
        <StatTitle title="Liste des universités" />
        <div className="flex ">
          <Button
            title="Nouvelle université"
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
          data={data}
          columnsList={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          name="université"
          handleOpen={handleOpen}
        />
      </div>
      <UniversityModal
        open={open}
        addUniversity={handleAdd}
        isLoading={isLoading}
        handleClose={handleClose}
        handleChange={handleChange}
        data={universityInfo}
      />
    </div>
  );
};

export default UniversitiesList;
