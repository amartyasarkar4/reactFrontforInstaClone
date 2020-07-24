export const initialState=null;

export const reducer=(state,action)=>{
    console.log(action.payload);
    if(action.type="USER"){
        return action.payload;
       
    }
    return state;
}