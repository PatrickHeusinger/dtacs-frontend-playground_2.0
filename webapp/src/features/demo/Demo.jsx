import {Box, Checkbox, Group, Stack } from '@mantine/core';
import { nanoid } from '@reduxjs/toolkit'
import {useDispatch, useSelector} from "react-redux";
import {setSelectedFilter} from "../../app/mainPageSlice";

console.log(nanoid())


export default function Demo() {
    const dispatch = useDispatch();
    const { selectedFilter } = useSelector((state) => {
        return { selectedFilter: state.MainPage.selectedFilter };

    });
    console.log(selectedFilter)
  return (
      <Box sx={{display:'flex', justifyContent:'center', height: '100%' }}>
          <Stack sx={{display:'flex', justifyContent:'center',alignItems:'center'}}>
              <Checkbox.Group
                  value={selectedFilter}
                  label="Select your favorite frameworks/libraries"
                  description="This is anonymous"
                  withAsterisk
                  onChange={
                      (event) => {dispatch(setSelectedFilter(event))}
                  }

              >
                  <Group mt="xs">
                      <Checkbox value="react" label="React" />
                      <Checkbox value="svelte" label="Svelte" />
                      <Checkbox value="angular" label="Angular" />
                      <Checkbox value="vue" label="Vue" />
                  </Group>
              </Checkbox.Group>
          </Stack>
      </Box>
  );
}
