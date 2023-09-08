import { supabaseClient } from "../../../CRUD/conexion.js";

export async function createPoster(dataposter) {
    
    const {id_user,title,description} = dataposter

    try {
        const {data,error} = await supabaseClient.from('posters').insert({
            id_user,title, description
        }).select('id')
        if(error) throw Error("Error al crear el poster")
        
        // devuelve el id del nuevo poster creado
        return data[0].id
    } catch (error) {

        return false
    }
}


export async function createPosterCategories(posterid,listcategories) {

    
    // creamos la estructura  para insertarlos a la tabla intermedia
    const posterCategories = listcategories.map(cateid =>{
        return {poster_id:posterid,category_id:cateid}
    })
     console.log("estructure insert categories", posterCategories)
    try {
        const {error} = await supabaseClient.from('poster_category').insert(posterCategories)

        console.log("error", error)
        if(error) throw Error("Error al crear las categorias del poster")
        

        return {success:true}

    } catch (error) {
        return {error: `Error al crear la categorias del poster`}
    }

}


export async function categoriPosterExist(categories) {

    try {
        const {data,error} = await supabaseClient.from('categories_poster').select('id').in('id',categories)

        // cramos un nuevo array solo con el id de las categorias de la bd
        const cateListBd = data.map(cate => cate.id)
        
        // si la categoria que me enviaron no existe retornamos un error
        for (const cate of categories) {
            if(cateListBd.indexOf(cate) === -1) return {message:`La categoria ${cate} no existe`}
        }

        
        return {success:true}
    } catch (error) {
        return {error:"Error al agregar categorias al poster"}
    }
    
}