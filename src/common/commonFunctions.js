export const getApiHeader=()=>{
    const finalToken= localStorage.getItem("token");
    const header={
        "Authorization": "Bearer " + finalToken
    }
    return header;
}