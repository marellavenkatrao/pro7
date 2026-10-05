import React, { useState } from "react";
import "./App.css";

function App() {
  // Conditional Rendering
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Todo List
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Practice JavaScript" }
  ]);

  const [task, setTask] = useState("");

  // Registration Form
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    interests: [],
    country: "",
    bio: ""
  });

  const [submitted, setSubmitted] = useState(false);

  // Add Todo
  const addTodo = () => {
    if (task !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: task
        }
      ]);
      setTask("");
    }
  };

  // Remove Todo
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  // Interest Checkbox
  const handleInterest = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setForm({
        ...form,
        interests: [...form.interests, value]
      });
    } else {
      setForm({
        ...form,
        interests: form.interests.filter(
          (item) => item !== value
        )
      });
    }
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      form.name === "" ||
      form.email === "" ||
      form.password === "" ||
      form.gender === "" ||
      form.interests.length === 0 ||
      form.country === "" ||
      form.bio === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="container">

      {/* PART A - CONDITIONAL RENDERING */}

      <h1>Conditional Rendering</h1>

      {isLoggedIn ? (
        <h2>Welcome back!</h2>
      ) : (
        <h2>Please Login</h2>
      )}

      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>

      <br /><br />

      <button onClick={() => setIsLoading(!isLoading)}>
        Loading
      </button>

      {isLoading && <h3>Loading...</h3>}

      {!isLoading && <p>Content Loaded</p>}


      {/* PART B - TODO LIST */}

      <hr />

      <h1>Todo List</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTodo}>
        Add Todo
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}

            <button onClick={() => removeTodo(todo.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>


      {/* PART C - FORM */}

      <hr />

      <h1>Registration Form</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <br />

        <p>Gender:</p>

        <input
          type="radio"
          name="gender"
          value="Male"
          onChange={handleChange}
        />
        Male

        <input
          type="radio"
          name="gender"
          value="Female"
          onChange={handleChange}
        />
        Female

        <p>Interests:</p>

        <input
          type="checkbox"
          value="Reading"
          onChange={handleInterest}
        />
        Reading

        <input
          type="checkbox"
          value="Music"
          onChange={handleInterest}
        />
        Music

        <input
          type="checkbox"
          value="Sports"
          onChange={handleInterest}
        />
        Sports

        <p>Country:</p>

        <select
          name="country"
          value={form.country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>

        <p>Bio:</p>

        <textarea
          name="bio"
          placeholder="Enter your bio"
          value={form.bio}
          onChange={handleChange}
        />

        <br />

        <button type="submit">
          Register
        </button>

      </form>


      {/* SUCCESS MESSAGE */}

      {submitted && (
        <div className="success">

          <h2>Registration Successful!</h2>

          <p>Name: {form.name}</p>
          <p>Email: {form.email}</p>
          <p>Gender: {form.gender}</p>
          <p>
            Interests: {form.interests.join(", ")}
          </p>
          <p>Country: {form.country}</p>
          <p>Bio: {form.bio}</p>

        </div>
      )}

    </div>
  );
}

export default App;