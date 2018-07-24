const initialState = {

}


export default function(state = initialState, action){

  switch(action.type){

    case 'ON_VIDEO_FINISH':
      return {
        ...state,


      }

    case '':
      return {
        ...state,

      }

    default:
      return state
  }
}
