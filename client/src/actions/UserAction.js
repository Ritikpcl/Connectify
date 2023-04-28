import * as UserApi from "../api/UserRequests";

export const updateUser=(id, formData)=> async(dispatch)=> {
    dispatch({type: "UPDATING_START"})
    try{
        const {data} = await UserApi.updateUser(id, formData);
        console.log("Action ko receive hoa hy ye : ",data)
        dispatch({type: "UPDATING_SUCCESS", data: data})
    }   
    catch(error){
        dispatch({type: "UPDATING_FAIL"})
    }
}

export const followUser = (p_id, data)=> async(dispatch)=> {
    await UserApi.followUser(p_id, data._id)
    dispatch({type: "FOLLOW_USER", data: p_id})
}

export const unfollowUser = (p_id, data)=> async(dispatch)=> {
    await UserApi.unfollowUser(p_id, data._id)
    dispatch({type: "UNFOLLOW_USER", data: p_id})
}