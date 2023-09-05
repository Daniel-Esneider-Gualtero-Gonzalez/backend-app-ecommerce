import { getUserGroups } from "../utils/supabase/Users/allget/getUserGroups.js";
import { getGroups } from "../utils/supabase/Users/allget/getUserGroups.js";

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