import { supabaseClient } from "../CRUD/conexion.js"
export async function getHandleAvatarController(req,res) {

    // ruta para acceder al bucket de avatars
    const ruteToAvatar = "https://lwegixlqtccivrkuxjse.supabase.co/storage/v1/object/public/userAvatars/avatars/"

    try {
        const {data,error} = await supabaseClient.storage.from("userAvatars").list("avatars")

        if(data){
            const avatars = data.map(avatar=>{

            const image = ruteToAvatar + avatar.name
            return {name: avatar.name,image:image}
            })

            return res.status(200).json({avatars:avatars})
        }

        return res.status(204).end()
        
    } catch (error) {

        return res.status(500).json({error:{ message: "Error al obtener los avatars"}})
        
    }
    
}




export async function getSingleAvatarUrl(avatarname) {

    try {
        const {data,error} = await supabase.storage.from("userAvatars").getPublicUrl(`avatars/${avatarname}`)  
        console.log(data)

        return data
    } catch (error) {
        return {error:"Error al obtener la url del archivo"}
    }
    
}