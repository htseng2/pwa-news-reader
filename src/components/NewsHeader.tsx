import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import { buildVersion } from "../version";
import { Link, useLocation } from "react-router-dom";

export function NewsHeader() {
  const location = useLocation();

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News Reader
        </Typography>
        <Tabs
          value={location.pathname}
          textColor="inherit"
          sx={{ minHeight: 64 }}
        >
          <Tab
            label="News Feed"
            value="/"
            component={Link}
            to="/"
            sx={{ minHeight: 64 }}
          />
          <Tab
            label="Bookmarks"
            value="/bookmarks"
            component={Link}
            to="/bookmarks"
            sx={{ minHeight: 64 }}
          />
        </Tabs>
        <Typography variant="caption" color="inherit">
          v{buildVersion.version} (
          {buildVersion.timestamp.slice(0, 16).replace("T", " ")})
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
