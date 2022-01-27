require('dotenv').config();
const express=require('express');
const router=express.Router();
const Message=require('../models/Message');
const nodemailer=require('nodemailer');


router.get('/',(req,res)=>{
    res.render('index.html');
});

router.get('/contact',(req,res)=>{
    res.render('contact.html');
});

router.get('/portafolio',(req,res)=>{
    res.render('portafolio.html');
});

router.get('/trabajamos',(req,res)=>{
    res.render('trabajamos.html');
});

router.post("/trabajamos", async (req, res) => {
  const { nombre, email, message} = req.body;
  let success=false;
  const errors = []; //Albmacena errores
  if(!nombre){
    errors.push({text: 'Por favor ingrese su nombre'});
  }
  if (!email) {
    errors.push({ text: "Por favor ingrese su email" });
  }
  if (!message) {
    errors.push({ text: "Por favor ingrese un mensaje" });
  }
  if (errors.length > 0) {
    //If there are any errors, render trabajamos again and show the errors
    res.render("trabajamos.html", {
      errors: errors,
      nombre: nombre,
      email: email,
      message: message
    });
  } else {
    //Save the msg in the DB
    const newMessage = new Message({ email, message, nombre });
    await newMessage.save();
    console.log(newMessage);
    success=true;
    res.render('trabajamos.html',{success:success});
    
    const transporter=nodemailer.createTransport({
      service:'gmail',
      auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });
     const info= await transporter.sendMail({ 
       
      from : 'PORTAFOLIO <rromanportafolio@gmail.com>',
      to: 'rubenromanvilasau@outlook.com',
      subject: 'Nuevo mensaje',
      text: "Email: " +email + "\n\nNombre: " +nombre + "\n\nMensaje: " +message,
      html: `<p><b>Email:</b>  ${email}</p>
      <p><b>Nombre:</b>  ${nombre} </p>
      <p><b>Mensaje:</b>  ${message} </p>`
            
    });
    console.log('Message sent ', info.messageId);  
  }
});

module.exports = router;