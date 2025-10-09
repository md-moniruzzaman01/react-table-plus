import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var handleCheckboxChange = function handleCheckboxChange(id, checkedRows, setCheckedRows) {
  if (checkedRows.includes(id)) {
    setCheckedRows(checkedRows.filter(function (item) {
      return item !== id;
    }));
  } else {
    setCheckedRows([].concat(_toConsumableArray(checkedRows), [id]));
  }
};
// All-checkbox handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var handleAllCheckboxChange = function handleAllCheckboxChange(checkedRows, setCheckedRows, items, idKey) {
  var allIds = (items === null || items === void 0 ? void 0 : items.map(function (item) {
    return item[idKey];
  }).filter(function (id) {
    return id !== undefined && id !== null;
  })) || [];
  if (checkedRows.length === allIds.length) {
    setCheckedRows([]);
  } else {
    setCheckedRows(allIds);
  }
};
var getValue = function getValue(item, key) {
  return key.split(".").reduce(function (acc, k) {
    return acc === null || acc === void 0 ? void 0 : acc[k];
  }, item);
};

var DropdownMenu = function DropdownMenu(_ref) {
  var itemId = _ref.itemId,
    actions = _ref.actions,
    dropdownRefs = _ref.dropdownRefs,
    setOpenDropdownId = _ref.setOpenDropdownId,
    onNavigate = _ref.onNavigate,
    _ref$customStyle = _ref.customStyle,
    customStyle = _ref$customStyle === void 0 ? {} : _ref$customStyle;
  return jsx("div", {
    ref: function ref(el) {
      dropdownRefs.current[itemId] = el;
    },
    className: "dropdown-menu",
    style: {
      background: customStyle.DropdownBg || "#fff",
      borderColor: customStyle.DropdownBorderColor || "#e5e7eb"
    },
    children: jsxs("ul", {
      children: [actions.view && jsx("li", {
        className: "dropdown-item",
        onClick: function onClick() {
          onNavigate === null || onNavigate === void 0 ? void 0 : onNavigate("".concat(actions.view, "/").concat(itemId));
          setOpenDropdownId(null);
        },
        style: {
          backgroundColor: customStyle.DropdownItemBg || "transparent"
        },
        onMouseEnter: function onMouseEnter(e) {
          return e.currentTarget.style.backgroundColor = customStyle.DropdownItemHoverBg || "#f3f4f6";
        },
        onMouseLeave: function onMouseLeave(e) {
          return e.currentTarget.style.backgroundColor = customStyle.DropdownItemBg || "transparent";
        },
        children: "\uD83D\uDC41\uFE0F View"
      }), actions.edit && jsx("li", {
        className: "dropdown-item",
        onClick: function onClick() {
          onNavigate === null || onNavigate === void 0 ? void 0 : onNavigate("".concat(actions.edit, "/").concat(itemId));
          setOpenDropdownId(null);
        },
        style: {
          backgroundColor: customStyle.DropdownItemBg || "transparent"
        },
        onMouseEnter: function onMouseEnter(e) {
          return e.currentTarget.style.backgroundColor = customStyle.DropdownItemHoverBg || "#f3f4f6";
        },
        onMouseLeave: function onMouseLeave(e) {
          return e.currentTarget.style.backgroundColor = customStyle.DropdownItemBg || "transparent";
        },
        children: "\u270F\uFE0F Edit"
      }), actions["delete"] && jsx("li", {
        className: "dropdown-item",
        onClick: function onClick() {
          actions["delete"](itemId);
          setOpenDropdownId(null);
        },
        children: "\uD83D\uDDD1\uFE0F Delete"
      })]
    })
  });
};

var Table = function Table(_ref) {
  var column = _ref.column,
    _ref$itemData = _ref.itemData,
    itemData = _ref$itemData === void 0 ? [] : _ref$itemData,
    Layout = _ref.Layout,
    avatar = _ref.avatar,
    multiAvatar = _ref.multiAvatar,
    actions = _ref.actions,
    checkbox = _ref.checkbox,
    _ref$checkedRows = _ref.checkedRows,
    checkedRows = _ref$checkedRows === void 0 ? [] : _ref$checkedRows,
    setCheckedRows = _ref.setCheckedRows,
    loading = _ref.loading,
    className = _ref.className,
    _ref$styles = _ref.styles,
    customStyle = _ref$styles === void 0 ? {} : _ref$styles;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    openDropdownId = _useState2[0],
    setOpenDropdownId = _useState2[1];
  var dropdownRefs = useRef({});
  var idkey = (actions === null || actions === void 0 ? void 0 : actions.idkey) || "id";
  useEffect(function () {
    var handleClickOutside = function handleClickOutside(event) {
      var _a;
      if (openDropdownId && dropdownRefs.current[openDropdownId] && !((_a = dropdownRefs.current[openDropdownId]) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
      // Clean up all dropdown refs safely
      Object.keys(dropdownRefs.current).forEach(function (key) {
        dropdownRefs.current[key] = null;
      });
    };
  }, [openDropdownId]);
  var titleStyle = {
    fontSize: "".concat(customStyle.TitleText || 14, "px"),
    fontWeight: customStyle.TitleFontStyle || "600",
    color: customStyle.TitleColor || "#1f2937",
    background: customStyle.HeaderBg || "#f3f4f6",
    borderColor: customStyle.HeaderBorderColor || "#e2e8f0"
  };
  var tableStyle = {
    background: customStyle.TableBg || "#fff",
    borderColor: customStyle.TableBorderColor || "#e2e8f0",
    color: customStyle.TextColor || "#1f2937",
    fontSize: customStyle.FontSize || 14
  };
  var getRowStyle = function getRowStyle() {
    return {
      height: customStyle.RowHeight || 50,
      backgroundColor: customStyle.RowBg || "#fff",
      color: customStyle.TextColor || "#1f2937",
      borderColor: customStyle.RowBorderColor || "#e5e7eb",
      transition: "background 0.2s"
    };
  };
  return jsx("div", {
    className: "table-wrapper ".concat(className || ""),
    children: jsx("div", {
      className: "table-container",
      children: loading ? jsx("div", {
        className: "table-loading",
        children: jsx("p", {
          children: "Loading..."
        })
      }) : itemData.length > 0 ? jsxs("table", {
        className: "common-table",
        style: tableStyle,
        children: [jsx("thead", {
          className: "table-header",
          children: jsxs("tr", {
            children: [checkbox && jsx("td", {
              className: "table-header-cell",
              children: jsx("label", {
                children: jsx("input", {
                  type: "checkbox",
                  className: "table-checkbox",
                  checked: checkedRows.length === itemData.length,
                  onChange: function onChange() {
                    return setCheckedRows && handleAllCheckboxChange(checkedRows, setCheckedRows, itemData, idkey);
                  }
                })
              })
            }), column.map(function (head, idx) {
              return jsx("th", {
                className: "table-header-cell",
                style: titleStyle,
                children: head
              }, idx);
            }), actions && jsx("th", {
              className: "table-header-cell",
              children: "Actions"
            })]
          })
        }), jsx("tbody", {
          className: "table-body",
          children: itemData.map(function (item, idx) {
            var actualId = getValue(item, idkey);
            return jsxs("tr", {
              className: "table-row",
              style: getRowStyle(),
              onMouseEnter: function onMouseEnter(e) {
                return e.currentTarget.style.backgroundColor = customStyle.RowHoverColor || "#f3f4f6";
              },
              onMouseLeave: function onMouseLeave(e) {
                return e.currentTarget.style.backgroundColor = customStyle.RowBg || "#fff";
              },
              children: [checkbox && jsx("td", {
                className: "table-checkbox-cell",
                children: jsx("label", {
                  children: jsx("input", {
                    type: "checkbox",
                    className: "table-checkbox",
                    checked: checkedRows.includes(actualId),
                    onChange: function onChange() {
                      return setCheckedRows && handleCheckboxChange(actualId, checkedRows, setCheckedRows);
                    }
                  })
                })
              }), Layout.map(function (key, colIndex) {
                var value = getValue(item, key);
                // Avatar
                if (avatar && colIndex === avatar.column) {
                  var src = getValue(item, avatar.imgUrl);
                  var title = getValue(item, avatar.title || "") || "?";
                  var subtitle = avatar.subtitle ? getValue(item, avatar.subtitle) : null;
                  return jsx("td", {
                    className: "table-cell-avatar",
                    children: jsxs("div", {
                      className: "avatar-wrapper",
                      children: [src ? jsx("img", {
                        src: src,
                        alt: title,
                        style: {
                          width: customStyle.AvatarSize || 40,
                          height: customStyle.AvatarSize || 40,
                          borderRadius: customStyle.AvatarBorderRadius || "50%"
                        }
                      }) : jsx("div", {
                        className: "avatar-placeholder",
                        style: {
                          width: customStyle.AvatarSize || 40,
                          height: customStyle.AvatarSize || 40,
                          borderRadius: customStyle.AvatarBorderRadius || "50%"
                        },
                        children: title[0]
                      }), jsxs("div", {
                        className: "avatar-text",
                        children: [jsx("span", {
                          className: "avatar-title",
                          children: title
                        }), subtitle && jsx("span", {
                          className: "avatar-subtitle",
                          children: subtitle
                        })]
                      })]
                    })
                  }, colIndex);
                }
                // Multi Avatar
                if (multiAvatar && colIndex === multiAvatar.column) {
                  var avatars = item[multiAvatar.imgArray] || [];
                  return jsx("td", {
                    className: "table-cell-multi-avatar",
                    children: jsxs("div", {
                      className: "multi-avatar-wrapper",
                      children: [avatars.slice(0, 3).map(function (user, i) {
                        return jsx("img", {
                          src: user[multiAvatar.imgUrl] || "/default-avatar.png",
                          alt: user[multiAvatar.name || ""] || "Avatar",
                          style: {
                            width: customStyle.MultiAvatarSize || 32,
                            height: customStyle.MultiAvatarSize || 32,
                            border: customStyle.MultiAvatarBorder || "2px solid #fff"
                          },
                          title: user[multiAvatar.name || ""]
                        }, i);
                      }), avatars.length > 3 && jsxs("div", {
                        className: "multi-avatar-more",
                        style: {
                          width: customStyle.MultiAvatarSize || 32,
                          height: customStyle.MultiAvatarSize || 32
                        },
                        children: ["+", avatars.length - 3]
                      })]
                    })
                  }, colIndex);
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
                return jsx("td", {
                  className: "table-cell",
                  children: value || ""
                }, colIndex);
              }), actions && jsxs("td", {
                className: "table-cell-actions",
                children: [jsx("button", {
                  onClick: function onClick(e) {
                    e.stopPropagation();
                    setOpenDropdownId(openDropdownId === actualId ? null : actualId);
                  },
                  className: "actions-button",
                  style: {
                    background: customStyle.ActionsButtonBg || "#e5e7eb",
                    color: customStyle.ActionsButtonColor || "#111"
                  },
                  children: "Actions"
                }), openDropdownId === actualId && jsx(DropdownMenu, {
                  itemId: actualId,
                  actions: actions,
                  dropdownRefs: dropdownRefs,
                  setOpenDropdownId: setOpenDropdownId,
                  customStyle: customStyle
                })]
              })]
            }, actualId || idx);
          })
        })]
      }) : jsx("div", {
        className: "table-empty",
        children: jsx("p", {
          children: "Nothing Found"
        })
      })
    })
  });
};

export { Table as default, getValue, handleAllCheckboxChange, handleCheckboxChange };
//# sourceMappingURL=index.esm.js.map
