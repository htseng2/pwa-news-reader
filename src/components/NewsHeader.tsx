import { AppBar, Toolbar, Typography } from "@mui/material";
import { buildVersion } from "../version";

export function NewsHeader() {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News Reader
        </Typography>
        <Typography variant="caption" color="inherit">
          v{buildVersion.version} (
          {buildVersion.timestamp.slice(0, 16).replace("T", " ")})
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
