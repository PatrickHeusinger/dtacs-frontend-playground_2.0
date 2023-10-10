import React from "react";
import {useForm} from "react-hook-form";
import {Button, Box, Title} from '@mantine/core';


function refreshPage() {
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

export default function Upload() {

    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("file", data.file[0]);

        const res = await fetch("http://localhost:5055/upload-file", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());
        alert(JSON.stringify(`${res.message}, status: ${res.status}`));
    };

    return (

        <Box sx={{textAlign: 'center', marginTop: '30vh'}}>
            <Title mb={20} order={1} sx={{color:'#1983AD'}}>CSV FILE UPLOADER</Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="file-input">
                    <Button sx={{backgroundColor:'#1983AD'}}>
                        <input className="custom-file-input" type="file"
                               accept={".csv"}  {...register("file")}  />
                    </Button>
                </Box>
                <Button sx={{backgroundColor:'#1983AD'}} onClick={refreshPage} mt={20} type="submit">Upload</Button>
            </form>
        </Box>


    );
}
