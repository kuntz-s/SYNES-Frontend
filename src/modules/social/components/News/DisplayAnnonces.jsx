import React from "react";
import { useNavigate } from "react-router";
import { dateInFrench } from "../../../../components/Constant";
import noProfile from "../../../../assets/img/profile1.png";

const temp = [
  {
    id: 3,
    titre: "un titre",
    contenu: "un contenu",
    typeAnnonce: "",
    posteLe: "2023-07-09T04:32:29",
    membre: {
      id: 1,
      matricule: "12x034euy1",
      noms: "tchuente",
      prenom: "micaelle",
      email: "nzouetengmicaelle@gmail.com",
      photo: null,
      motdepasse:
        "$2a$10$/xuv7CJ4/7rCVJUYXU0YGe7br0gAsKiqNSsy20/DULDAgStpEXTHa",
      universite: {
        id: 10,
        nom: "Université de yaoundé 1",
        localisation: "Yaoundé",
        logo: null,
      },
      avertissement: null,
      role: {
        id: 1,
        nom: "Secretaire Congres",
        description:
          "porte parole de l'organe du congres qui sera en charge la création des différents postes y relatifs et aussi des différentes universités participantes du SYNES",
        organe: {
          id: 1,
          nom: "congres",
          description: "organe supreme du syndicat",
          fondAlloue: 1000000,
          universite: {
            id: 0,
            nom: null,
            localisation: null,
            logo: null,
          },
        },
      },
      suspendu: 0,
      dateInscription: "2010-10-10T10:10:10",
    },
  },
];

const images = [
  {
    value:
      "https://firebasestorage.googleapis.com/v0/b/synes-8e5b2.appspot.com/o/d2ec0afb-eb0c-43aa-8172-f9e76d697278jpg?alt=media&token=3aa66789-4dcc-42c8-876f-48619a96d49a",
  },
];
const DisplayAnnonces = ({ annonces, images }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-6">
      {annonces.map((annonce,id) => {
        const date = dateInFrench(new Date(annonce.posteLe));
        const image = images.find(elt => annonce.id === elt.id)
        return (
          <div className="mt-2 mb-6 border border-slate-200 shadow shadow-md rounded-md py-3" key={id}>
            <div className="flex px-4 items-start">
              <div>
                <img
                  src={annonce.membre.photo ? annonce.membre.photo : noProfile}
                  className="rounded-full w-[50px] h-[50px] object-cover mx-auto"
                />
              </div>
              <div className="ml-3 flex justify-between items-center w-full">
                <div className="leading-5 ">
                  <p
                    className="capitalize text-[18px] font-bold hover:cursor-pointer"
                    onClick={() =>
                      navigate("/social/profil/" + annonce.membre.id)
                    }
                  >
                    {annonce.membre.noms + " " + annonce.membre.prenom}{" "}
                  </p>
                  <p className="text-secondary text-md font-medium">
                    {annonce.membre.role.nom}
                  </p>
                  <p className="text-sm italic ">
                    publié le {date.jour + " " + date.moisComplet + " à "+date.heure + ":" +date.minute}
                  </p>
                </div>
                <p className="mr-2 text-secondary hover:underline hover:cursor-pointer font-medium"  onClick={() =>
                      navigate("/social/profil/" + annonce.membre.id)
                    }>Voir profil</p>
              </div>
            </div>

            <div className="px-4 mt-4">
                <p className="uppercase text-lg font-bold">{annonce.titre}</p>
                <p className="text-md text-slate-800">{annonce.contenu}</p>
            </div>
            {
                image && (
                    <img src={image.value} alt="annonce image" className="bg-slate-100 px-4 w-full h-[300px] object-cover mt-2 rounded-md"/>
                )
            }
          </div>
        );
      })}
    </div>
  );
};

export default DisplayAnnonces;
