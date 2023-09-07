import { supabaseClient } from "../../../CRUD/conexion.js";

export async function createPoster(dataposter) {
    
    const {id_user,title,description} = dataposter

    try {
        const {data,error} = await supabaseClient.from('posters').insert({
            id_user,title, description
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


export async function categoriPosterExist(categories) {

    try {
        const {error} = await supabaseClient.from('categories_poster').select('id').in(categories)
        // tengo que comparar que el id de las categorias que me envien
        // se encuentre en las categorias de la bd que me arrojo
    } catch (error) {
        
    }
    
}