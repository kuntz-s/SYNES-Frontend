import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserProfile } from "../services/userProfileService";
import ProfileInfo from "../components/userProfile/ProfileInfo";
import ProfileAnnonce from "../components/userProfile/ProfileAnnonce";
import ProfileWarning from "../components/userProfile/ProfileWarning";
import ProfileTransaction from "../components/userProfile/ProfileTransaction";


const profileSections = ["Annonces", "Transactions", "Avertissements"]

const UserProfile = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedSection,setSelectedSection] = useState(profileSections[0])
  const [userData, setUserData] = useState(false);
  //params.profileId

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data, status } = await getUserProfile(params.profileId);
        console.log("data", data);
        if (status === 200 && data.membre.id > 0) {
          setUserData(data);
        } else {
          setIsError(true);
        }
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(true);
      }
    };
    getProfileData();
  }, []);

  return (
    <section>
      {isLoading ? (
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <CircularProgress size="45px" color="inherit" />
          <p className="mt-4 ">Chargement ....</p>
        </div>
      ) : isError ? (
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <p className="font-bold text-3xl">Profil non existant</p>
        </div>
      ) : (
        <section className=" min-h-screen overflow-y-auto w-[85%] py-8 mx-auto">
          <ProfileInfo data={userData} />
          <div className="border-t border-slate-300 my-16">
            <div className="flex justify-around ">
              {
                profileSections.map((section,id) => {
                  return(
                    <p className={`px-4 py-2 border-t-2 uppercase text-md  ${selectedSection === section  ? "border-primary text-primary font-medium":"text-slate-600  font-regular border-white hover:cursor-pointer hover:text-primary"}`} key={id} onClick={() => setSelectedSection(section)}>{section}</p>
                  )
                })
              }
            </div>
            <div className={selectedSection !== profileSections[0] && "hidden"}>
            <ProfileAnnonce data={userData}/>
            </div>
           <div className={selectedSection !== profileSections[1] && "hidden"}>
            <ProfileTransaction data={userData}/>
            </div>
            <div className={selectedSection !== profileSections[2] && "hidden"}>
            <ProfileWarning data={userData}/>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default UserProfile;
