import React, { useEffect, useState } from "react";
import {BsCash} from "react-icons/bs";
import { HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { createAnnonce, createPieceJointe, getPiecesJointes } from "../services/annonceService";
import { getAnnonces } from "../../../redux/gestionAnnonceSlice";
import Helmet from "../../../components/Helmet/Helmet";
import NewsModal from "../components/News/NewsModal";
import DisplayAnnonces from "../components/News/DisplayAnnonces";
import noProfile from "../../../assets/img/profile1.png";
import { toast } from "react-toastify";

const NewsPage = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  const { annoncesList } = useSelector((state) => state.gestionAnnonce);
  const { solde } = useSelector((state) => state.gestionSolde);
  const [openModal, setOpenModal] = useState(false);
  const [annonceInfo, setAnnonceInfo] = useState({
    titre: "",
    contenu: "",
    typeAnnonce: "",
    image: "",
    originalImage: "",
  });
  const [listImages, setListImages ] = useState([])
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (annoncesList.length === 0) {
      dispatch(getAnnonces());
    } else {
      const listImagesAnnonce = async() => {
        var res = []
        localStorage.setItem("fileType", false);
        for(let elt of annoncesList){
          const image = await getPiecesJointes(elt.id);
          res.push({
            id:image.data[0].idAnnonce,
            value:image.data[0].url
          })
        }
        setListImages(res)
      }
      listImagesAnnonce()
    }
  }, [annoncesList]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "image" && value) {
      const image = e.target.files[0];
      setAnnonceInfo({
        ...annonceInfo,
        image: URL.createObjectURL(image),
        originalImage: image,
      });
    } else {
      setAnnonceInfo({ ...annonceInfo, [name]: value });
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      setStep(2);
    } else {
      setIsLoading(true);
      try {
        const res = await createAnnonce({
          titre: annonceInfo.titre,
          contenu: annonceInfo.contenu,
          typeAnnonce: annonceInfo.typeAnnonce,
        });
        if (res.status === 200) {
          const id = res.data.id;
          var formData = new FormData();
          formData.append("id", id);
          formData.append("file", annonceInfo.originalImage);
          try {
            const upload = await createPieceJointe(formData);
            if (upload.status === 200) {
              handleClose();
              toast.success("Créeation de l'annonce effectuée succès");
              dispatch(getAnnonces());      
              localStorage.setItem("fileType", false);
            }
            setIsLoading(false);
          } catch (error) {
            toast.error("une erreur est survenue lors du post de l'image");
            setIsLoading(false);
          }
        } else {
          toast.error(
            "une erreur est survenue lors de la création de l'annonce"
          );
          setIsLoading(false);
        }
      } catch (error) {
        toast.error("une erreur est survenue lors de la création de l'annonce");
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setAnnonceInfo({
      titre: "",
      contenu: "",
      typeAnnonce: "",
    });
    setOpenModal(false);
    setStep(1);
  };

  return (
    <HelmetProvider>
      <Helmet
        title="Synes-Actualité"
        description="page des actualités du synes"
      />
      <section className="p-4 md:px-32 md:py-8 grid grid-cols-6 gap-8  w-full min-h-screen">
        <div className="col-span-4 ">
          <div className="border border-slate-200 shadow shadow-sm px-4 py-2 rounded-md flex items-center  ">
            <div>
              <img
                src={user.membre.photo ? user.membre.photo : noProfile}
                className="rounded-full w-[55px] h-[55px] object-cover mx-auto"
              />
            </div>
            <p
              className="rounded-full py-2 px-4 bg-slate-100 w-full ml-2 text-slate-500 hover:cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              Créer une nouvelle annonce
            </p>
           
          </div>
          <DisplayAnnonces annonces={annoncesList} images={listImages}/>
        </div>
        <div className="col-span-2">
          <div className="border border-slate-200 rounded-md shadow shadow-md p-2 text-center">
            <p className="font-light text-md">Solde bancaire</p>
            <p className=" font-medium text-2xl">{solde} frc</p>
          </div>
        </div>
        <NewsModal
          open={openModal}
          nextStep={nextStep}
          handleClose={handleClose}
          data={annonceInfo}
          step={step}
          isLoading={isLoading}
          handleChange={handleChange}
        />
      </section>
    </HelmetProvider>
  );
};

export default NewsPage;
