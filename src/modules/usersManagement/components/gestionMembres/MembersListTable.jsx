import React, { useState, useEffect } from "react";
import { BsPlus, BsPrinter } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  resetMember,
  getMembersList,
  postMember,
  updateMemberRole
} from "../../../../redux/gestionMembreSlice";
import { availableRolesList, transformRolesData } from "../Constant";
import StatTitle from "../../../../components/baseComponents/StatTitle";
import Button from "../../../../components/baseComponents/Button";
import MaterialTable from "../../../../components/baseComponents/MaterialTable";
import MemberModal from "./MemberModal";
import ModifyRoleModal from "./ModifyRoleModal";
import WarningModal from "./WarningModal";
import noProfile from "../../../../assets/img/profile1.png";

const MembersListTable = ({ listeMembres, restrict, universities, roles }) => {
  const dispatch = useDispatch();
  const { memberLoading, memberError, memberSuccess, updateMemRoleLoading,updateMemRoleError,updateMemRoleSuccess } = useSelector(
    (state) => state.gestionMembre
  );

  

  const [open, setOpen] = useState(false);
  const [openRole, setOpenRole] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [warnLoading , setWarnLoading ] = useState(false);
  const [rolesOption ,setRolesOption] = useState([])
  const [selectedMember, setSelectedMember] = useState("")
  const [memberInfo, setMemberInfo] = useState({
    matricule: "",
    nom: "",
    prenom: "",
    email: "",
    photo: null,
    universite: "",
    dateInscription: "",
  });

  useEffect(() => {
    if ((memberError && !memberSuccess) || (updateMemRoleError && !updateMemRoleSuccess)) {
      handleClose();
      setOpenRole(false);
      setTimeout(() => {
        toast.error(   `
        "Erreur :", ${memberError ? roleError : updatePermError}`, {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }, 200);
      dispatch(resetMember());
    } else if ((memberSuccess && !memberError) || (!updateMemRoleError && updateMemRoleSuccess)) {
      handleClose();
      setOpenRole(false)
      setTimeout(() => {
        toast.success("Action effectuée avec succès", {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }, 200);
      dispatch(getMembersList());
      dispatch(resetMember());
    }
  }, [memberError, memberSuccess, updateMemRoleError, updateMemRoleSuccess]);

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
      Cell: ({ cell }) => <span >{cell.getValue()}</span>, //optional custom cell render
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
      accessorFn: (row) => row.membre.avertissement, //simple recommended way to define a column
      header: "Avertissement",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => <span onClick={() => console.log("cell ",cell)} className="text-red-400 hover:cursor-pointer hover:underline ">{cell.getValue()[0].length} avertissements</span>, //optional custom cell render
    },
    {
      accessorFn: (row) => row.membre.suspendu, //simple recommended way to define a column
      header: "Statut",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue() ? "Suspendu": "Non suspendu"}</span>, //optional custom cell render
    },
    {
      accessorFn: (row) => row.membre.dateInscription, //simple recommended way to define a column
      header: "Date inscription",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
  ];

  const handleModifyRole = (data, index) => {
    if(data.membre.role.nom === "Secretaire Congres"){
      toast.error("Vous n'avez pas le droit de modifier ce role")
    } else {
      setSelectedMember(data)
      setRolesOption(availableRolesList(roles, listeMembres, data,restrict))
      setOpenRole(true)
    }
  }

  const handleWarning = (data, index)=> {
    if(data.membre.role.nom === "Secretaire Congres"){
      toast.error("Vous n'avez pas le droit d'avertir ce role")
    } else {
      setSelectedMember(data)
      setOpenWarning(true)
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMemberInfo({ ...memberInfo, [name]: value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember("")
    setMemberInfo({
      matricule: "",
      nom: "",
      prenom: "",
      email: "",
      photo: null,
      universite: "",
      dateInscription: "",
    });
  };

  const handleAdd = () => {
    const univId = universities.find(
      (univ) => univ.nom === memberInfo.universite
    );
    
    dispatch(postMember({...memberInfo, iduniversite:univId.id}));
  };

  const handleUpdate = (roleId) => {
    const ans = {idRole:parseInt(roleId), idMembre:selectedMember.id}
    dispatch(updateMemberRole({memberInfo:ans, restrict:restrict}))
  }

  const addWarning = (message ) => {
    console.log("message", message)
  }

  

  return (
    <div className="bg-white w-full  p-4 rounded-xl h-fit overflow-hidden mt-8">
      <div className="flex flex-col md:flex-row  justify-between mt-2">
        <StatTitle
          title={`Nombre de membres ${listeMembres ? listeMembres.length : 0}`}
        />
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
          name="université"
          hideDelete={true}
          hideEdit={true}
          showRoleIcon={true}
          showWarningIcon={true}
          showSuspendIcon={true}
          handleModifyRole={handleModifyRole}
          handleWarning = {handleWarning}
        />
      </div>
      <MemberModal
        isLoading={memberLoading}
        open={open}
        data={memberInfo}
        universities={universities}
        addMember={handleAdd}
        handleChange={handleChange}
        handleClose={handleClose}
      />
      <ModifyRoleModal 
        open={openRole}
        userRoleId = {selectedMember && selectedMember.membre.role.id}
        data={transformRolesData(rolesOption)}
        handleClose={() => setOpenRole(false)}
        updateRole = {handleUpdate}
        isLoading ={updateMemRoleLoading}
      />
      <WarningModal
        open={openWarning}
        handleClose={ () => setOpenWarning(false)}
        addWarning = {addWarning}
        isLoading={warnLoading}
        data={selectedMember}
      />
      <ToastContainer />
    </div>
  );
};

export default MembersListTable;
