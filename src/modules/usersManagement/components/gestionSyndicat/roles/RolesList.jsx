import React, { useState, useEffect } from "react";
import { BsPlus, BsPrinter, BsEye } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {ExportToCsv} from "export-to-csv";
import {
  postRole,
  getRolesList,
  updatePermissions,
  updateRole,
} from "../../../../../redux/gestionSyndicatSlice";
import StatTitle from "../../../../../components/baseComponents/StatTitle";
import Button from "../../../../../components/baseComponents/Button";
import MaterialTable from "../../../../../components/baseComponents/MaterialTable";
import ErrorModal from "../../../../../components/baseComponents/ErrorModal";
import RolesModal from "./RolesModal";
import PermissionModal from "./PermissionModal";
import DeleteModal from "../../../../../components/baseComponents/DeleteModal";
import { getRolePermissions, deleteRole } from "../../../services/gestionSyndicatService";
import { resetRolesAndPermissions } from "../../../../../redux/gestionSyndicatSlice";

const RolesList = ({ roles, organs, permissions }) => {
  const dispatch = useDispatch();
  const {
    roleLoading,
    roleSuccess,
    roleError,
    updatePermLoading,
    updatePermError,
    updatePermSuccess,
  } = useSelector((state) => state.gestionSyndicat);
  const [open, setOpen] = useState(false);
  const [openPermissions, setOpenPermissions] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [modifyPermissions, setModifyPermissions] = useState(false);
  const [roleInfo, setRoleInfo] = useState({
    nom: "",
    description: "",
    idOrgane: "",
    organe: null,
  });

  const [modifyInfo, setModifyInfo] = useState({
    modifyStatus: false,
    modifyValue: {
      id: "",
      nom: "",
      description: "",
      idOrgane: "",
      organe: null,
    },
  });

  const [deleteId, setDeleteId] = useState(null)

  const [selectedRole, setSelectedRole] = useState({
    id: null,
    nom: "",
    description: "",
    permissions: [],
  });

  useEffect(() => {
    if (
      (roleError && !roleSuccess) ||
      (updatePermError && !updatePermSuccess)
    ) {
      handleClosePermissions();
      handleClose();
      toast.error(
        `
      "Erreur :", ${roleError ? roleError : updatePermError}`,
        {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
      dispatch(resetRolesAndPermissions());
    } else if (
      (roleSuccess && !roleError) ||
      (!updatePermError && updatePermSuccess)
    ) {
      handleClosePermissions();
      handleClose();
      setTimeout(() => {
        toast.success("Action effectuée avec succès", {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }, 200);
      dispatch(getRolesList());
      dispatch(resetRolesAndPermissions());
    }
  }, [roleError, roleSuccess, updatePermError, updatePermSuccess]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setRoleInfo({
      nom: "",
      description: "",
      idOrgane: "",
      organe: "",
    });
    setModifyInfo({
      id: "",
      nom: "",
      description: "",
      idOrgane: "",
      organe: null,
    });
    setOpen(false);
  };

  const handleOpenPermissions = async (cell) => {
    const data = cell.row.original;
    //  console.log(" and cell is ", cell);
    const permissions = await getRolePermissions(data.id);
    if (permissions.status === 200) {
      setSelectedRole({ ...data, permissions: permissions.data });
      setOpenPermissions(true);
    }
  };

  const handleClosePermissions = () => {
    setOpenPermissions(false);
    setSelectedRole({
      id: null,
      nom: "",
      description: "",
      permissions: [],
    });
    setModifyPermissions(false);
  };

  const columns = [
    {
      accessorFn: (row) => row.nom, //simple recommended way to define a column
      header: "Nom du role",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
      // size:258
    },
    {
      accessorFn: (row) => row.description, //simple recommended way to define a column
      header: "Description du role",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorFn: (row) => row.organe, //simple recommended way to define a column
      header: "Organe associé",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue().nom}</span>, //optional custom cell render
    },

    {
      accessorFn: (row) => row.id, //simple recommended way to define a column
      header: "Permissions",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => (
        <p
          className="text-secondary hover:underline hover:cursor-pointer flex items-center"
          onClick={() => handleOpenPermissions(cell)}
        >
          <BsEye className="mr-1 " /> <span>Visualiser</span>
        </p>
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

    setRoleInfo({ ...roleInfo, [name]: value });
  };

  const handleAdd = () => {
    const newRole = {
      ...roleInfo,
      idOrgane: organs.find((elt) => elt.nom === roleInfo.organe).id,
    };
    setRoleInfo(newRole);
    dispatch(
      postRole({
        nom: newRole.nom,
        description: newRole.description,
        idOrgane: newRole.idOrgane,
      })
    );
  };

  const handleRemove = async () => {
    const res = await deleteRole(deleteId);
    setOpenDelete(false);
    if (res.status === 200) {
      setTimeout(() => {
        dispatch(getRolesList())
        toast.success("role supprimé avec succès");
      },200)
    } else {
      setTimeout(() => {
        toast.error("une erreur est survenue lors de la suppression du role")
      },200)
    }
  }




  const handleEdit = (value, id) => {
    if (value.nom.startsWith("Membre Section")) {
      setOpenError(true);
    } else {
      setModifyInfo({
        ...modifyInfo,
        modifyStatus: true,
        modifyValue: value,
      });
      setRoleInfo({ ...value, organe: value.organe.nom });
      setOpen(true);
    }
  };

  const handleDelete = (value, id) => {
    if (value.nom.startsWith("Membre Section")) {
      setOpenError(true);
    } else {
      setDeleteId(value.id);
      setOpenDelete(true);
    }
  };

  const handleModifyRole = () => {
    const newRole = {
      ...roleInfo,
      organe: organs.find((elt) => elt.nom === roleInfo.organe),
    };
    dispatch(updateRole(newRole));
    // dispatch(updateRole(newRole))
  };

  const handleModifyPermissions = (permissions) => {
    const newPermissions = [];
    for (let elt of permissions) {
      if (elt.checked === true) {
        newPermissions.push(elt.id);
      }
    }
    dispatch(
      updatePermissions({
        idRole: selectedRole.id,
        newPermissions: newPermissions,
      })
    );
  };

  return (
    <div className="bg-white  p-4 rounded-xl h-fit ">
      <div className="flex flex-col md:flex-row  justify-between mt-2">
        <StatTitle title="Liste des roles au sein du syndicat" />
        <div className="flex ">
          <Button
            title="Nouveau role"
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
          data={roles}
          columnsList={columns}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          name="role"
        />
      </div>
      <RolesModal
        open={open}
        addRole={handleAdd}
        isLoading={roleLoading}
        handleClose={handleClose}
        handleChange={handleChange}
        data={roleInfo}
        modifyRole={handleModifyRole}
        organsList={organs}
        modify={modifyInfo}
      />
      <PermissionModal
        open={openPermissions}
        handleClose={handleClosePermissions}
        selectedRole={selectedRole}
        permissions={permissions}
        modify={modifyPermissions}
        isLoading={updatePermLoading}
        handleModify={handleModifyPermissions}
        openModification={() => setModifyPermissions(true)}
      />
      <ErrorModal open={openError} handleClose={() => setOpenError(false)} />
      <DeleteModal
        open={openDelete}
        handleClose={() => {setOpenDelete(false); setDeleteId(null)}}
        title="Supprimer un role"
        description="la suppression de ce role impactera tous les membres possédant ce role. Voulez-vous tout de même supprimer ?"
        handleDelete = {handleRemove}
     />
      <ToastContainer />
    </div>
  );
};

export default RolesList;
