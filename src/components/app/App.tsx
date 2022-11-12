import React from "react";
import "../../css/app.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import Todo from "../todo/Todo";
import About from "../about/About";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/todo" element={<Todo />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
