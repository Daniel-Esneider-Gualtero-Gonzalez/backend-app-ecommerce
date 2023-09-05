import { getUserGroups } from "../utils/supabase/Users/allget/getUserGroups.js";
import { getGroups } from "../utils/supabase/Users/allget/getUserGroups.js";

import { createGroup } from "../CRUD/groups/groups.js";
import { userGroup } from "../utils/supabase/Users/allpost/userGroups.js";
import { deleteGroup } from "../utils/supabase/Users/alldeletes/delgroup.js";

// manejador de /user/groups/:iduser
export async function handleUserGroups(iduser,res) {

    //  trae la lista de grupos que tiene el usuario
  const getListgroups = await getUserGroups(iduser)

  if (getListgroups.error) return res.status(500).json({message:"Error al obtener los grupos"})
  if(getListgroups.length < 1) return res.status(404).json({message:"no se encontraron grupos"})

  // dejamos solo el id de los grupos en un array
  const listGroups = getListgroups.map(group => group.group_id)
 
  // pasamos la lista de los grupos del usuario
  const groups = await getGroups(listGroups)

  if (groups.message) return res.status(500).json({message:"Error al obtener los grupos"})

  return res.status(200).json(groups)

    
}


// manejador de la ruta: /user/groups/create/ QUE CREA UN GRUPO


export async function handleGroupCreate(data,res) {
  
  const {created_by,name} = data

  // devuelve el id del grupo creado si todo es succes 
  const group = await createGroup(data)
  
  if (group.error) return res.status(500).json(response)

  
  //insercion en la tabla users_groups pasamos id del usuario y el id nuevo grupo creado
  const users_groups = await userGroup(created_by,group)

  
  if (users_groups.error){
    // si falla la insercion en la tabla intermedia eliminamos el grupo creado
    const deleGroup =  await deleteGroup(group)

    if (!deleGroup) return res.status(500).json({error:"No se puedo crear el grupo error interno "})
  }
  
  res.status(201).json({message:"Grupo creado exitosamente"})


}