import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid, TextField, Typography, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/Service';
import UserLogin from '../../models/UserLogin';
import './Login.css';
import { useDispatch } from 'react-redux';
import { addToken, addId } from '../../store/tokens/actions';
import { toast } from 'react-toastify';


function Login() {

    let history = useNavigate()

    const dispatch = useDispatch()

    const [token, setToken] = useState('')

    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    // Crie mais um State para pegar os dados retornados a API
    const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        token: '',
        foto: ""
    })

    useEffect(() => {
        if (token !== "") {
            dispatch(addToken(token))
            history('/home')
        }
    }, [token])

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (respUserLogin.token !== "") {

            // Verifica os dados pelo console (Opcional)
            console.log("Token: " + respUserLogin.token)
            console.log("ID: " + respUserLogin.id)

            // Guarda as informações dentro do Redux (Store)
            dispatch(addToken(respUserLogin.token))
            dispatch(addId(respUserLogin.id.toString()))    // Faz uma conversão de Number para String
            history('/home')
        }
    }, [respUserLogin.token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        try {

            /* Se atente para a Rota de Logar, e também substitua o método
            setToken por setRespUserLogin */

            await login(`/usuarios/logar`, userLogin, setRespUserLogin)
            alert("Usuário logado com sucesso")

        } catch (error) {
            alert("Dados do usuário inconsistentes")
        }
    }

    return (
        <Grid container direction='row'  className='fundo' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6} className='loginLeft'>
                <Box paddingX={20} className='boxLogin'>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='corEnter'>Entrar</Typography>
                        <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='email' variant='outlined' name='usuario' margin='normal' fullWidth className='inputColor'/>
                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth className='inputColor' />
                        <Box marginTop={2} textAlign='center'>                     
                            <Button type='submit' variant='contained' color='primary'>
                                Logar
                            </Button>                            
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastrousuario'>
                            <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                        </Link>
                        
                    </Box>
                </Box>
            </Grid>
            <Grid xs={5} className='imagem'>

            </Grid>
        </Grid>
    );
}

export default Login;