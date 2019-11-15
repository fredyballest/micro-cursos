const mongoose = require('mongoose')
const { Schema } = mongoose

const cursoSchema = new Schema({
    sucursalcurso:String, 
        nombrecurso:String, 
        cod_curso:String,
        cantidad:String,
        instructor:String, 
        dateSent:Date

})

mongoose.model('cursos', cursoSchema)