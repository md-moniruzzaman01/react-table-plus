import { FC, useEffect, useRef, useState } from "react";

import { TableProps } from "./types";
import { handleAllCheckboxChange, handleCheckboxChange, getValue } from "./utils";
import DropdownMenu from "./components/DropdownMenu";
import './styles.css';
// Export types for external use
export type { TableProps, DropdownProps, ActionProps, Avatar, MultiAvatar, StyleProps } from "./types";
const TableComponent: FC<TableProps> = ({
  column,
  itemData = [],
  Layout,
  avatar,
  multiAvatar,
  actions,
  checkbox,
  checkedRows = [],
  setCheckedRows,
  loading,
  className,
  styles: customStyle = {},
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const idkey = actions?.idkey || "id";

 useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdownId &&
        dropdownRefs.current[openDropdownId] &&
        !dropdownRefs.current[openDropdownId]?.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      // Clean up all dropdown refs safely
      Object.keys(dropdownRefs.current).forEach((key) => {
        dropdownRefs.current[key] = null;
      });
    };
  }, [openDropdownId]);

  const titleStyle = {
    fontSize: `${customStyle.TitleText || 14}px`,
    fontWeight: customStyle.TitleFontStyle || "600",
    color: customStyle.TitleColor || "#1f2937",
    background: customStyle.HeaderBg || "#f3f4f6",
    borderColor: customStyle.HeaderBorderColor || "#e2e8f0",
  };

  const tableStyle = {
    background: customStyle.TableBg || "#fff",
    borderColor: customStyle.TableBorderColor || "#e2e8f0",
    color: customStyle.TextColor || "#1f2937",
    fontSize: customStyle.FontSize || 14,
  };

  const getRowStyle = () => ({
    height: customStyle.RowHeight || 50,
    backgroundColor: customStyle.RowBg || "#fff",
    color: customStyle.TextColor || "#1f2937",
    borderColor: customStyle.RowBorderColor || "#e5e7eb",
    transition: "background 0.2s",
  });

  return (
    <div className={`table-wrapper ${className || ""}`}>
      <div className="table-container">
        {loading ? (
          <div className="table-loading"><p>Loading...</p></div>
        ) : itemData.length > 0 ? (
          <table className="common-table" style={tableStyle}>
            <thead className="table-header">
              <tr>
                {checkbox && (
                  <td className="table-header-cell">
                    <label>
                      <input
                        type="checkbox"
                        className="table-checkbox"
                        checked={checkedRows.length === itemData.length}
                        onChange={() =>
                          setCheckedRows &&
                          handleAllCheckboxChange(checkedRows, setCheckedRows, itemData, idkey)
                        }
                      />
                    </label>
                  </td>
                )}
                {column.map((head, idx) => (
                  <th key={idx} className="table-header-cell" style={titleStyle}>{head}</th>
                ))}
                {actions && <th className="table-header-cell">Actions</th>}
        </tr>
      </thead>

            <tbody className="table-body">
              {itemData.map((item, idx) => {
                const actualId = getValue(item, idkey);
                return (
                  <tr
                    key={actualId || idx}
                    className="table-row"
                    style={getRowStyle()}
                    onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      customStyle.RowHoverColor || "#f3f4f6")
                    }
                    onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      customStyle.RowBg || "#fff")
                    }
                  >
                    {checkbox && (
                      <td className="table-checkbox-cell">
                        <label>
                          <input
                            type="checkbox"
                            className="table-checkbox"
                            checked={checkedRows.includes(actualId)}
                            onChange={() =>
                              setCheckedRows &&
                              handleCheckboxChange(actualId, checkedRows, setCheckedRows)
                            }
                          />
                        </label>
                      </td>
                    )}

                    {Layout.map((key, colIndex) => {
                      const value = getValue(item, key);

                      // Avatar
                      if (avatar && colIndex === avatar.column) {
                        const src = getValue(item, avatar.imgUrl);
                        const title = getValue(item, avatar.title || "") || "?";
                        const subtitle = avatar.subtitle ? getValue(item, avatar.subtitle) : null;

                        return (
                          <td key={colIndex} className="table-cell-avatar">
                            <div className="avatar-wrapper">
                              {src ? (
                                <img
                                  src={src}
                                  alt={title}
                                  style={{
                                    width: customStyle.AvatarSize || 40,
                                    height: customStyle.AvatarSize || 40,
                                    borderRadius: customStyle.AvatarBorderRadius || "50%",
                                  }}
                                />
                              ) : (
                                <div
                                  className="avatar-placeholder"
                                  style={{
                                    width: customStyle.AvatarSize || 40,
                                    height: customStyle.AvatarSize || 40,
                                    borderRadius: customStyle.AvatarBorderRadius || "50%",
                                  }}
                                >
                                  {title[0]}
                                </div>
                              )}
                              <div className="avatar-text">
                                <span className="avatar-title">{title}</span>
                                {subtitle && <span className="avatar-subtitle">{subtitle}</span>}
                              </div>
                            </div>
                          </td>
                        );
                      }

                      // Multi Avatar
                      if (multiAvatar && colIndex === multiAvatar.column) {
                        const avatars = item[multiAvatar.imgArray] || [];
                        return (
                          <td key={colIndex} className="table-cell-multi-avatar">
                            <div className="multi-avatar-wrapper">
                              {avatars.slice(0, 3).map((user: any, i: number) => (
                                <img
                                  key={i}
                                  src={user[multiAvatar.imgUrl] || "/default-avatar.png"}
                                  alt={user[multiAvatar.name || ""] || "Avatar"}
                                  style={{
                                    width: customStyle.MultiAvatarSize || 32,
                                    height: customStyle.MultiAvatarSize || 32,
                                    border: customStyle.MultiAvatarBorder || "2px solid #fff",
                                  }}
                                  title={user[multiAvatar.name || ""]}
                                />
                              ))}
                              {avatars.length > 3 && (
                                <div
                                  className="multi-avatar-more"
                                  style={{
                                    width: customStyle.MultiAvatarSize || 32,
                                    height: customStyle.MultiAvatarSize || 32,
                                  }}
                                >
                                  +{avatars.length - 3}
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      }

                      // Status Column
                      // if (key === "status.name") {
                      //   return (
                      //     <td
                      //       key={colIndex}
                      //       className="table-cell"
                      //       style={{
                      //         color: customStyle.StatusTextColor || "#fff",
                      //         backgroundColor: customStyle.StatusBgColor || "#4ade80",
                      //         fontWeight: 600,
                      //         borderRadius: 4,
                      //         padding: "0.25rem 0.5rem",
                      //       }}
                      //     >
                      //       {value || ""}
                      //     </td>
                      //   );
                      // }

                      return (
                        <td key={colIndex} className="table-cell">{value || ""}</td>
                      );
                    })}

                    {actions && (
                      <td className="table-cell-actions">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === actualId ? null : actualId);
                          }}
                          className="actions-button"
                          style={{
                            background: customStyle.ActionsButtonBg || "#e5e7eb",
                            color: customStyle.ActionsButtonColor || "#111",
                          }}
                        >
                          Actions
                        </button>

                        {openDropdownId === actualId && (
                          <DropdownMenu
                            itemId={actualId}
                            actions={actions}
                            dropdownRefs={dropdownRefs}
                            setOpenDropdownId={setOpenDropdownId}
                            customStyle={customStyle}
                          />
                        )}
                      </td>
                    )}
          </tr>
                );
              })}
      </tbody>
    </table>
        ) : (
          <div className="table-empty"><p>Nothing Found</p></div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
