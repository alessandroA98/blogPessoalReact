import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Typography } from '@material-ui/core';
import { Box } from '@mui/material'
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';
import maneiro from '../../imagens/maneiro2.png'
import lindinha from '../../imagens/lindinha2.png'


function TabPostagem() {
  const [value, setValue] = useState('1')
  function handleChange(e: React.ChangeEvent<{}>, newValue: string) {
    setValue(newValue);
  }
  return (
    <>
      <TabContext value={value}>
        <AppBar position="static" className='barra-menu'>
          <Tabs centered onChange={handleChange}>
            <Tab label="Todas as postagens" value="1" className='colorTab' />
            <Tab label="Sobre-mim" value="2" className='colorTab' />
          </Tabs>
        </AppBar>
        <TabPanel value="1" >
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ListaPostagem />
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <div className='sobreMim'>
            <Typography variant="h3" component="h1" className='faixaSub' >Sobre-mim</Typography>
            <Typography variant="body1" align="justify" className="descricao">
              <p>
                Olá, me chamo alessandro Nascimento Assunção, tenho 24 anos e moro em São Miguel Paulista - SP. nas horas vagas gosto de passear com meus cachorros, estudar programação e inglês, assistir filmes, series e jogar videogame.
              </p>
              <p>
                Atualmente estou somente fazendo faculdade de analise e desenvolvimento de sistemas pelo Centro Universitario das Américas e estudando inglês.
              </p>
              <p>
                Tenho conhecimento em algumas tecnologias como React.js, Springboot, Java, JavaScript, CSS e HTML, MySql, Selenium-IDE e Insomnia. algumas um pouco mais basicas e outras mais avançadas.
              </p>
              <p>
                Estou em transição de carreira de ajudante geral e em busca da minha primeira oportunidade na area de tecnologia, seja como um estagiario ou como um desenvolvedor junior
              </p>
            </Typography>
            <Typography variant="h3" component="h1" className='faixaSub'> Pets </Typography>
            <div className='imgAnimais'>
              <div >
                <h1>Lindinha</h1>
                <img src={lindinha} alt="cachorra shitzu" />
              </div>

              <div >
                <h1>Maneirinho</h1>
                <img src={maneiro} alt="cachorro yorkshire" />
              </div>
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagem;