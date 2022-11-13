import React, { useEffect, useRef, useState } from "react";
import { serverOrigin } from "../../configs/configs";
import Menu from "../menu/Menu";

interface TodoType {
    todoText: string;
}

interface TodosResponse {
    allTodos: TodoType[];
}

interface SingleTodoResponse {
    todoAdded: string;
}

export default function Todo() {
    const { current: serverAddress } = useRef(serverOrigin);
    const [todoList, setTodoList] = useState<TodoType[]>([]);
    const fetchTodos = useRef(false);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

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

    async function inputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" && !isEmptyField(inputValue)) {
            event.preventDefault();

            await addTodo(inputValue.trim());
        }
    }

    // add todo by sending http post request to the server
    // also clear input field
    async function addTodo(todoText: string) {
        console.log(`Add todo: ${todoText}`);

        // disable inputs to prevent sending another
        // todo before previous is finished
        disableInputs();

        // send todo to the server
        const response = await fetch(`${serverAddress}/add-todo`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ todo: todoText }),
        });

        // get response from server
        const responseObj: SingleTodoResponse = await response.json();

        // enable inputs when todo is written to the database
        disableInputs(false);

        // create todo item and add it to the local state
        const todoItem: TodoType = { todoText: responseObj.todoAdded };

        const newTodoList = todoList.slice();
        newTodoList.push(todoItem);

        setTodoList(newTodoList);

        if (inputValue) {
            setInputValue("");
        }
    }

    // disable input field and button or not
    function disableInputs(disable = true) {
        if (inputRef.current) {
            inputRef.current.disabled = disable;
        }

        if (buttonRef.current) {
            buttonRef.current.disabled = disable;
        }
    }

    function isEmptyField(text: string) {
        return text.match(/^\s*$/);
    }

    function inputValueChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    async function buttonClicked(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (!isEmptyField(inputValue)) {
            await addTodo(inputValue.trim());
        }
    }

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
                    onKeyDown={inputKeyDown}
                    value={inputValue}
                    onChange={inputValueChanged}
                    ref={inputRef}
                />
                <br />
                <button
                    className="todo-button"
                    id="todo-button-id"
                    ref={buttonRef}
                    onClick={buttonClicked}
                >
                    Add
                </button>
            </form>

            <ul className="todo-list" id="todo-list-id">
                {todoList.map((todo, index) => (
                    <li key={index} className="todo-item">
                        {todo.todoText}
                    </li>
                ))}
            </ul>

            <Menu />
        </>
    );
}
