import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FunctionComponent } from 'react';

const HorizontalCenterContainer = styled(Box)(({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
}));


const PeopleClass: FunctionComponent = () => {
    const data = [
        {
            name: "1",
            role: "teacher"
        },
        {
            name: "2",
            role: "teacher"
        },
        {
            name: "3",
            role: "student"
        },
        {
            name: "4",
            role: "student"
        },
        {
            name: "5",
            role: "student"
        },
        {
            name: "6",
            role: "student"
        },
        {
            name: "7",
            role: "student"
        },
    ]
    const teachers =data.filter((e)=>e.role==="teacher")
    const students=data.filter((e)=>e.role==="student")
    return (
        <>
            <HorizontalCenterContainer>
                <Grid item xs={7} sx={{ width: "100%" }}>
                    <Typography sx={{ mt: 4, mb: 0 }} variant="h4" component="div" color="#085c9a">
                        Teacher
                    </Typography>
                    <Divider color="#085c9a" />
                    <List>
                        {teachers.map((teacher)=>(
                            <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon
                                    color="primary"
                                    fontSize="large"
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={teacher.name}
                                secondary={null}
                            />
                        </ListItem>
                        ))}
                            
                        
                    </List>
                </Grid>
            </HorizontalCenterContainer>
            <HorizontalCenterContainer>
                <Grid item xs={7} sx={{ width: "100%" }}>
                    <Typography sx={{ mt: 4, mb: 0 }} variant="h4" component="div" color="#085c9a">
                        Student
                    </Typography>
                    <Divider color="#085c9a" />
                    <List>
                        {students.map((student)=>(
                           <ListItem>
                           <ListItemAvatar>
                               <Avatar>
                               <PersonIcon
                                    color="action"
                                    fontSize="large"
                                    />
                               </Avatar>
                           </ListItemAvatar>
                           <ListItemText
                               primary={student.name}
                               secondary={null}
                           />
                       </ListItem> 
                        ))}
                        
                    </List>
                </Grid>
            </HorizontalCenterContainer>
        </>
    );
}

export default PeopleClass;