import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

export default function MasterTypeIcon() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const buttonStyle = {
    color: "black",
    backgroundColor: "RGB(237, 228, 185)",
    fontWeight: "bold",
  };

  const linkStyle = {
    textDecoration: "none",
  };

  const menuItemStyle = {
    textDecoration: "none",
    color: "black",
  };

  const menuItemHoverStyle = {
    backgroundColor: "gray",
    color: "white",
  };

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={buttonStyle}
        >
          <span style={{ color: "black" }}>Master</span>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <Link to="/mastertype" style={linkStyle}>
                      <MenuItem
                        onClick={handleClose}
                        style={menuItemStyle}
                        sx={{
                          "&:hover": menuItemHoverStyle,
                        }}
                      >
                        Master Type
                      </MenuItem>
                    </Link>
                    <Link to="/mastertypedetail" style={linkStyle}>
                      <MenuItem
                        onClick={handleClose}
                        style={menuItemStyle}
                        sx={{
                          "&:hover": menuItemHoverStyle,
                        }}
                      >
                        Type Detail
                      </MenuItem>
                    </Link>
                    <Link to="/masterTypedetailparent" style={linkStyle}>
                      <MenuItem
                        onClick={handleClose}
                        style={menuItemStyle}
                        sx={{
                          "&:hover": menuItemHoverStyle,
                        }}
                      >
                        Parent
                      </MenuItem>
                    </Link>
                    <Link to="/addblock" style={linkStyle}>
                      <MenuItem
                        onClick={handleClose}
                        style={menuItemStyle}
                        sx={{
                          "&:hover": menuItemHoverStyle,
                        }}
                      >
                        Block
                      </MenuItem>
                    </Link>
                    <Link to="/addbooth" style={linkStyle}>
                      <MenuItem
                        onClick={handleClose}
                        style={menuItemStyle}
                        sx={{
                          "&:hover": menuItemHoverStyle,
                        }}
                      >
                        Booth
                      </MenuItem>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
