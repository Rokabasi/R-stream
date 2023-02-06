import { createContext,useReducer } from "react";
export const Context = createContext();

export const userPicture = createContext();

const initialState = { userImage: "" };

const pictureReducer = (state, action) => {
  switch (action.type) {
    case "update":
      sessionStorage.setItem("profilImage", action.payload);
      return { ...state, userImage: action.payload };
    default:
      return state;
  }
};

export const PictureProvider = (props) => {
  const [state, dispatch] = useReducer(pictureReducer, initialState);
  return (
    <userPicture.Provider value={{ state, dispatch }}>
      {props.children}
    </userPicture.Provider>
  );
};
