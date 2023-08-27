
import {apiConnector} from "../apiConnector"

import { courseEndpoints } from './../apis';



export const fetchCourseCategories =async()=>{
    const {COURSE_CATEGORIES_API} =courseEndpoints
    let result =[]

    try {
        
        const response =await apiConnector("GET",COURSE_CATEGORIES_API)
        // console.log("course categ", response);

        result =response?.data?.data 

    } catch (error) {
        console.log(error);

    }
    return result
}