import { Box, Checkbox, Group, Stack } from '@mantine/core';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilter } from '../../app/mainPageSlice';

console.log(nanoid());


export default function Demo() {
  const dispatch = useDispatch();
  const { selectedFilter } = useSelector((state) => {
    return { selectedFilter: state.MainPage.selectedFilter };

  });
  console.log(selectedFilter);

  const items = ['react', 'svelte', 'angular', 'vue', 'flask'];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Checkbox.Group
          value={selectedFilter}
          label='Select your favorite frameworks/libraries'
          description='This is anonymous'
          withAsterisk
          onChange={
            (event) => {
              dispatch(setSelectedFilter(event));
            }
          }

        >
          <Group mt='xs'>
            {
              items.map((value) => (

                <Checkbox key={nanoid()} value={value} label={value.toUpperCase()} />

              ))
            }
          </Group>
        </Checkbox.Group>
      </Stack>
    </Box>
  );
}
