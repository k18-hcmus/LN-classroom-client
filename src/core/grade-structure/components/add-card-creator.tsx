import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FunctionComponent,useState } from "react";

const CardCreatorComponent = styled(Box)(({ theme }) => ({
    width: "60%",
    height: theme.spacing(65),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    borderRadius: theme.spacing(5),
}))

const BoxInput = styled(Box)(({ theme }) => ({
    width: "80%",
    height: "100%",
    display: 'flex',
    flexDirection: "column",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    borderRadius: theme.spacing(2.75)
}))

const InputGrade = styled(TextField)(({ theme }) => ({
    width: "90%",
    height: theme.spacing(10),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(4),
}))

const BoxButton = styled(Box)(({
    width: "7%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
}))

const AddButton = styled(Button)(({theme})=>({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:theme.spacing(2.75)
}))

const AddCardCreator: FunctionComponent = () => {

    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [point,setPoint]=useState("0")
    return (
        <CardCreatorComponent
        sx={{ boxShadow: 10 }}
        >
            {/* note: `snapshot.isDragging` is useful to style or modify behaviour of dragged cells */}
            <BoxInput>
                <InputGrade
                    id="gradeTitle"
                    label="Grade Title"
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                        setTitle(e.target.value)
                        console.log(title)
                    }}
                />
                <InputGrade
                    id="gradeDes"
                    label="Grade Description"
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                        setDescription(e.target.value)
                        console.log(description)
                    }}
                />
                <InputGrade
                    id="gradePoint"
                    label="Grade Point"
                    variant="outlined"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                        setPoint(e.target.value)
                        console.log(point)
                    }}
                />
            </BoxInput>
            <BoxButton>
                <AddButton
                    variant="contained"
                    color="success"
                >
                    <AddCircleOutlineIcon />
                </AddButton>
            </BoxButton>
        </CardCreatorComponent>
    );
}

export default AddCardCreator;