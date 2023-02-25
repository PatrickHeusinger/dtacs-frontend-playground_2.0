import { Box, Stack, Title, Image } from '@mantine/core';
import Logo from 'assets/dt_logo_xl.png';
export default function Start() {
    return (
        <Box sx={{display:'flex', justifyContent:'center', height: '100%' }}>
            <Stack sx={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                <Title sx={{color:'#1883AD',fontSize:'64px'}}>Frontend Development Playground</Title>
                <Image pt={40} width={300} src={Logo} />
            </Stack>

        </Box>
    );
}
