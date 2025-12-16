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

    // Base unit and spacing
    "--sjs-base-unit": "8px",
    "--sjs-corner-radius": "4px",

    // Typography
    "--sjs-font-family": "'Roboto', 'Helvetica', 'Arial', sans-serif",
    "--sjs-font-size": "12px",
    "--sjs-font-questiontitle-size": "14px",
    "--sjs-font-questiontitle-weight": "500",

    // Text colors
    "--sjs-general-backcolor": "#FFFFFF",
    "--sjs-general-forecolor": "#333F48",
    "--sjs-text-input-backcolor": "#FFFFFF",
    "--sjs-text-input-forecolor": "#333F48",
    "--sjs-text-input-placeholdercolor": "rgba(51, 63, 72, 0.5)",
    "--sjs-text-input-bordercolor": "rgba(208, 211, 212, 0.5)",

    // Question spacing
    "--sjs-question-vertical-margin": "16px",
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
  }
};

// Additional CSS for custom styling that can't be done with CSS variables alone
export const customCSS = `
/* Modal panel styling */
.sjs-window {
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 3px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  background-color: #FFFFFF;
}

/* Primary buttons */
.sjs-btn-primary {
  background-color: #2D7698;
  border-color: #2D7698;
  color: #FFFFFF;
  border-radius: 4px;
  font-weight: 500;
  font-size: 12px;
  padding: 8px 12px;
}

.sjs-btn-primary:hover {
  background-color: #245a7e;
  border-color: #245a7e;
}

/* Secondary/Outline buttons */
.sjs-btn:not(.sjs-btn-primary) {
  background-color: #FFFFFF;
  border: 1px solid #2D7698;
  color: #2D7698;
  border-radius: 4px;
  font-weight: 500;
  font-size: 12px;
}

.sjs-btn:not(.sjs-btn-primary):hover {
  background-color: #F0F9FB;
}

/* Input fields */
.sjs-input, .sjs-dropdown-modern, .sjs-text {
  border: 1px solid rgba(208, 211, 212, 0.5);
  border-radius: 4px;
  background-color: #FFFFFF;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 12px;
  color: #333F48;
}

.sjs-input:hover, .sjs-dropdown-modern:hover, .sjs-text:hover {
  border-color: rgba(208, 211, 212, 0.8);
}

.sjs-input:focus, .sjs-dropdown-modern:focus, .sjs-text:focus {
  border-color: #2D7698;
  outline: none;
  box-shadow: 0 0 0 2px rgba(45, 118, 152, 0.1);
}

/* Chips/Tags */
.sjs-chip {
  background-color: #E5F5F8;
  border: 1px solid rgba(99, 153, 174, 0.25);
  border-radius: 4px;
  color: #2D7698;
  font-weight: 500;
  font-size: 12px;
}

/* Checkboxes and Radio buttons */
.sjs-checkbox input[type="checkbox"],
.sjs-checkbox input[type="radio"] {
  border: 1px solid rgba(99, 153, 174, 0.25);
  border-radius: 4px;
}

.sjs-checkbox input[type="checkbox"]:checked,
.sjs-checkbox input[type="radio"]:checked {
  background-color: #2D7698;
  border-color: #2D7698;
}

/* Headers/Titles */
.sjs-question-title {
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #333F48;
}

/* Borders and Dividers */
.sjs-panel {
  border: 1px solid rgba(208, 211, 212, 0.5);
  border-radius: 4px;
}

/* Dropdown menu items */
.sjs-dropdown-popup-item {
  color: #333F48;
}

.sjs-dropdown-popup-item:hover {
  background-color: rgba(45, 118, 152, 0.1);
  color: #2D7698;
}

.sjs-dropdown-popup-item.checked {
  background-color: rgba(45, 118, 152, 0.2);
  color: #2D7698;
}

/* Links and text colors */
.sjs-link {
  color: #2D7698;
  text-decoration: none;
}

.sjs-link:hover {
  text-decoration: underline;
}
`;
