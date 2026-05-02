import React from "react";
import Container from "@mui/material/Container";
import TheHeader from "../components/appHeader/TheHeader";
import TheFooter from "../components/appFooter/TheFooter";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { ruRU as coreruRU } from "@mui/material/locale";
import { ruRU } from "@mui/x-date-pickers/locales";

export interface LayoutProps {
  children: React.ReactNode;
}

const lightTheme = createTheme(
  {
    palette: {
      mode: "light",
      primary: {
        main: "#6D28D9",
        dark: "#5B21B6",
        light: "#EDE9FE",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#E11D48",
        contrastText: "#FFFFFF",
      },
      background: {
        default: "#FAFAFA",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#18181B",
        secondary: "#71717A",
      },
      divider: "#E4E4E7",
      error: {
        main: "#DC2626",
      },
      success: {
        main: "#059669",
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
      h5: {
        fontWeight: 800,
        letterSpacing: "-0.02em",
      },
      h6: {
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      subtitle1: {
        fontWeight: 600,
      },
      body1: {
        fontSize: "0.9375rem",
      },
      body2: {
        fontSize: "0.875rem",
      },
      caption: {
        fontSize: "0.75rem",
        letterSpacing: "0.01em",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#FAFAFA",
            scrollbarWidth: "thin",
            scrollbarColor: "#C4B5FD transparent",
            "&::-webkit-scrollbar": {
              width: 6,
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#C4B5FD",
              borderRadius: 3,
            },
          },
        },
      },
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            borderBottom: "1px solid rgba(228, 228, 231, 0.7)",
            color: "#18181B",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.875rem",
            borderRadius: 10,
            transition: "all 0.18s ease",
            letterSpacing: "0.01em",
            "&.Mui-disabled": {
              background: "none",
              backgroundColor: "#F4F4F5",
              color: "#A1A1AA",
              boxShadow: "none",
              border: "none",
            },
          },
          containedPrimary: {
            background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
            boxShadow: "0 2px 8px rgba(109, 40, 217, 0.28)",
            "&:hover": {
              background: "linear-gradient(135deg, #6D28D9 0%, #5B21B6 100%)",
              boxShadow: "0 4px 16px rgba(109, 40, 217, 0.38)",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          },
          outlinedPrimary: {
            borderColor: "#C4B5FD",
            color: "#6D28D9",
            "&:hover": {
              backgroundColor: "#EDE9FE",
              borderColor: "#7C3AED",
            },
            "&.Mui-disabled": {
              background: "none",
              backgroundColor: "transparent",
              borderColor: "#E4E4E7",
              color: "#A1A1AA",
            },
          },
          textPrimary: {
            color: "#6D28D9",
            "&:hover": {
              backgroundColor: "#EDE9FE",
            },
            "&.Mui-disabled": {
              background: "none",
              backgroundColor: "transparent",
              color: "#A1A1AA",
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 10,
              backgroundColor: "#FFFFFF",
              transition: "all 0.18s ease",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E4E4E7",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#A78BFA",
              },
              "&.Mui-focused": {
                backgroundColor: "#FFFFFF",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7C3AED",
                  borderWidth: 2,
                },
              },
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            backgroundColor: "#FFFFFF",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E4E4E7",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#A78BFA",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7C3AED",
              borderWidth: 2,
            },
          },
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: 20,
            border: "1px solid #E4E4E7",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
            border: "1px solid #E4E4E7",
            boxShadow: "0 8px 48px rgba(0,0,0,0.12)",
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            fontSize: "1rem",
            color: "#18181B",
            padding: "20px 24px 16px",
            letterSpacing: "-0.01em",
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: "16px 24px",
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: "12px 24px 20px",
            gap: 8,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: "#EDE9FE",
            color: "#6D28D9",
            fontWeight: 700,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            fontWeight: 500,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 8,
            fontSize: "0.75rem",
            backgroundColor: "#18181B",
            padding: "6px 10px",
          },
          arrow: {
            color: "#18181B",
          },
        },
        defaultProps: {
          arrow: true,
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: "2px 4px",
            fontSize: "0.875rem",
            transition: "all 0.15s ease",
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 99,
            backgroundColor: "#EDE9FE",
          },
          bar: {
            borderRadius: 99,
            background: "linear-gradient(90deg, #7C3AED, #A78BFA)",
          },
        },
      },
    },
  },
  ruRU,
  coreruRU
);

export default function Default({ children }: LayoutProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#FAFAFA",
        }}
      >
        <TheHeader />
        <main
          style={{
            flex: "auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              flex: "auto",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              py: 3,
            }}
          >
            {children}
          </Container>
        </main>
        <TheFooter />
      </div>
    </ThemeProvider>
  );
}
