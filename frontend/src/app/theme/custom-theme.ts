// Custom SurveyJS theme matching the design system
export const customTheme = {
  "themeName": "custom",
  "colorPalette": "light",
  "isPanelless": false,
  "cssVariables": {
    // Primary colors - matching design system
    "--sjs-primary-backcolor": "#2D7698",
    "--sjs-primary-backcolor-dark": "#245a7e",
    "--sjs-primary-backcolor-light": "#5a8fb5",
    "--sjs-primary-forecolor": "#FFFFFF",

    // Secondary colors
    "--sjs-secondary-backcolor": "#E5F5F8",
    "--sjs-secondary-backcolor-light": "#F0F9FB",
    "--sjs-secondary-backcolor-semi-light": "#F8FCFD",
    "--sjs-secondary-forecolor": "#333F48",

    // Base unit and spacing - COMPACT
    "--sjs-base-unit": "4px",
    "--sjs-corner-radius": "4px",

    // Typography - COMPACT SPACING, READABLE FONTS
    "--sjs-font-family": "'Roboto', 'Helvetica', 'Arial', sans-serif",
    "--sjs-font-size": "13px",
    "--sjs-font-questiontitle-size": "14px",
    "--sjs-font-questiontitle-weight": "500",

    // Text colors
    "--sjs-general-backcolor": "#FFFFFF",
    "--sjs-general-forecolor": "#333F48",
    "--sjs-text-input-backcolor": "#FFFFFF",
    "--sjs-text-input-forecolor": "#333F48",
    "--sjs-text-input-placeholdercolor": "rgba(51, 63, 72, 0.5)",
    "--sjs-text-input-bordercolor": "rgba(208, 211, 212, 0.5)",

    // Question spacing - COMPACT
    "--sjs-question-vertical-margin": "8px",
    "--sjs-question-margin-top": "0px",

    // Borders
    "--sjs-border-default": "#D0D3D4",
    "--sjs-border-light": "#E8EAEB",
    "--sjs-shadow-small": "0 1px 3px rgba(0, 0, 0, 0.12)",
    "--sjs-shadow-medium": "0 2px 6px rgba(0, 0, 0, 0.16)",
    "--sjs-shadow-large": "0 4px 12px rgba(0, 0, 0, 0.24)",

    // Modal/Panel shadows
    "--sjs-shadow-modal": "0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 3px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08)",

    // Special colors
    "--sjs-special-red": "#d32f2f",
    "--sjs-special-green": "#388e3c",
    "--sjs-special-yellow": "#f57c00",

    // Button styling
    "--sjs-button-padding": "8px 12px",
    "--sjs-button-border-radius": "4px",

    // Input/Field styling
    "--sjs-input-border-default": "rgba(208, 211, 212, 0.5)",
    "--sjs-input-border-default-hover": "rgba(208, 211, 212, 0.8)",
    "--sjs-input-border-default-focus": "#2D7698",

    // Muted blue accent color
    "--sjs-accent-color": "#E5F5F8",
    "--sjs-accent-border-color": "rgba(99, 153, 174, 0.25)",

    // Toggle/Switch styling - from controlstyles.css
    "--sjs-checkbox-backcolor": "#FFFFFF",
    "--sjs-checkbox-bordercolor": "rgba(99, 153, 174, 0.25)",
    "--sjs-checkbox-checked-backcolor": "#2D7698",
    "--sjs-checkbox-size": "16px",
    "--sjs-switch-backcolor": "#009CBD",
    "--sjs-switch-size": "22px",
  }
};
