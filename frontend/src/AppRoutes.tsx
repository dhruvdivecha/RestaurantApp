import Layout  from "./layouts/layout"
import { Navigate, Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Layout><Homepage /></Layout>}/>
            <Route path="/user-profile" element={<span>Homepage</span>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default AppRoutes