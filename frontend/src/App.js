import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Protected from "./components/Protected";
import DetailTodo from "./pages/DetailTodo";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            />
            <Route
              path="/list/:id"
              element={
                <Protected>
                  <DetailTodo />
                </Protected>
              }
            />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
