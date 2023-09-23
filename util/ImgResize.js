import Button from '@mui/material/Button';


function ImgResize() {

    return (
        <form method="post" action="http://localhost:3000/image" encType='multipart/form-data'>
            <input type="file" name="img" multiple />
            <Button variant="contained" type='submit'>Submit</Button>
        </form>
    )
};

export default ImgResize;
