import React, { useState , useEffect} from "react";
import { BsPlus, BsPrinter } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import { postUniv , getUniversitiesList, getOrgansList} from "../../../../../redux/gestionSyndicatSlice";
import UniversityModal from "./UniversityModal";
import StatTitle from "../../../../../components/baseComponents/StatTitle";
import Button from "../../../../../components/baseComponents/Button";
import MaterialTable from "../../../../../components/baseComponents/MaterialTable";

const UniversitiesList = ({universities}) => {
  const dispatch = useDispatch();
  const {univLoading , univSuccess , univError} = useSelector((state) => state.gestionSyndicat)
  const [open, setOpen] = useState(false);
  const [universityInfo, setUniversityInfo] = useState({
    nom: "",
    localisation: "",
    logo: "",
  });

  useEffect(()=>{
    if (univError && !univSuccess) {
      
      handleClose();
      toast.error(`Erreur lors de l'ajout de l'université, ${univError}`, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else if (univSuccess && !univError) {
      handleClose();
      toast.success("université ajoutée avec succès", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });   
     dispatch(getUniversitiesList());
      dispatch(getOrgansList());
    }
  },[univError, univSuccess])
  

  const columns = [
    {
      accessorFn: (row) => row.logo, //simple recommended way to define a column
      header: "Logo",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => (
        <div className="w-full">
          {cell.getValue() ? (
           <img src={ cell.getValue()} alt="logo uni" className=" mx-auto rounded-full object-cover w-10 h-10"  />
          ) : (
            <span >
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
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => (
        <span >
          {cell.getValue()}
        </span>
      ), //optional custom cell render
      // size:258
    },
    {
      accessorFn: (row) => row.localisation, //simple recommended way to define a column
      header: "Localisation",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => (
        <span >
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
    dispatch(postUniv({...universityInfo, logo:null}))
  };

  const handleEdit = (value, id) => {
    console.log("edit");
  };
  const handleDelete = (value, id) => {
    console.log("delete");
  };

  return (
    <div className="bg-white w-full  p-4 rounded-xl h-fit overflow-hidden">
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
      <div className="my-4 ">
        <MaterialTable
          data={universities}
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
        isLoading={univLoading}
        handleClose={handleClose}
        handleChange={handleChange}
        data={universityInfo}
      />
      <ToastContainer/>
    </div>
  );
};

export default UniversitiesList;
