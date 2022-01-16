import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { addReviewPoint } from "../../../services/classroom";
import { pointValidation, useValidator, useValidatorManagement } from "../../../utils/validator";


const CardComponent = styled(Box)(({ theme }) => ({
    height: theme.spacing(120),
    width: theme.spacing(150),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.spacing(2.5),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    position: 'absolute',
    backgroundColor:theme.colors.background.white
}))

const PointText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    marginBottom: theme.spacing(2), 
    color:theme.colors.texting.classcode
}))

const PointReview = styled(TextField)(({ theme }) => ({
    width: "80%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
}))

const SubmitButton = styled(Button)(({ theme }) => ({
    width: theme.spacing(30),
    height: theme.spacing(10),
    fontSize: theme.fontSizes.default,
    borderRadius: theme.spacing(2),
    fontWeight:"bold"
}))

const Description = styled(TextField)(({ theme }) => ({
    width: "80%",
    marginBottom:theme.spacing(3)
}))

const ReviewPoint: FunctionComponent<{idStudent:string,idHomework:string,nameHomework:string,classId:string}> = ({idStudent,idHomework,nameHomework,classId}) => {
    const validatorFields = useValidatorManagement()
    const point = useValidator("point", pointValidation, "", validatorFields)
    const handleOnChange = validatorFields.handleOnChange
    const hasError = validatorFields.hasError()
    const dispatch = useAppDispatch()

    const handleSubmit = async (classId:string,idHomework:string,idStudent:string,comment:[{idPerson:string,content:string}],pointReview:number,explain:string,title:string) => {
        try {
            await addReviewPoint(classId,{idHomework,idStudent,comment,pointReview,explain,title})
        } catch (err) {
            
        }
    }

    return (
            <CardComponent sx={{ boxShadow: 3 }}>
                <PointText>Review Point</PointText>
                <PointReview
                label="Title Homework"
                disabled
                value={nameHomework}
                />
                <PointReview    
                    required
                    label="Point you want"
                    autoComplete="point"
                    error={point.hasError()}
                    helperText={point.error}
                    onChange={handleOnChange(point)}
                    onBlur={() => point.validate()}
                />
                <Description
                    multiline
                    rows={5}
                    autoComplete="description"
                />
                <SubmitButton
                    variant="contained"
                    color="success"
                    disabled={hasError}
                >
                    Send
                </SubmitButton>
            </CardComponent>
    )
}

export default ReviewPoint;