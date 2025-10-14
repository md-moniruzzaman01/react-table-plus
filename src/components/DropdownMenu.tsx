import React, { FC } from "react";
import { DropdownProps } from "../types";
import "../styles.css";

const DropdownMenu: FC<DropdownProps> = ({
  itemId,
  actions,
  dropdownRefs,
  setOpenDropdownId,
  customStyle = {},
}) => {
  const handleNavigation = (path?: string) => {
    if (path && actions.onNavigate) {
      actions.onNavigate(`${path}/${itemId}`);
    }
    setOpenDropdownId(null);
  };

  return (
    <div
      ref={(el) => {
        dropdownRefs.current[itemId] = el;
      }}
      className="dropdown-menu"
      style={{
        background: customStyle.DropdownBg || "var(--tbl-dropdown-bg)",
        borderColor: customStyle.DropdownBorderColor || "var(--tbl-dropdown-border)",
      }}
    >
      <ul>
        {actions.view && (
          <li
            className="dropdown-item"
            onClick={() => handleNavigation(actions.view)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                customStyle.DropdownItemHoverBg || "var(--tbl-dropdown-hover-bg)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                customStyle.DropdownItemBg || "transparent")
            }
          >
            👁️ View
          </li>
        )}
        {actions.edit && (
          <li
            className="dropdown-item"
            onClick={() => handleNavigation(actions.edit)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                customStyle.DropdownItemHoverBg ||"var(--tbl-dropdown-hover-bg)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                customStyle.DropdownItemBg || "transparent")
            }
          >
            ✏️ Edit
          </li>
        )}
        {actions.delete && (
          <li
            className="dropdown-item"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                customStyle.DropdownItemHoverBg ||"var(--tbl-dropdown-hover-bg)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                customStyle.DropdownItemBg || "transparent")
            }
            onClick={() => {
              actions.delete!(itemId);
              setOpenDropdownId(null);
            }}
          >
            🗑️ Delete
          </li>
        )}
      </ul>
    </div>
  );
};

export default DropdownMenu;
