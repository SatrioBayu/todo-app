import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Protected from "./components/Protected";
import DetailTodo from "./pages/DetailTodo";
import { ProSidebarProvider } from "react-pro-sidebar";

function App() {
  return (
    <Provider store={store}>
      <ProSidebarProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
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
      </ProSidebarProvider>
    </Provider>
  );
}

export default App;
