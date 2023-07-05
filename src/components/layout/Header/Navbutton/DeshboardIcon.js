// import * as React from 'react';
// import Button from '@mui/material/Button';

// import Stack from '@mui/material/Stack';
// import { Link } from 'react-router-dom';

// export default function DeshboardIcon() {
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);





//   // return focus to the button when we transitioned from !open -> open
//   const prevOpen = React.useRef(open);
//   React.useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   return (
//     <Stack direction="row" spacing={2}>
    
    
//         <Button
//           ref={anchorRef}
//           id="composition-button"
//           aria-controls={open ? 'composition-menu' : undefined}
//           aria-expanded={open ? 'true' : undefined}
//           aria-haspopup="true"
//           // onClick={handleToggle}
//         >
//     <Link to='/dashboard'><span style={{color:'black'}}>Dashboard</span></Link>      
//         </Button>

//     </Stack>
//   );
// }
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

export default function DeshboardIcon() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const buttonStyle = {
    color: 'black',
    backgroundColor: 'RGB(237, 228, 185)',
    fontWeight: 'bold',
  };

  const linkStyle = {
    textDecoration: 'none',
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        style={buttonStyle}
      >
        <Link to="/dashboard" style={linkStyle}>
          <span style={{ color: 'black' }}>Dashboard</span>
        </Link>
      </Button>
    </Stack>
  );
}
