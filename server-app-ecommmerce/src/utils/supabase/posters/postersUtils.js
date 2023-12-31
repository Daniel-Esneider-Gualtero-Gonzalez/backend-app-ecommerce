import { supabaseClient } from "../../../CRUD/conexion.js";


// function utils gets de posters

export async function getAllPosters() {
    
    try {
        const {data,error}= await supabaseClient.from('posters').select()

        if (error) throw Error("Error al obtener todos los posters")

        return data
    } catch (error) {

        return {error:"Error al obtener todos los posters"}
    }
}

export async function getPostersByUser(iduser) {
    
    try {
        const {data,error} = await supabaseClient.from('posters').select().eq('id_user',iduser)

        if (error) throw Error("Error al obtener  los posters del usuario")

        return data
    } catch (error) {

        return {error:"Error al obtener  los posters del usuario"}
    }
}






//  funtion que crea un poster
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

//  crea las categorias de un poster
export async function createPosterCategories(posterid,listcategories) {

    
    // creamos la estructura  para insertarlos a la tabla intermedia
    const posterCategories = listcategories.map(cateid =>{
        return {poster_id:posterid,category_id:cateid}
    })
     
    try {
        const {error} = await supabaseClient.from('poster_category').insert(posterCategories)

        
        if(error) throw Error("Error al crear las categorias del poster")
        

        return {success:true}

    } catch (error) {
        return {error: `Error al crear la categorias del poster`}
    }

}

// verifica que las categorias de posters existen
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

// crea un comentario para el poster

export async function createPosterComment(idposter,comment) {
    
    try {
        const {error} = await supabaseClient.from('posters_comentaries').insert({
            poster_id: idposter,
            comment:comment
        })

        if(error) throw Error("Error al crear el comentario")

        return {success: "Comentario creado exitosamente"}

    } catch (error) {
        return {error:"Error al crear el comentario"}
    }
}



//  verifica si un poster existe

export async function posterExist(idposter) {
    
    try {
        const {data,error} = await supabaseClient.from('posters').select().eq('id',idposter)

        if (error) throw Error("Error al verificar si el poster existe")

        return data.length > 0 ? true : false

    } catch (error) {
        return {error: "Error al verificar si el poster existe"}
    }
}