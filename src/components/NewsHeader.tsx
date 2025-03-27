import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { buildVersion } from "../version";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export function NewsHeader() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News Reader
        </Typography>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{ sx: { minWidth: 200 } }}
        >
          <MenuItem
            component={Link}
            to="/"
            selected={location.pathname === "/"}
            onClick={handleClose}
          >
            <ListItemText>News Feed</ListItemText>
          </MenuItem>
          <MenuItem
            component={Link}
            to="/bookmarks"
            selected={location.pathname === "/bookmarks"}
            onClick={handleClose}
          >
            <ListItemText>Bookmarks</ListItemText>
          </MenuItem>
          <MenuItem
            disabled
            sx={{ mt: 2, borderTop: 1, borderColor: "divider" }}
          >
            <ListItemText
              secondary={`v${buildVersion.version} (${buildVersion.timestamp
                .slice(0, 16)
                .replace("T", " ")})`}
            />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
