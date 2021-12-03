import { Box, Card, Divider, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { FunctionComponent, useEffect, useState } from "react";
import {
    DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DropResult,
    ResponderProvided
} from "react-beautiful-dnd";
import { getGradeStructure } from '../../services/classroom';
import CardCreator from './components/card-creator';

import AddCardCreator from "./components/add-card-creator";

/* 
Note: this is a working example, but more can be done to improve it.

In particular, on drag, the table cells in the dragged row may collapse and shrink the overall row.

If you wish to preserve their size mid-drag, you can create a custom component that wraps
the material TableCell and saves the pre-drag dimensions (e.g. in a ref or in state).
The component can be passed an 'isDragging' prop (via snapshot.isDragging) and can conditionally
apply pre-drag width/height via styles.

Pre-drag dimensions can be obtained via the new-ish ResizeObserver API. If you are using class 
components, the getSnapshotBeforeUpdate() lifecycle method can work with getBoundingClientRect(), 
*/

export interface DataItem {
    _id: string;
    title: string;
    point: number;
    description?: string
}

const HorizontalCenterContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // backgroundColor: theme.colors.background.structBackGround
}))

const BoxContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
    marginTop: theme.spacing(10)
}))

const ListContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}))

const GradeInfor = styled(Card)(({ theme }) => ({
    width: "60%",
    height: theme.spacing(35),
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.background.white,
    marginTop: theme.spacing(6),
    borderRadius: theme.spacing(2.75)
}))

const GradeInforTitle = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.gradeStruct,
    fontWeight: "bold",
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(8),
}))

const GradeInforTitleSub = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.changePass,
    fontWeight: "bold",
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(8)
}))

const LineGradeInfor = styled(Divider)(({ theme }) => ({
    width: "100%",
    height: theme.spacing(2),
    backgroundColor: theme.colors.texting.textLabel
}))

interface GradeStructureProps {
    gradeStructure: DataItem[];
}

export const GradeStructure: FunctionComponent<GradeStructureProps> = ({gradeStructure}) => {
    // cache the items provided via props in state for purposes of this demo
    const [localItems, setLocalItems] = useState<Array<DataItem>>(gradeStructure);
    const [isAdd, setIsAdd] = React.useState(localItems.length)

    useEffect(() => {
        setLocalItems(gradeStructure);
    }, [gradeStructure])

    // normally one would commit/save any order changes via an api call here...
    const handleDragEnd = (result: DropResult, provided?: ResponderProvided) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        setLocalItems((prev: any) => {
            const temp = [...prev];
            const d = temp[result.destination!.index];
            temp[result.destination!.index] = temp[result.source.index];
            temp[result.source.index] = d;

            return temp;
        });
    };

    return (
        <HorizontalCenterContainer>
            <BoxContainer>
                <GradeInfor>
                    <LineGradeInfor />
                    <GradeInforTitle>
                        Grade Structure
                    </GradeInforTitle>
                    <GradeInforTitleSub>
                        Edit your classroom grade structure
                    </GradeInforTitleSub>
                </GradeInfor>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable" direction="vertical">
                        {(droppableProvided: DroppableProvided) => (
                            <ListContainer
                                ref={droppableProvided.innerRef}
                                {...droppableProvided.droppableProps}
                            >
                                {localItems.map((item: DataItem, index: number) => (
                                    <Draggable
                                        key={item._id}
                                        draggableId={item._id}
                                        index={index}
                                    >
                                        {(
                                            draggableProvided: DraggableProvided,
                                            snapshot: DraggableStateSnapshot
                                        ) => {
                                            return (
                                                <CardCreator 
                                                    draggableProvided={draggableProvided}
                                                    item={item}
                                                />
                                            );
                                        }}
                                    </Draggable>
                                ))}
                                {droppableProvided.placeholder}
                                <AddCardCreator/>
                            </ListContainer>
                        )}
                    </Droppable>
                </DragDropContext>
            </BoxContainer>
        </HorizontalCenterContainer >
    );
};
