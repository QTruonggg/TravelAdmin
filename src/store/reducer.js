const reducer = (state,action)=>{ // action: {type:.. payload:..}
    switch(action.type){
        case "UPDATE_CART": return {...state,
            cart:action.payload,
            isLoading:true
        };
        case "UPDATE_FAVORITE": return {...state,
            favorites:action.payload,
            isLoading:true
        };
        case "UPDATE_USER": return {...state,userlogin:action.payload,isLoading:true};
        // case "AUTH_LOGIN": return {...state,token:action.payload,isLoading:true};
        case "SHOW_LOADING": return {...state,isLoading:true};
        case "HIDE_LOADING": return {...state,isLoading:false};       
        default: return state;
    }
}
export default reducer;