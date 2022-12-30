import { Helmet } from 'react-helmet-async';
import Paper from '@mui/material/Paper';
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, } from "react-hook-form";
// @mui
import {useTranslation } from 'react-i18next';
import {  Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import "../Styles/Pages/Incription.css";

const Swal = require('sweetalert2');

// ----------------------------------------------------------------------

const schema = yup.object().shape({
  Nom: yup.string().min(2).max(32).required(),
  Prenom: yup.string().min(2).max(32).required(),
  Numero: yup.number().integer(9).required(),
  Email: yup.string().email().required(),
  Password: yup.string().min(8),

});


function Inscription() {
  const mdUp = useResponsive('up', 'md');
   const {t,i18n}=useTranslation();

   const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    
      Swal.fire({
        title: 'Enregistrer avec succes',
        text: data.Nom,
        icon: 'success',
        confirmButtonText: 'OK'
      })
    }


  return (
    
    <>
      <Helmet>
        <title> Creation de compte </title>
      </Helmet>

     
       <div className='incription'>
       <form onSubmit={handleSubmit(onSubmitHandler)}>
    <Paper  sx={{padding:'34px', marginTop:'10%', margin:'32px',width:'auto'}} elevation={5} > 
     
           <Divider id='text1'>Creation de Compte</Divider>
    <Stack spacing={4}  >
   <Stack spacing={4} direction='row'>

   <Stack  spacing={2} direction='column'>
    <Typography>Noms</Typography>
   <TextField 
   required
    {...register("Prenom")}
       label="Prenom"
       variant='outlined'
       />
       <p id='error'>{errors.Prenom?.message}</p>
 <TextField 
 required
     {...register("Nom")}
       label="Nom De Famille"
       variant='outlined'
       />
        <p id='error'>{errors.Nom?.message}</p>
   </Stack>
  
   <Stack spacing={2}  direction='column'>
   <Typography>Infos Adresse</Typography>
   <TextField 
   required
    {...register("Numero")}
       label="Numero Telephone"
       variant='outlined'
       />
        <p id='error'>{errors.Numero?.message}</p>
 <TextField 
 required
  {...register("Email")}
       type="email"
       label="Adresse Email"
       variant='outlined'
       />
        <p id='error'>{errors.Email?.message}</p>
   </Stack>
   </Stack>

   <Typography>Identification</Typography>
   <Stack spacing={4}  >
    
    <TextField
        {...register("Password")}
        label="Mot de passe"
        variant='outlined'
        />

    </Stack>
    <Stack spacing={4} direction="row">
     <LoadingButton variant='contained' type="submit" >Creer Mon Compte</LoadingButton>
     <Button variant='contained' type='reset'  color='error'>Annuler</Button>
    </Stack>
       
       </Stack>
       
       </Paper>  
       </form>   
        </div>
    </>
  );
}

export default Inscription;