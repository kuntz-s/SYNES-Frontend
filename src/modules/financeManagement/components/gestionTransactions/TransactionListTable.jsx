import React from "react";
import { BsPlus, BsPrinter } from "react-icons/bs";
import StatTitle from "../../../../components/baseComponents/StatTitle";
import Button from "../../../../components/baseComponents/Button";
import MaterialTable from "../../../../components/baseComponents/MaterialTable";

const trans = {
  id: 1,
  montant: 10000,
  type: "ajout",
  raison: "Cotisation",
  membre: {
    id: 0,
    matricule: null,
    noms: null,
    prenom: null,
    email: null,
    photo: null,
    motdepasse: null,
    universite: null,
    avertissement: null,
    role: null,
    suspendu: 0,
    dateInscription: null,
  },
  evenements: {
    id: 3,
    nom: "Cotisation juin 2023",
    dateDebut: "2023-06-01",
    dateFin: "2023-07-01",
    description: "Cotisation pour le mois de juin 2023",
    membre: {
      id: 0,
      matricule: null,
      noms: null,
      prenom: null,
      email: null,
      photo: null,
      motdepasse: null,
      universite: null,
      avertissement: null,
      role: null,
      suspendu: 0,
      dateInscription: null,
    },
    photo: "2",
  },
};

const TransactionListTable = ({ data, handleOpen }) => {
    const columns = [
        {
          accessorFn: (row) => row.id, //simple recommended way to define a column
          header: "Id transaction",
          muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
          Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
        },
        
        {
            accessorFn: (row) => row.membre, //simple recommended way to define a column
            header: "Membre",
            muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
            Cell: ({ cell }) => <span >{cell.getValue().noms} {cell.getValue().prenom}</span>, //optional custom cell render
          },
        {
          accessorFn: (row) => row.montant, //simple recommended way to define a column
          header: "Montant",
          muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
          Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
          // size:258
        },
        {
          accessorFn: (row) => row.type, //simple recommended way to define a column
          header: "Type",
          muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
          Cell: ({ cell }) => <span className={`capitalize font-medium ${cell.getValue() === "retrait"?"text-red-400":"text-green-400"}`}>{cell.getValue()}</span>, //optional custom cell render
        },
        {
          accessorFn: (row) => row.raison, //simple recommended way to define a column
          header: "Raison",
          muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
          Cell: ({ cell }) => <span >{cell.getValue()}</span>, //optional custom cell render
        },
        {
          accessorFn: (row) => row.evenements, //simple recommended way to define a column
          header: "Evènement",
          muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
          Cell: ({ cell }) => <span >{cell.getValue().nom} </span>, //optional custom cell render
        },
      ];
      
    
      return (
        <div className="bg-white w-full  p-4 rounded-xl h-fit overflow-hidden mt-8">
          <div className="flex flex-col md:flex-row  justify-between mt-2">
            <StatTitle
              title={`Nombre de transactions ${data ? data.length : 0}`}
            />
            <div className="flex ">
              <Button
                title="Nouvelle transaction"
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
              data={data}
              columnsList={columns}
              name="Evènements"
              hideEdit={true}
              hideDelete={true}
            />
          </div>
        </div>
      );
    };
    
    export default TransactionListTable;
    