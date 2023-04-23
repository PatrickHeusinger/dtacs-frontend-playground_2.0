import {Box, Stack, Title} from '@mantine/core';
import { nanoid } from '@reduxjs/toolkit'

console.log(nanoid())


export default function Demo() {
  return (
      <Box sx={{display:'flex', justifyContent:'center', height: '100%' }}>
          <Stack sx={{display:'flex', justifyContent:'center',alignItems:'center'}}>
              <Title>No content here...</Title>
          </Stack>
      </Box>
  );
}
