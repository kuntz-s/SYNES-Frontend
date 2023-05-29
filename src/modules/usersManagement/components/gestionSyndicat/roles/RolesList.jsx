import React, { useState } from "react";
import { BsPlus, BsPrinter, BsEye } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import StatTitle from "../../../../../components/baseComponents/StatTitle";
import Button from "../../../../../components/baseComponents/Button";
import MaterialTable from "../../../../../components/baseComponents/MaterialTable";
import RolesModal from "./RolesModal";

const organsList = [
  {
    id:1,
    nom: "Congrès",
    description: "haute instance du synes",
  },
  {
    id:2,
    nom: "Bureau exécutif national",
    description: "description BEN",
  },
  {
    id:3,
    nom: "Section ngoa ekelle",
    description: "description section ngoa ekelle",
  },
];

const RolesList = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roleInfo, setRoleInfo] = useState({
    nom: "",
    description: "",
    idOrgane: "",
    organe: "",
  });
  

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
    setOpen(false);
  };

  const [data, setData] = useState([
    {
      id: 1,
      nom: "Sécrétaire congrès", // key "name" matches `accessorKey` in ColumnDef down below
      description: "Sécrétaire en charge de faire ceci ou cela",
      organe: "Congrès", // key "age" matches `accessorKey` in ColumnDef down below
    },
    {
      id: 2,
      nom: "Sécrétaire général bureau executif national",
      description: "sécrétaire en tète du bureau executif national",
      organe: "Bureau exécutif national",
    },
  ]);

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
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },

    {
      accessorFn: (row) => row.id, //simple recommended way to define a column
      header: "Permissions",
      muiTableHeadCellProps: { sx: { color: "#475569", fontSize: 16 } }, //optional custom props
      Cell: ({ cell }) => (
        <p className="text-secondary hover:underline hover:cursor-pointer flex items-center">
          <BsEye className="mr-1 " /> <span>Visualiser</span>
        </p>
      ), //optional custom cell render
    },
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setRoleInfo({ ...roleInfo, [name]: value });
  };

  const handleAdd = () => {
    setIsLoading(true);
    setRoleInfo({...roleInfo, idOrgane:organsList.find((elt) =>elt.nom=== roleInfo.organe).id})
    setTimeout(() => {
      setData([...data, {...roleInfo}]);
      setIsLoading(false);
      handleClose();
      toast.success("Nouveau role ajouté", {
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
      <RolesModal
        open={open}
        addRole={handleAdd}
        isLoading={isLoading}
        handleClose={handleClose}
        handleChange={handleChange}
        data={roleInfo}
        organsList ={organsList}
      />
      <ToastContainer />
    </div>
  );
};

export default RolesList;
