import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import { removeTodoRequest } from "./thunks";
import { markTodoAsCompletedRequest } from "./thunks";
import { getTodos, getTodosLoading } from "./selectors";
import { loadTodos } from "./thunks";
import "./TodoList.css";

const TodoList = ({ todos = [], onRemovedPressed, onCompletedPressed, isLoading, startLoadingTodos }) => {

    useEffect(() => {
        startLoadingTodos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadingMessage = <div> Loading Todos ...</div>
    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            {todos.map(todo => <TodoListItem todo={todo}
                onRemovedPressed={onRemovedPressed}
                onCompletedPressed={onCompletedPressed}
            />)}
        </div>
    )
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    todos: getTodos(state),
});
const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovedPressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
