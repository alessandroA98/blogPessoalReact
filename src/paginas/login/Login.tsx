import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid, TextField, Typography, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/Service';
import UserLogin from '../../models/UserLogin';
import './Login.css';
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/actions';
import { toast } from 'react-toastify';


function Login() {
    // redireciona o usuário para determinada pagina
    let navigate = useNavigate();
    const dispatch = useDispatch();

    // const [token, setToken] = useLocalStorage('token_bp')
    // token_bp: "Basic"

    // Hooks que vao manipular o nosso local storage para gerar token
    const [token, setToken] = useState ('');

    // useState defina como uma determinada variavel será inicializada quando o comp. for renderizado  
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            nome: "",
            usuario: "",
            foto: "",
            senha: "",
            token: ""
        }
        )

            // Função que junto com a setUserLogin irá atualizar o valor inicial da userLogin
        function updatedModel(e: ChangeEvent<HTMLInputElement>) {

            setUserLogin({
                ...userLogin, // ... é um operador (spread operator)
                [e.target.name]: e.target.value
            })
        }

            // Hook de efeito colateral, sempre executa uma função quando o que estiver no seu Array é ALTERADO?
            useEffect(()=>{
                if(token != ''){
                    dispatch(addToken(token));
                    navigate('/home')
                }
            }, [token])

        async function onSubmit(e: ChangeEvent<HTMLFormElement>){
            e.preventDefault();
            try{
                await login(`/usuarios/logar`, userLogin, setToken)
                
                toast.success('Usuário logado com sucesso', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: 'colored',
                    progress: undefined,
                });
            }catch(error){
                toast.error('Dados do usuário inconsistentes. Erro ao logar!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: 'colored',
                    progress: undefined,
                });  
            }
        }

    return (
        <Grid container direction='row'  className='fundo' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='corEnter'>Entrar</Typography>
                        <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='email' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
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
            <Grid xs={6} className='imagem'>

            </Grid>
        </Grid>
    );
}

export default Login;