import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { BiEditAlt } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../../../../components/baseComponents/Button";
import { verifyEquivalence } from "../Constants";

const PermissionCheckbox = ({ permissions, rolePermissions, handleModify, isLoading }) => {
  const [permissionsList, setPermissionsList] = useState([]);

  const handleAdd = () => {
    const checkedPermissions = permissionsList.filter((elt) => elt.checked === true);
  if(verifyEquivalence(rolePermissions, checkedPermissions)){
    toast.error("Veuillez devez modifier au moins un champ par rapport aux roles déjà entrés", {
      position: "top-center",
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  } else {
    handleModify(checkedPermissions)
  }
  };

  useEffect(() => {
    if (permissions.length > 0) {
      var newPermissions = [];
      for (let elt of permissions) {
        const verify = rolePermissions.find(
          (permission) => permission.id === elt.id
        );
        elt = { ...elt, checked: verify ? true : false };
        newPermissions.push(elt);
      }

      setPermissionsList(newPermissions);
    }
  }, [permissions, rolePermissions]);

  const handleChange = (e, id) => {
    const newPermissions = [...permissionsList];
    newPermissions[id] = {
      ...newPermissions[id],
      checked: !newPermissions[id].checked,
    };
    setPermissionsList(newPermissions);
  };
  return (
    <section className="">
      <div className="flex justify-center">
        <FormGroup>
          {permissionsList.map((permission, id) => {
            return (
              <FormControlLabel
                key={permission.id}
                name={permission.nom}
                control={
                  <Checkbox
                    checked={permission.checked}
                    onChange={(e) => {
                      handleChange(e, id);
                    }}
                  />
                }
                color="success"
                label={permission.nom}
              />
            );
          })}
        </FormGroup>
      </div>

      <div className="mt-4">
        <Button
          title="Modifier"
          icon={<BiEditAlt className="mr-2 scale-[1.2]" />}
          handleClick={handleAdd}
          filled={true}
          loading={isLoading}
          className="mx-auto py-2 font-semibold bg-secondary border-secondary hover:bg-white hover:shadow-md hover:text-secondary rounded-md"
        />
      </div>
    </section>
  );
};

export default PermissionCheckbox;
