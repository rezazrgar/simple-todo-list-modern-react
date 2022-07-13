import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import { removeTodoRequest } from "./thunks";
import { markTodoAsCompletedRequest } from "./thunks";
import {
    getTodosLoading,
    getCompletedTodo,
    getIncompleteTodos
} from "./selectors";
import { loadTodos } from "./thunks";
import "./TodoList.css";

const TodoList = ({ completedTodos, incompleteTodos, onRemovedPressed, onCompletedPressed, isLoading, startLoadingTodos }) => {

    useEffect(() => {
        startLoadingTodos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadingMessage = <div> Loading Todos ...</div>
    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            <h3>Incomlete : </h3>
            {incompleteTodos.map(todo => <TodoListItem
                todo={todo}
                onRemovedPressed={onRemovedPressed}
                onCompletedPressed={onCompletedPressed}
            />)}
            <h3>Completed : </h3>
            {completedTodos.map(todo => <TodoListItem
                todo={todo}
                onRemovedPressed={onRemovedPressed}
                onCompletedPressed={onCompletedPressed}
            />)}
        </div>
    )
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodo(state),
    incompleteTodos: getIncompleteTodos(state),
});
const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovedPressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
