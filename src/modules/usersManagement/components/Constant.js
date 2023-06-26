export const availableRolesList = (roles , members, user, restrict) => {
  var newRoles = roles;
  var res = [];
    newRoles = roles.filter((role)=> role.organe.universite.id === user.membre.universite.id);
    if(!restrict) {
      const temp = roles.filter((role)=> role.organe.universite.id === 0);
      newRoles = [...newRoles , ...temp]
    }
  
    for(let role of newRoles ){
      const verify = members.find((elt)=> elt.membre.role.id === role.id);
      if(!verify || (verify && role.nom.includes("Membre")) || (role.id === user.membre.role.id)){
        res.push(role)
      } 
    }
  return res;
}
export const transformRolesData = (roles) => {
  var res = [];

  for (let role of roles){
    res.push({
      name:role.nom,
      value:role.id
    })
  }
  return res;
}
