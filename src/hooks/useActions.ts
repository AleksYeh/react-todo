import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import * as TodoActionsCreators from "../store/action-creators/todos"


export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(TodoActionsCreators, dispatch)
}