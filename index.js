const express = require("express")
const mongoose = require('mongoose')
const keys = require('./config/keys')
const bodyParser = require('body-parser');


const app = express()
app.use(bodyParser.json());

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true })


require('./models/Cursos')

const Cursos = mongoose.model('cursos');

app.get('/api/todocurso/',(req,res) => {
    
  Cursos.find(function(err, cursos) {
        //Si hay un error, lo regresamos
        if (err){
          res.send(err);
        }
        //Si no hay errores, regresamos los registros
        res.json(cursos);
      });

    
})

app.get('/api/selectcurso/:idcurso', async (req,res) => {
    console.log(req.params.idcurso)
    var myquery = { cod_curso: req.params.idcurso };  
    await Cursos.find(myquery,function(err, cursos) {
          //Si hay un error, lo regresamos
          if (err){
            res.send(err);
          }
          //Si no hay errores, regresamos los registros
          res.json(cursos);
        });
  
      
  })

app.get('/api/deletecurso/:Iddelete', async (req,res) => {
  console.log(req.params.Iddelete)
  var myquery = { cod_curso: req.params.Iddelete };
  await Cursos.deleteOne(myquery)
   res.send({message:'Curso borrado exitosamente'})
})



app.post('/api/addcurso', async (req,res) => {
    console.log(req.body)
    const { sucursalcurso, nombrecurso, cod_curso, cantidad,instructor } = req.body;

    const curso = new Cursos({
        sucursalcurso, 
        nombrecurso, 
        cod_curso, 
        cantidad,
        instructor, 
        dateSent: Date.now()
    })
    await curso.save()

    res.send({res:'Datos guardados'})
})

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000
app.listen(PORT)