import { supabaseClient } from "../../../CRUD/conexion";

export async function createPoster(iduser,title,description) {
    

    try {
        const {data,error} = await supabaseClient.from('posters').insert({
            iduser,title, description
        }).select('id')
        if(error) throw Error("Error al crear el poster")
        
        // devuelve el id del nuevo poster creado
        return data
    } catch (error) {

        return false
    }
}


export function cretePosterCategories(posterid,listcategories) {
    // creamos la estructura  para insertarlos a la tabla intermedia
    const posterCategories = listcategories.map(cateid =>{
        return {poster_id:posterid,category_id:cateid}
    })

    try {
        const {error} = supabaseClient.from('poster_category').insert(posterCategories)
        if(error) throw Error("Error al crear las categorias del poster")

        return true

    } catch (error) {
        return false
    }

}