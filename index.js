
const express=require("express")
const mongodb=require ("mongodb")
const MongoClient =mongodb.MongoClient
const app=express()
let db
app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))
app.use(express.json)

MongoClient.conect("mongodb://127.0.0.1:27017",{ useNewUrlParser: true, useUnifiedTopology: true }, function(err,client){
    if(err!==null){
        console.log(err)
    }else{
        db= client.db("libros")
    }

})

app.get("/api/libros", function (req,res){
    db.collection("libros").find().toArray(function(error,datos){//ToArray lo convierte en un array que podemos recorrer
        if(error!==null){//si se gera un error en la recepcion de datos nos muestra el error
            res.send({error:true, mensaje: "error" + err})
        }else{
            res.send({error:false, contenido: datos})//el obejto datos es el que luego recorreremos
        }
    })
})

app.get("/api/libros/:titulo", function (req,res){//el regex es patron de texto y nos permite buscar no literal
    db.collection("libros").find({titulo:{$regex:' ${req.params.titulo}'}}).toArray(function(error,datos){
        if(error!==null){
            res.send({error:true, mensaje: "error" + err})
        }else{
            res.send({error:false, contenido: datos})
        }
    })
})

app.post("/api/nuevoLibro/:titulo", function (req, res) {
    db.collection("libros").insertONe({titulo: req.params.titulo, estado: "sin leer "},function(error, respuesta){
        if(error!==null){//mandamos respuesta por si va bien o mal
          console.log(error)
          res.send({error:true, mensaje: error})
        }else{
          res.send({error:false, mensaje:respuesta})
        }
      })
    

  })

  app.put(" /api/editarLibro/:titulo", function(res,req){
    db.collection("libros").updateOne({titulo: req.params.titulo}, {$set: {estado:"Leido"}},function(error, respuesta){
      if(error!==null){//mandamos respuesta por si va bien o mal
        console.log(error)
        res.send({error:true, mensaje: error})
      }else{
        res.send({error:false, mensaje:respuesta})
      }
    })
})
  
   
  app.delete("/api/borrarLibro/:titulo", function(res,req){
    db.collection("libros").deleteOne({titulo:(req.params.titulo)}, function(error, respuesta){
      if(error!==null){
        console.log(error)
        res.send({error:true, mensaje: error})
      }else{
        res.send({error:false, mensaje:respuesta})
      }
    })
  
   
    })

app.listen(3000)