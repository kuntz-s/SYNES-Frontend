import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { getPiecesJointes } from "../../services/annonceService";


const ProfileAnnonce = ({ data }) => {
  const navigate = useNavigate();
  const [listImages, setListImages] = useState([])
  useEffect(() => {
    if (data.annonceList.length > 0) {
      const listImagesAnnonce = async () => {
        var res = [];
        localStorage.setItem("fileType", false);
        for (let elt of data.annonceList) {
          const image = await getPiecesJointes(elt.id);
          res.push({
            id: image.data[0].idAnnonce,
            value: image.data[0].url,
          });
        }
        setListImages(res);
      };
      listImagesAnnonce();
    }
  }, [data.annonceList]);
  return (
    <section className="w-full mt-4">
      {data.annonceList.length === 0 ? (
        <div className="h-[20vh] flex flex-col justify-center items-center">
          <p className="text-lg">Aucune annonce publiée pour le moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-8">
          {
            listImages.map((image,id) => {
              return(
                <img src={image.value} key={id} className="bg-slate-100 w-full h-[200px] object-cover hover:cursor-pointer " onClick={() => navigate("/social/actualite")} />
              )
            })
          }
        </div>
      )}
    </section>
  );
};

export default ProfileAnnonce;
