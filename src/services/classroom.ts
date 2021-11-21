import { Classroom } from '../slices/classroom-slice'
import api from './api'

const BASE_URL = 'classrooms/'

export const createClassroom = (classroom: Classroom) => {
    return api.post(BASE_URL, classroom)
}

export const getAllClassroom = () => {
    return api.get(BASE_URL)
}

export const joinClassByLink = (token: string) => {
    return api.post(BASE_URL + "invitation", { token })
}