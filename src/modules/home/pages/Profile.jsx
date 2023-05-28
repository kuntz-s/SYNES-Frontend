import React, { useState, useMemo, useCallback, useContext} from "react";
import Image from 'next/image'; //dossier des images 
import {useDropzone} from 'react-dropzone';
//pour le formulaire
import {HiOutlineMail} from 'react-icons/hi';
import {TiSocialFacebook, TiSocialTwitter, TiSocialInstagram} from 'react-icons/ti';


//import images from '../../../assets';


const Profile = () => {
    const[fileURL, setFileUrl] =useState(null)

    const onDrop = useCallback(async (acceptedFile)=>{
        setFileUrl(acceptedFile[0]);
    }, []);

    const {getRootProps, getInputsProps } = useDropzone({
        onDrop,
        accept: "image/*",
        maxSize: 5000000,
    });
    
    return(
    <div className="profile">
        <div className="profile_info">
            <h1>Profile settings</h1>
            <p> To modify what ever you need!!</p>            
        </div>

        <div className="profile_box">
            <div className="profile_box_img" {...getRootProps()}>
                <input {...getInputsProps()} />
                <Images src={images.profil1} alt="profile upload" width={150} height={150} className="profile_box_img_img" />
            </div>
            <p className="profile_box_img_para">Change Image</p>
        </div>

        <div className="profile_box_form">
            <div className="profile_form">
                <div className="profile_form_box">
                    <form>
                        <div className="profile_form_input">
                            <Label htmlFor="name">Username</Label>
                            <input type="text" placeholder="zenedineZidanne" className="profile_form_box_input_userName" />
                        </div>

                        <div className="profile_form_box_input">
                            <Label htmlFor="email">Email</Label>
                            <div className="profile_form_box_input_box">
                                <div className="profile_form_box_input_box_icon">
                                    <HiOutlineMail />
                                </div>
                                <input type="text" placeholder="Email" />
                            </div>
                        </div>

                        <div className="profile_form_box_input_social">
                            <div className="profile_form_box_input">
                                <Label htmlFor="facebook">Facebook</Label>
                                <div className="profile_form_box_input_box">
                                    <div className="profile_form_box_input_box_icon">
                                        <TiSocialFacebook />
                                    </div>
                                    <input type="text" placeholder="http://lala" />
                                </div>
                            </div>

                            <div className="profile_form_box_input">
                                <Label htmlFor="twitter">Twitter</Label>
                                <div className="profile_form_box_input_box">
                                    <div className="profile_form_box_input_box_icon">
                                        <TiSocialTwitter />
                                    </div>
                                    <input type="text" placeholder="http://lala" />
                                </div>
                            </div>

                            <div className="profile_form_box_input">
                                <Label htmlFor="instagram">Instagram</Label>
                                <div className="profile_form_box_input_box">
                                    <div className="profile_form_box_input_box_icon">
                                        <TiSocialInstagram />
                                    </div>
                                    <input type="text" placeholder="http://lala" />
                                </div>
                            </div>
                        </div>

                        <div className="profile_form_box_btn">
                            <button>Upload profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>)
}


export default Profile