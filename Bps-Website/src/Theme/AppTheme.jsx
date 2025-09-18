// import { colors } from "@mui/material";
// import { createTheme } from "@mui/material/styles";
// import "@fontsource/poppins";
// import "@fontsource/livvic";

// const AppTheme = createTheme({
//   breakpoints: {
//     values: {
//       // xl: 1536,
//       // lg: 1200,
//       // md: 900,
//       // sm: 600,
//       // xs: 0,
//       xs: 0,
//       sm: 480,
//       md: 768,
//       lg: 1024,
//       xl: 1368,
//       xxl: 1980,
//     },
//   },
//   size: 8,
//   spacing: 8,
//   palette: {
//     mode: "light",
//     background: {
//       default: "hsl(0, 0%, 100%)",
//     },
//     primary: {
//       main: colors.indigo[900],
//       dark: colors.indigo[700],
//       deem: colors.indigo[500],
//       light: colors.indigo[50],
//     },
//     secondary: {
//       main: colors.orange[900],
//       dark: colors.orange[700],
//       deem: colors.orange[400],
//       light: colors.orange[50],
//     },
//     info: {
//       main: colors.grey[900],
//       dark: colors.grey[600],
//       deem: colors.grey[100],
//       light: colors.grey[50],
//     },
//     success: {
//       main: colors.green[900],
//       dark: colors.green[500],
//       light: colors.green[50],
//     },
//     error: {
//       main: colors.red[500],
//       dark: colors.red[900],
//       light: colors.red[50],
//     },
//     hoverAction: {
//       hoverDropdown: "#0071dc", 
//     },

//     blue: "#131938",
//     tintBlue: "#326EE6",
//     darkBackground: "#070B3B",
//   },
//   shape: {
//     borderRadius: 2,
//   },
//   typography: {
//     fontFamily: "Livvic",
//     fontSize: 25,
//     htmlFontSize: 30,
//     h1: {
//       fontWeight: 300,
//       fontSize: "6rem",
//       lineHeight: 1.167,
//       letterSpacing: "-0.01562em",
//     },
//     h2: {
//       fontWeight: 300,
//       fontSize: "3.75rem",
//       lineHeight: 1.2,
//       letterSpacing: "-0.00833em",
//     },
//     h3: {
//       fontWeight: 400,
//       fontSize: "3rem",
//       lineHeight: 1.167,
//       letterSpacing: "0em",
//     },
//     h4: {
//       fontWeight: 400,
//       fontSize: "1.780rem",
//       lineHeight: 1.235,
//       letterSpacing: "0.00735em",
//     },
//     h5: {
//       fontWeight: 400,
//       fontSize: "1.2rem",
//       lineHeight: 1.334,
//       letterSpacing: "0em",
//     },
//     h6: {
//       fontWeight: 500,
//       fontSize: "1.25rem",
//       lineHeight: 1.6,
//       letterSpacing: "0.0075em",
//     },
//     body1: {
//       // fontFamily: "Poppins",
//       fontWeight: "700",
//       fontSize: "0.678rem",
//       lineHeight: 1.5,
//       letterSpacing: "0.01038em",
//     },
//     body2: {
//       // fontFamily: "Poppins",
//       fontWeight: 400,
//       fontSize: "0.89rem",
//       lineHeight: 1.43,
//       letterSpacing: "0.01071em",
//     },
//     subtitle1: {
//       fontWeight: 400,
//       fontSize: "1rem",
//       lineHeight: 1.75,
//       letterSpacing: "0.00938em",
//     },
//     subtitle2: {
//       fontWeight: 500,
//       fontSize: "0.875rem",
//       lineHeight: 1.57,
//       letterSpacing: "0.00714em",
//     },
//     button: {
//       borderRadius: "50px",
//       fontWeight: 400,
//       fontSize: "0.675rem",
//       lineHeight: 1.55,
//       letterSpacing: "0.02857em",
//       textTransform: "uppercase",
//     },
//     caption: {
//       fontWeight: 400,
//       fontSize: "0.75rem",
//       lineHeight: 1.66,
//       letterSpacing: "0.03333em",
//     },
//     overline: {
//       fontWeight: 400,
//       fontSize: "0.75rem",
//       lineHeight: 1.66,
//       letterSpacing: "0.08333em",
//       textTransform: "uppercase",
//     },
//   },
//   mixins: {
//     toolbar: {
//       minHeight: 25,
//     },
//   },
//   components: {
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           padding: "0px 12px",
//           height: 15,
//           lineHeight: "10px",
//           borderBottom: "1px solid #FEFEFE",
//         },
//       },
//     },
//     MuiTableRow: {
//       styleOverrides: {
//         root: {
//           "&:nth-of-type(even)": {
//             fontSize: "10px",
//             backgroundColor: "#e9e9e9",
//           },
//           "&:last-child td, &:last-child th": {
//             fontSize: "10px",
//             border: 0,
//           },
//           borderBottom: "1px solid #FEFEFE",
//         },
//       },
//     },
//     MuiTableHead: {
//       styleOverrides: {
//         root: {
//           height: 30,
//         },
//       },
//     },
//     MuiTableFooter: {
//       styleOverrides: {
//         root: {
//           height: 20,
//         },
//       },
//     },
//     MuiTab: {
//       styleOverrides: {
//         root: {
//           fontWeight: "bold",
//           fontSize: "12px",
//           minHeight: "20px",
//         },
//       },
//     },
//     MuiTabs: {
//       styleOverrides: {
//         root: {
//           margin: 1,
//           minHeight: "20px",
//         },
//       },
//     },
//     MuiOutlinedInput: {
//       styleOverrides: {
//         root: {
//           "& .MuiOutlinedInput-notchedOutline": {
//             border: 0,
//             background: "none",
//           },
//           "&:hover .MuiOutlinedInput-notchedOutline": {
//             border: 0,
//           },
//           "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//             border: 0,
//           },
//         },
//         input: {
//           padding: "8px 12px",
//         },
//       },
//     },
//     MuiCheckbox: {
//       styleOverrides: {
//         root: {
//           padding: "3px",
//           "& svg": {
//             fontSize: "15px",
//           },
//         },
//       },
//     },
//     MuiRadio: {
//       styleOverrides: {
//         root: {
//           padding: "3px",
//           "& svg": {
//             fontSize: "15px",
//           },
//         },
//       },
//     },
//     MuiListItemButton: {
//       styleOverrides: {
//         root: {
//           my: 1,
//           height: 27,
//           background: "none",
//           "& svg": {
//             fontSize: "13px",
//           },
//         },
//       },
//     },
//     MuiListItem: {
//       styleOverrides: {
//         root: {
//           margin: "5px 0",
//         },
//       },
//     },
//   },

//   // ... (rest of your theme configuration)
// });

// export default AppTheme;



import { colors } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import "@fontsource/poppins";
import "@fontsource/livvic";

// Color palette constants
const COLOR_PALETTE = {
  primary: {
    main: colors.indigo[900],
    dark: colors.indigo[700],
    medium: colors.indigo[500],
    light: colors.indigo[50],
  },
  secondary: {
    main: colors.orange[900],
    dark: colors.orange[700],
    medium: colors.orange[400],
    light: colors.orange[50],
  },
  neutral: {
    main: colors.grey[900],
    dark: colors.grey[600],
    light: colors.grey[100],
    lighter: colors.grey[50],
  },
};

// Breakpoint constants
const BREAKPOINTS = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1368,
  xxl: 1980,
};

let AppTheme = createTheme({
  // Optimized breakpoints
  breakpoints: {
    values: BREAKPOINTS,
  },

  // Spacing system
  spacing: 8,

  // Color palette with dark mode support
  palette: {
    mode: "light",
    primary: COLOR_PALETTE.primary,
    secondary: COLOR_PALETTE.secondary,
    info: COLOR_PALETTE.neutral,
    success: {
      main: colors.green[900],
      dark: colors.green[500],
      light: colors.green[50],
    },
    error: {
      main: colors.red[500],
      dark: colors.red[900],
      light: colors.red[50],
    },
    background: {
      default: "hsl(0, 0%, 100%)",
      paper: "hsl(0, 0%, 100%)",
    },
    custom: {
      blue: "#131938",
      tintBlue: "#326EE6",
      darkBackground: "#070B3B",
      hoverDropdown: "#0071dc",
    },
  },

  // Shape
  shape: {
    borderRadius: 4, // Slightly increased for modern look
  },

  // Typography with responsive settings
  typography: {
    fontFamily: ["Livvic", "Poppins", "sans-serif"].join(","),
    fontSize: 16, // Base font size
    htmlFontSize: 16,
    
    h1: {
      fontWeight: 300,
      fontSize: "clamp(2.5rem, 5vw, 6rem)",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 300,
      fontSize: "clamp(2rem, 4vw, 3.75rem)",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 400,
      fontSize: "clamp(1.5rem, 3vw, 3rem)",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 400,
      fontSize: "clamp(1.25rem, 2.5vw, 1.78rem)",
      lineHeight: 1.35,
    },
    body1: {
      fontSize: "clamp(0.875rem, 2vw, 1rem)",
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      fontSize: "0.875rem",
      textTransform: "none", // More modern approach
    },
  },

  // Component overrides
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Flat design
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          textTransform: "none",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "separate",
          borderSpacing: 0,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "12px 16px",
          borderBottom: `1px solid ${colors.grey[200]}`,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: colors.grey[400],
            borderRadius: "4px",
          },
        },
      },
    },
  },
});

// Add responsive typography
AppTheme = responsiveFontSizes(AppTheme);

// Dark mode variant
const darkTheme = createTheme({
  ...AppTheme,
  palette: {
    ...AppTheme.palette,
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
});

// Theme switcher utility
export const getTheme = (mode = "light") => 
  mode === "dark" ? darkTheme : AppTheme;

export default AppTheme;


// mergerd code

// import { colors } from "@mui/material";
// import { createTheme, responsiveFontSizes } from "@mui/material/styles";
// import "@fontsource/poppins";
// import "@fontsource/livvic";

// const COLOR_PALETTE = {
//   primary: {
//     main: colors.indigo[900],
//     dark: colors.indigo[700],
//     deem: colors.indigo[500],
//     light: colors.indigo[50],
//   },
//   secondary: {
//     main: colors.orange[900],
//     dark: colors.orange[700],
//     deem: colors.orange[400],
//     light: colors.orange[50],
//   },
//   info: {
//     main: colors.grey[900],
//     dark: colors.grey[600],
//     deem: colors.grey[100],
//     light: colors.grey[50],
//   },
//   success: {
//     main: colors.green[900],
//     dark: colors.green[500],
//     light: colors.green[50],
//   },
//   error: {
//     main: colors.red[500],
//     dark: colors.red[900],
//     light: colors.red[50],
//   },
//   custom: {
//     blue: "#131938",
//     tintBlue: "#326EE6",
//     darkBackground: "#070B3B",
//     hoverDropdown: "#0071dc",
//   },
// };

// const BREAKPOINTS = {
//   xs: 0,
//   sm: 480,
//   md: 768,
//   lg: 1024,
//   xl: 1368,
//   xxl: 1980,
// };

// let AppTheme = createTheme({
//   breakpoints: { values: BREAKPOINTS },
//   size: 8,
//   spacing: 8,
//   palette: {
//     mode: "light",
//     background: { default: "hsl(0, 0%, 100%)" },
//     ...COLOR_PALETTE,
//   },
//   shape: { borderRadius: 4 },
//   typography: {
//     fontFamily: ["Livvic", "Poppins", "sans-serif"].join(","),
//     fontSize: 16,
//     htmlFontSize: 16,
//     h1: { fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 6rem)", lineHeight: 1.2 },
//     h2: { fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3.75rem)", lineHeight: 1.2 },
//     h3: { fontWeight: 400, fontSize: "clamp(1.5rem, 3vw, 3rem)", lineHeight: 1.3 },
//     h4: { fontWeight: 400, fontSize: "clamp(1.25rem, 2.5vw, 1.78rem)", lineHeight: 1.35 },
//     body1: { fontSize: "clamp(0.875rem, 2vw, 1rem)", lineHeight: 1.5 },
//     button: { fontWeight: 600, fontSize: "0.875rem", textTransform: "none" },
//   },
//   components: {
//     MuiTableCell: {
//       styleOverrides: {
//         root: { padding: "12px 16px", borderBottom: `1px solid ${colors.grey[200]}` },
//       },
//     },
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           scrollBehavior: "smooth",
//           "&::-webkit-scrollbar": { width: "8px" },
//           "&::-webkit-scrollbar-thumb": { backgroundColor: colors.grey[400], borderRadius: "4px" },
//         },
//       },
//     },
//   },
// });

// AppTheme = responsiveFontSizes(AppTheme);

// const darkTheme = createTheme({
//   ...AppTheme,
//   palette: {
//     ...AppTheme.palette,
//     mode: "dark",
//     background: { default: "#121212", paper: "#1d1d1d" },
//     text: { primary: "#ffffff", secondary: "rgba(255, 255, 255, 0.7)" },
//   },
// });

// export const getTheme = (mode = "light") => (mode === "dark" ? darkTheme : AppTheme);

// export default AppTheme;
