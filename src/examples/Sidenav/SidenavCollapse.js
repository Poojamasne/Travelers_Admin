import PropTypes from "prop-types";

// @mui components
import ListItem from "@mui/material/ListItem";
import Icon from "@mui/material/Icon";
import { styled } from "@mui/material/styles";

// MD components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Styled sidebar item with proper padding
const CollapseRoot = styled(ListItem)(({ theme, active }) => ({
  display: "flex",
  alignItems: "center", // vertically center
  justifyContent: "flex-start", // left align
  width: "100%",
  padding: theme.spacing(1.2),
  paddingLeft: theme.spacing(3), // ✅ Left padding for icon+text
  marginBottom: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  backgroundColor: active ? "#4CAF50" : "transparent",
  transition: "background-color 0.3s",

  "&:hover": {
    backgroundColor: active ? "#4CAF50" : "rgba(255, 255, 255, 0.08)",
  },
}));

function SidenavCollapse({ icon, name, active, noCollapse, ...rest }) {
  return (
    <CollapseRoot active={active ? 1 : 0} {...rest}>
      <MDBox
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          color: "#ffffff",
          mr: 2,
          minWidth: "24px",
        }}
      >
        {typeof icon === "string" ? <Icon sx={{ color: "#ffffff" }}>{icon}</Icon> : icon}
      </MDBox>

      <MDTypography
        variant="button"
        fontWeight="medium"
        sx={{
          color: "#ffffff",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </MDTypography>
    </CollapseRoot>
  );
}

SidenavCollapse.defaultProps = {
  active: false,
  noCollapse: false,
};

SidenavCollapse.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  noCollapse: PropTypes.bool,
};

export default SidenavCollapse;
