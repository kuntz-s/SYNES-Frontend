import React from "react";
import { BsPlus, BsPrinter } from "react-icons/bs";
import {ExportToCsv} from "export-to-csv";
import StatTitle from "../../../../components/baseComponents/StatTitle";
import Button from "../../../../components/baseComponents/Button";
import MaterialTable from "../../../../components/baseComponents/MaterialTable";
import event from "../../../../assets/img/event.svg";
import event1 from "../../../../assets/img/event1.jpg";
import event2 from "../../../../assets/img/event2.jpg";

const imgList = [
  {
    id: 0,
    img: event,
  },
  {
    id: 1,
    img: event1,
  },
  {
    id: 2,
    img: event2,
  },
]; 

var stompClient=null;

const EventListTable = ({ data, handleOpen,handleDelete }) => {



  const columns = [
    {
      accessorFn: (row) => row.photo, //simple recommended way to define a column
      header: "Illustration",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => (
        <div className="w-full">
          {(
            <img
              src={imgList[parseInt(cell.getValue())].img}
              alt="photo évènement"
              className=" mx-auto rounded-full object-cover w-14 h-14"
            />
          )}
        </div>
      ), //optional custom cell render
      size: 10,
    }, 
    {
      accessorFn: (row) => row.nom, //simple recommended way to define a column
      header: "Nom",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorFn: (row) => row.description, //simple recommended way to define a column
      header: "Description",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
      // size:258
    },
    {
      accessorFn: (row) => row.dateDebut, //simple recommended way to define a column
      header: "Début de l'évènement",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorFn: (row) => row.dateFin, //simple recommended way to define a column
      header: "Fin de l'évènement",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => <span >{cell.getValue()}</span>, //optional custom cell render
    },
    {
      accessorFn: (row) => row.membre, //simple recommended way to define a column
      header: "Créé par",
      muiTableHeadCellProps: { sx: { color: "#475569" } }, //optional custom props
      Cell: ({ cell }) => <span >{cell.getValue().noms} {cell.getValue().prenom}</span>, //optional custom cell render
    }
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
  

  return (
    <div className="bg-white w-full  p-4 rounded-xl h-fit overflow-hidden mt-8">
      <div className="flex flex-col md:flex-row  justify-between mt-2">
        <StatTitle
          title={`Nombre d'évènements ${data ? data.length : 0}`}
        />
        <div className="flex ">
          <Button
            title="Nouvel évènement"
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
      <div className="my-4 ">
        <MaterialTable
          data={data}
          columnsList={columns}
          name="Evènements"
          hideEdit={true}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default EventListTable;
