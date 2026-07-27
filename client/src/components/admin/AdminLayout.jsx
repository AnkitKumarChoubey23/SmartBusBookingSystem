import {
  Box,
  Toolbar,
} from "@mui/material";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar />

      <AdminSidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;