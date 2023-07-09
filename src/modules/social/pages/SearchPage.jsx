import React, { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import Helmet from "../../../components/Helmet/Helmet";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { getMembersList } from "../../../redux/gestionMembreSlice";
import { AutoComplete } from "../../../components/baseComponents/Autocomplete";
import noProfile from "../../../assets/img/profile1.png";


const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { members } = useSelector((state) => state.gestionMembre);
  const [isLoading, setIsLoading] = useState(false);
  const [membersList, setMembersList] = useState([])
  const [searchMember, setSearchMember] = useState("");

  useEffect(() => {
    if(members.length === 0){
        dispatch(getMembersList());
    } else {
        setMembersList(members.filter((mem) => mem.id !== 0 ))
    }
  }, [members]);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {setIsLoading(false)},1000);
    if(searchMember){
        let newMembersList = membersList;
    newMembersList = members.filter((elt)=> elt.id !== 0 && ((elt.membre.noms + " " + elt.membre.prenom).includes(searchMember)));
    setMembersList(newMembersList)
    } else {
        setMembersList(members.filter((mem) => mem.id !== 0 ))
    }
  };

  return (
    <HelmetProvider>
      <Helmet
        title="Synes-Recherche"
        description="page de recherche du synes"
      />
      <section className="p-4 md:p-8">
        <div className="text-center">
          <p className=" text-3xl font-extrabold text-secondary">
            Rechercher un membre
          </p>
          <p className=" mt-1 text-lg text-slate-600 ">
            Liste des membres du SYNES toute université confondu
          </p>
        </div>
        <div className="w-full bg-white mt-4">
                <AutoComplete
                  icon={
                    <FaSearch
                      className="cursor-pointer hover:text-secondary scale-[1.3]  "
                      onClick={handleSearch}
                    />
                  }
                  iconEnd
                  dataList={members
                    .filter((mem) => mem.id !== 0)
                    .map((elt) => `${elt.membre.noms} ${elt.membre.prenom}`)}
                  value={searchMember}
                  handleChange={(e) => setSearchMember(e)}
                  placeholder="Rechercher un membre par son nom ou prénom"
                  color="#D9D9D9"
                  style={{ borderRadius: "30px" }}
                />
              </div>
        <div>
          {isLoading && (
            <div className="min-h-[30vh] md:min-h-[40vh] flex justify-center items-center">
              <CircularProgress style={{ color: "#048B9A" }} size={50} />
            </div>
          )}
          {!isLoading && (
            <div>
              
              <div>
                <p className="text-center mt-6 font-bold text-lg">{membersList.length> 0?((membersList.length )+  " membres trouvés" ):" Aucun membre trouvé"}</p>
                <div className="grid grid-cols-5 gap-8 mt-4">
                    {membersList.map((member) => {
                        return(
                            <div key={member.id} className="border border-slate-100 shadow shadow-md rounded-md p-2 hover:cursor-pointer hover:shadow-lg" onClick={() => navigate("/social/profil/"+member.id)}>
                                    <img src={member.membre.photo ? member.membre.photo : noProfile} className="rounded-full w-[130px] h-[130px] object-cover mx-auto" />
                                    <div className="text-[15px] text-center font-medium text-slate-800 ">
                                    <p className="uppercase">{member.membre.noms}</p>
                                    <p className="lowercase">{member.membre.prenom}</p>
                                    </div>
                                </div>
                        )
                    })}

                </div>
                </div>
            </div>
          )}
        </div>
      </section>
    </HelmetProvider>
  );
};

export default SearchPage;
