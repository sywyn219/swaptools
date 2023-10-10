import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useDropzone} from "react-dropzone";


// @ts-ignore
export const FileImport = (props) => {

  // @ts-ignore
  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      // @ts-ignore
      const content = event.target.result;
      props.parseContent(content);
    };

    reader.readAsText(file);
  }

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "file": ['.txt', '.xlsx']
    },
    onDrop: handleFileDrop
  })

  return <Box {...getRootProps({ className: 'dropzone' })} marginTop='2rem'>
            <input {...getInputProps()} />
              <Button variant='contained' color='success' fullWidth onClick={e => e.preventDefault()}>
              导入私钥
            </Button>
        </Box>
}
