import { Suspense, lazy, useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import ECommerce from "./ECommerce"
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from "./Loader/index"
import routes from "./routes/index"

const DefaultLayout = lazy(() => import("./layout/DefaultLayout"))

function DashPrueba() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />

      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<DefaultLayout />}>
          {/* Aqui se pueden agregar las rutas */}
          <Route index element={<ECommerce />} />
          {routes.map(({ path, component: Component }) => (
            <Route
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              }
            />
          ))}
          {/* Aqui termina */}
        </Route>
      </Routes>
    </>
  )
}

export default DashPrueba
