import React, { FC, useEffect, useRef, useState } from "react";

import { StyleProps, TableProps } from "./types";
import {
  handleAllCheckboxChange,
  handleCheckboxChange,
  getValue,
} from "./utils";
import DropdownMenu from "./components/DropdownMenu";
import "./styles.css";
// Export types for external use
export type {
  TableProps,
  DropdownProps,
  ActionProps,
  Avatar,
  MultiAvatar,
  StyleProps,
} from "./types";
const TableComponent: FC<TableProps> = ({
  column,
  data = [],
  Layout,
  avatar,
  multiAvatar,
  actions,
  checkbox,
  loading,
  className,
  styles: customStyle = {} as StyleProps,
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const idkey = actions?.idkey || "id";

  const selectedRows = checkbox?.selectedRows || [];
  const setSelectedRows = checkbox?.setSelectedRows || (() => {});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If any dropdown is open, check all refs
      if (openDropdownId) {
        const dropdownEl = dropdownRefs.current[openDropdownId];
        if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
          setOpenDropdownId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]); // Keep only the dropdown open id as dependency

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       openDropdownId &&
  //       dropdownRefs.current[openDropdownId] &&
  //       !dropdownRefs.current[openDropdownId]?.contains(event.target as Node)
  //     ) {
  //       setOpenDropdownId(null);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);

  //     // Clean up all dropdown refs safely
  //     Object.keys(dropdownRefs.current).forEach((key) => {
  //       dropdownRefs.current[key] = null;
  //     });
  //   };
  // }, [openDropdownId]);

  const titleStyle = {
    fontSize: `${customStyle.TitleText || 14}px`,
    fontWeight: customStyle.TitleFontStyle || "600",
    textAlign: customStyle.TitleTextAlign || "start",
    color: customStyle.TitleColor || "var(--tbl-header-text)",
    background: customStyle.HeaderBg || "var(--tbl-header-bg)",
    border: customStyle.HeaderBorderColor
      ? `1px solid ${customStyle.HeaderBorderColor}`
      : undefined,
  };
  const tableStyle = {
    background: customStyle.TableBg || "#fff",
    borderColor: customStyle.TableBorderColor,
    color: customStyle.TextColor || "#1f2937",
    fontSize: customStyle.FontSize || 14,
  };

  const getRowStyle = () => ({
    height: customStyle.RowHeight || 50,
    textAlign: customStyle.TextAlign || "start",
    backgroundColor: customStyle.RowBg || "var(--table-row-bg)",
    color: customStyle.TextColor || "#1f2937",
    border: customStyle.RowBorderColor
      ? `1px solid ${customStyle.RowBorderColor}`
      : undefined,
    transition: "background 0.2s",
  });

  return (
    <div className={`table-wrapper ${className || ""}`}>
      <div className="table-container">
        {loading ? (
          <div className="table-loading">
            <p>Loading...</p>
          </div>
        ) : data.length > 0 ? (
          <table className="common-table" style={tableStyle}>
            <thead className="table-header">
              <tr>
                {checkbox && (
                  <th className="table-header-cell" style={titleStyle}>
                    <label>
                      <input
                        type="checkbox"
                        className="table-checkbox"
                        checked={selectedRows.length === data.length}
                        onChange={() =>
                          handleAllCheckboxChange(
                            selectedRows,
                            setSelectedRows,
                            data,
                            idkey
                          )
                        }
                      />
                    </label>
                  </th>
                )}
                {column.map((head, idx) => (
                  <th
                    key={idx}
                    className="table-header-cell"
                    style={titleStyle}
                  >
                    {head}
                  </th>
                ))}
                {
                  actions && (
                    <th className="table-header-cell" style={titleStyle}>
                      Actions
                    </th>
                  ) //className="table-header-cell"
                }
              </tr>
            </thead>
            <tbody className="table-body">
              {data.map((item, idx) => {
                const actualId = getValue(item, idkey);
                return (
                  <tr
                    key={actualId || idx}
                    className="table-row"
                    style={getRowStyle()}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        customStyle.RowHoverColor || "var(--tbl-hover-bg)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        customStyle.RowBg || "var(--table-row-bg)")
                    }
                  >
                    {checkbox && (
                      <td
                        className="table-checkbox-cell"
                        style={{
                          border: customStyle.RowBorderColor
                            ? `1px solid ${customStyle.RowBorderColor}`
                            : undefined,
                        }}
                      >
                        <label>
                          <input
                            type="checkbox"
                            className="table-checkbox"
                            checked={selectedRows.includes(actualId)}
                            onChange={() =>
                              handleCheckboxChange(
                                actualId,
                                selectedRows,
                                setSelectedRows
                              )
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
                        const subtitle = avatar.subtitle
                          ? getValue(item, avatar.subtitle)
                          : null;

                        return (
                          <td
                            key={colIndex}
                            className="table-cell-avatar"
                            style={{
                              border: customStyle.RowBorderColor
                                ? `1px solid ${customStyle.RowBorderColor}`
                                : undefined,
                            }}
                          >
                            <div className="avatar-wrapper">
                              {src ? (
                                <img
                                  src={src}
                                  alt={title}
                                  style={{
                                    width: customStyle.AvatarSize || 40,
                                    height: customStyle.AvatarSize || 40,
                                    borderRadius:
                                      customStyle.AvatarBorderRadius || "50%",
                                  }}
                                />
                              ) : (
                                <div
                                  className="avatar-placeholder"
                                  style={{
                                    width: customStyle.AvatarSize || 40,
                                    height: customStyle.AvatarSize || 40,
                                    borderRadius:
                                      customStyle.AvatarBorderRadius || "50%",
                                  }}
                                >
                                  {title[0]}
                                </div>
                              )}
                              <div className="avatar-text">
                                <span className="avatar-title">{title}</span>
                                {subtitle && (
                                  <span className="avatar-subtitle">
                                    {subtitle}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                        );
                      }

                      // Multi Avatar
                      if (multiAvatar && colIndex === multiAvatar.column) {
                        const avatars = item[multiAvatar.imgArray] || [];

                        return (
                          <td
                            key={colIndex}
                            className="table-cell-multi-avatar table-cell"
                            style={{
                              // border: customStyle.RowBorderColor ? `1px solid ${customStyle.RowBorderColor}` : undefined,
                              height: customStyle.RowHeight || 50,
                            }}
                          >
                            <div className="multi-avatar-wrapper">
                              {avatars
                                .slice(0, 3)
                                .map((user: any, i: number) => (
                                  <img
                                    key={i}
                                    src={
                                      user[multiAvatar.imgUrl] ||
                                      "/default-avatar.png"
                                    }
                                    alt={
                                      user[multiAvatar.name || ""] || "Avatar"
                                    }
                                    title={user[multiAvatar.name || ""]}
                                    className="multi-avatar-image"
                                    style={{
                                      width: customStyle.MultiAvatarSize || 32,
                                      height: customStyle.MultiAvatarSize || 32,
                                      border:
                                        customStyle.MultiAvatarBorder ||
                                        "2px solid #fff",
                                      left: `${i * 22}px`, // control overlap distance
                                      zIndex: 10 - i,
                                    }}
                                  />
                                ))}

                              {avatars.length > 3 && (
                                <div
                                  className="multi-avatar-more"
                                  style={{
                                    width: customStyle.MultiAvatarSize || 32,
                                    height: customStyle.MultiAvatarSize || 32,
                                    left: `${3 * 22}px`,
                                  }}
                                >
                                  +{avatars.length - 3}
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      }

                      return (
                        <td
                          key={colIndex}
                          className="table-cell"
                          style={{
                            border: customStyle.RowBorderColor
                              ? `1px solid ${customStyle.RowBorderColor}`
                              : undefined,
                          }}
                        >
                          {value || ""}
                        </td>
                      );
                    })}

                    {actions && (
                      <td
                        className="table-cell-actions"
                        style={{
                          height: customStyle.RowHeight || 50,
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(
                              openDropdownId === actualId ? null : actualId
                            );
                          }}
                          className="actions-button"
                          style={{
                            background:
                              customStyle.ActionsButtonBg || "#e5e7eb",
                            color: customStyle.ActionsButtonColor || "#111",
                          }}
                        >
                          •••
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
          <div className="table-empty">
            <p>Nothing Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
