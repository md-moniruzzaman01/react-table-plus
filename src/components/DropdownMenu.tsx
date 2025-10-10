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
        background: customStyle.DropdownBg || "#fff",
        borderColor: customStyle.DropdownBorderColor || "#e5e7eb",
      }}
    >
      <ul>
        {actions.view && (
          <li
            className="dropdown-item"
            onClick={() => handleNavigation(actions.view)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                customStyle.DropdownItemHoverBg || "#f3f4f6")
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
                customStyle.DropdownItemHoverBg || "#f3f4f6")
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
