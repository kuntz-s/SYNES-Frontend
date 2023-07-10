import React, { useState, useEffect } from "react";
import { BsPlus, BsPrinter } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {ExportToCsv} from "export-to-csv";
import {
  postOrgan,
  getOrgansList,
  getRolesList,
  updateOrgan
} from "../../../../../redux/gestionSyndicatSlice";
import { ToastContainer, toast } from "react-toastify";
import StatTitle from "../../../../../components/baseComponents/StatTitle";
import Button from "../../../../../components/baseComponents/Button";
import MaterialTable from "../../../../../components/baseComponents/MaterialTable";
import { resetOrgans } from "../../../../../redux/gestionSyndicatSlice";
import ErrorModal from "../../../../../components/baseComponents/ErrorModal";
import DeleteModal from "../../../../../components/baseComponents/DeleteModal";
import { deleteOrgan } from "../../../services/gestionSyndicatService";
import OrgansModal from "./OrgansModal";

const OrgansList = ({ organs }) => {
  const dispatch = useDispatch();
  const { organLoading, organSuccess, organError } = useSelector(
    (state) => state.gestionSyndicat
  );
  const [open, setOpen] = useState(false);
  const [openError,setOpenError] = useState(false)
  const [openDelete,setOpenDelete] = useState(false)
  const [organInfo, setOrganInfo] = useState({
    nom: "",
    description: "",
    fondAlloue: 0,
  });
  const [modifyInfo, setModifyInfo] = useState({
    modifyStatus: false,
    modifyValue: {
      id: "",
      nom: "",
      description: "",
      fondAlloue: 0,
      universite:""
    },
  });

  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    if (organError && !organSuccess) {
      handleClose();
      toast.error( `Erreur lors de ${
        modifyInfo.modifyStatus ? "la modification" : "l'ajout"
      } de l'organe, ${organError}`, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      dispatch(resetOrgans());
    } else if (organSuccess && !organError) {
      handleClose();
      setTimeout(() =>{
        toast.success(`Organe ${
          modifyInfo.modifyStatus ? "modifié" : "ajouté"
        } avec succès `, {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      },200)
      dispatch(getOrgansList());
      dispatch(resetOrgans());
    }
  }, [organError, organSuccess]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOrganInfo({
      nom: "",
      description: "",
      fondAlloue: 0,
    });
    setModifyInfo({
      modifyStatus: false,
      modifyValue: {
        id: "",
        nom: "",
      description: "",
      fondAlloue: 0,
      },
    })
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
      accessorFn: (row) => row.universite, //simple recommended way to define a column
      header: "Université affiliée",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => (
        <span>
          {cell.getValue().nom ? cell.getValue().nom : "aucune université"}
        </span>
      ), //optional custom cell render
    },
  ];

  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };
  
  const csvExporter = new ExportToCsv(csvOptions)

  const exportData =() => {
    csvExporter.generateCsv(data)
  }

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setOrganInfo({ ...organInfo, [name]: value });
  };

  const handleAdd = () => {
    dispatch(postOrgan(organInfo));
  };

  const handleModify = () => {
    dispatch(updateOrgan(organInfo))
  };

  const handleRemove = async () => {
    const res = await deleteOrgan(deleteId);
    setOpenDelete(false);
    if (res.status === 200) {
      setTimeout(() => {
        dispatch(getRolesList())
        dispatch(getOrgansList())
        toast.success("organe supprimé avec succès");
      },200)
    } else {
      setTimeout(() => {
        toast.error("une erreur est survenue lors de la suppression de l'organe")
      },200)
    }
  }


  const handleEdit = (value, id) => {
    if(value.nom.startsWith("Section")){
      setOpenError(true)
    } else {
      setModifyInfo({
        ...modifyInfo,
        modifyStatus: true,
        modifyValue: value,
      });
      setOrganInfo(value);
      setOpen(true);
    }
  };
  const handleDelete = (value, id) => {
    if(value.nom.startsWith("Section")){
      setOpenError(true)
    } else {
      setDeleteId(value.id);
      setOpenDelete(true);
    }
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
            handleClick={exportData}
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
        modifyOrgan={handleModify}
        isLoading={organLoading}
        handleClose={handleClose}
        handleChange={handleChange}
        data={organInfo}
        modify={modifyInfo}
      />
      <ToastContainer />
      <DeleteModal
        open={openDelete}
        handleClose={() => {setOpenDelete(false); setDeleteId(null)}}
        title="Supprimer un organe"
        description="la suppression de cet organe entrainera la supression des roles qui lui sont associé. Voulez-vous tout de même supprimer ?"
        handleDelete = {handleRemove}
     />
      <ErrorModal open={openError} handleClose={() => setOpenError(false)} />
    </div>
  );
};

export default OrgansList;
