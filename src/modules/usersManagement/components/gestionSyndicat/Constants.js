export const verifyEquivalence = (rolePermissions , newPermissions ) => {
    if(rolePermissions.length !== newPermissions.length  ){
        return false;
    } else {
        var equivalent = true;
      if(rolePermissions.length === 0 && newPermissions.length === 0){
        return true
      } else {
        for(let perm of rolePermissions){
            const permissionSearch = newPermissions.find(elt=>elt.id === perm.id);
            if(!permissionSearch ){
                equivalent = false;
                break;
            }
            
        }
        return equivalent;
      }
    }
}