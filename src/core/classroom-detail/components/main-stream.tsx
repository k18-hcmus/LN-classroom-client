import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReplayIcon from '@mui/icons-material/Replay';
import { Box, Button, Card, CardMedia, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FunctionComponent, useState } from "react";
import { useHistory } from "react-router";
import { useAppDispatch } from "../../../app/hooks";
import { createAlert } from "../../../slices/alert-slice";
import { Classroom, copyInviteLink, resetClassCode } from "../../../slices/classroom-slice";
import { copyToClipboard } from "../../../utils/function";

const HorizontalCenterContainer = styled(Box)(({
    width: "80%",
    margin: "0 auto",
}));

const Banner = styled(Box)(({ theme }) => ({
    width: "100%",
    height: theme.spacing(60),
    marginTop: theme.spacing(5)
}))

const CardBanner = styled(Card)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "relative",
    textAlign: "center",
    borderRadius: theme.spacing(2.75)
}))

const NameClass = styled(Typography)(({ theme }) => ({
    color: theme.colors.background.white,
    fontSize: theme.fontSizes.sizeLabel,
    position: "absolute",
    left: theme.spacing(5),
    bottom: theme.spacing(12),
    fontWeight: 600,
}))

const Year = styled(Typography)(({ theme }) => ({
    color: theme.colors.background.white,
    fontSize: theme.fontSizes.sizeLabel,
    position: "absolute",
    left: theme.spacing(5),
    bottom: theme.spacing(5),
}))

const InforIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
    color: theme.colors.background.white,
}))

const InforButton = styled(IconButton)(({ theme }) => ({
    borderRadius: "70%",
    backgroundColor: theme.colors.texting.button,
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(8)
}))

const ClassInforCom = styled(Card)(({ theme }) => ({
    width: "98%",
    height: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: theme.spacing(5)
}))

const ClassCode = styled(Card)(({ theme }) => ({
    width: theme.spacing(45),
    height: theme.spacing(25),
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
}))

const CodeClassText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.codeclass,
    color: theme.colors.texting.button,
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(4),
    fontWeight: "bold",
}))

const ClassCodeText = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.default,
    fontWeight: 550,
    color: theme.colors.texting.classcode,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(4),
}))

const RowClassCode = styled(Typography)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirecton: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
}))

const IconMoreCodeClass = styled(MoreVertIcon)(({ theme }) => ({
    color: theme.colors.texting.classcode,
    fontWeight: "bold",
    fontSize: theme.fontSizes.sizeLabel,
    marginRight: theme.spacing(3)
}))

const MoreButton = styled(IconButton)(({ theme }) => ({
    height: theme.spacing(8),
    width: theme.spacing(8),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: theme.spacing(4)
}))

const MoreCard = styled(Card)(({ theme }) => ({
    width: theme.spacing(70),
    position: "absolute",
    marginLeft: theme.spacing(38),
    marginTop: theme.spacing(12)
}))

const MoreList = styled(List)(({ theme }) => ({
    width: theme.spacing(60),
}))

const MoreListItem = styled(ListItem)(({ theme }) => ({
    width: "100%",
    height: theme.spacing(8),
    fontSize: theme.fontSizes.default,
    color: theme.colors.background.primary,
}))

const MoreListItemButton = styled(ListItemButton)(({ theme }) => ({
    width: "100%",
    height: theme.spacing(8)
}))

interface MainStreamProps {
    classroom: Classroom

}

const MainStream: FunctionComponent<MainStreamProps> = ({ classroom }) => {
    const [inforButton, setInforButton] = useState(false)
    const [moreButton, setMoreButton] = useState(false)
    const dispatch = useAppDispatch()
    const history = useHistory()

    const handleInforButton = () => {
        setInforButton(!inforButton)
    }

    const handleMoreButton = () => {
        setMoreButton(!moreButton)
    }

    const handleCopyClassCode = async () => {
        await copyToClipboard(classroom.classCode || "")
        dispatch(createAlert({
            message: "Copy class code successfully!",
            severity: "success"
        }))
    }
    const handleCopyInviteLink = async () => {
        const payload = { classId: classroom._id, isStudent: true }
        await dispatch(copyInviteLink(payload))
    }
    const handleResetClassCode = () => {
        dispatch(resetClassCode(classroom._id))
    }

    const handleMoveToGradeStructure = () => {
        history.push(`${classroom._id}/grade-structure`)
    }
    return (
        <HorizontalCenterContainer>
            <Banner>
                <CardBanner>
                    <CardMedia
                        component="img"
                        image="https://lh3.googleusercontent.com/w-ikCo0P2hTtVJCfEhkyNZKkCZQc5uirT2xb8JJafe916-fNuuGJsoN-TYj1SzW_9nPmSFI-8vo4=w320-h110-p"
                        alt="banner"
                    />
                    <NameClass>{classroom.name}</NameClass>
                    <Year>{classroom.schoolYear}</Year>
                    <InforButton
                        onClick={handleInforButton}
                    >
                        <InforIcon />
                    </InforButton>
                </CardBanner>
                <Button onClick={handleMoveToGradeStructure}>Move to Grade Structure</Button>
                {(inforButton && classroom.description && classroom.description.length > 0) &&
                    (
                        <ClassInforCom>
                            <Typography variant="body1">{classroom.description}</Typography>
                        </ClassInforCom>
                    )
                }
                <ClassCode>
                    <RowClassCode>
                        <ClassCodeText>
                            Class Code:
                        </ClassCodeText>
                        {classroom.role !== 'student' &&
                            <MoreButton
                                onClick={handleMoreButton}
                            >
                                <IconMoreCodeClass></IconMoreCodeClass>
                            </MoreButton>
                        }
                    </RowClassCode>
                    <CodeClassText>{classroom.classCode}</CodeClassText>
                    {classroom.role !== 'student' && moreButton &&
                        (
                            <MoreCard>
                                <MoreList>
                                    <MoreListItem disablePadding onClick={handleCopyInviteLink}>
                                        <MoreListItemButton>
                                            <ListItemIcon>
                                                <InsertLinkIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Copy link invite" />
                                        </MoreListItemButton>
                                    </MoreListItem>
                                    <MoreListItem disablePadding onClick={handleCopyClassCode}>
                                        <MoreListItemButton>
                                            <ListItemIcon>
                                                <ContentCopyIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Copy class code" />
                                        </MoreListItemButton>
                                    </MoreListItem>
                                    <MoreListItem disablePadding onClick={handleResetClassCode}>
                                        <MoreListItemButton>
                                            <ListItemIcon>
                                                <ReplayIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Reset class code" />
                                        </MoreListItemButton>
                                    </MoreListItem>
                                    <MoreListItem disablePadding onClick={() => setMoreButton(false)}>
                                        <MoreListItemButton>
                                            <ListItemIcon>
                                                <CancelPresentationIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Close" />
                                        </MoreListItemButton>
                                    </MoreListItem>
                                </MoreList>
                            </MoreCard>
                        )
                    }

                </ClassCode>
            </Banner>
        </HorizontalCenterContainer>
    )
}

export default MainStream;