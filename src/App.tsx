import { Route, Routes } from "react-router-dom"
import Aside from "./components/aside/aside"
import { routes } from "./constants/routes"
import Bar from "./components/bar/bar"

function App() {
  

  return (
    <>
        <div className="wrap">
              <Aside />
              <main>
                  <Bar />
                <Routes>
            {
              routes.map((route, index) => (
                <Route
                  key={index} 
                  path={route.path}
                  element={route.element}
                />
              ))
              }
            
          </Routes>
              </main>
        </div>
    </>
  )
}

export default App
