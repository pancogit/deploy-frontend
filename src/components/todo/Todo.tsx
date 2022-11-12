import { useEffect, useRef, useState } from "react";
import Menu from "../menu/Menu";

interface TodoType {
    todoText: string;
}

interface TodosResponse {
    allTodos: TodoType[];
}

export default function Todo() {
    const { current: serverAddress } = useRef("http://0.0.0.0:4000");
    const [todoList, setTodoList] = useState<TodoType[]>([]);
    const fetchTodos = useRef(false);

    // get all todos and save them in the local state
    useEffect(() => {
        async function getAllTodos() {
            const response = await fetch(`${serverAddress}/get-all-todos`);
            const todos: TodosResponse = await response.json();

            setTodoList(todos.allTodos);
        }

        if (!fetchTodos.current) {
            fetchTodos.current = true;

            getAllTodos();
        }
    });

    return (
        <>
            <h1 className="title">Todo</h1>

            <form>
                <label htmlFor="todo-input-id" className="todo-label">
                    Add todo:
                </label>
                <br />
                <input
                    type="text"
                    placeholder="Enter todo"
                    id="todo-input-id"
                    className="todo-input"
                />
                <br />
                <button className="todo-button" id="todo-button-id">
                    Add
                </button>
            </form>

            <ul className="todo-list" id="todo-list-id"></ul>

            <Menu />
        </>
    );
}
