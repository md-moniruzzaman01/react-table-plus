import React from "react";

export type DropdownProps = {
  itemId: string | number;
  actions: ActionProps;
  dropdownRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  setOpenDropdownId: React.Dispatch<React.SetStateAction<string | null>>;
  customStyle?: StyleProps;
};

export type ActionProps = {
  idkey?: string;
  delete?: (id: string | number) => void;
  view?: string;
  edit?: string;
  onNavigate?: (path: string) => void;
};

export type Avatar = {
  column: number;
  imgUrl: string;
  title?: string;
  subtitle?: string;
};

export type MultiAvatar = {
  column: number;
  imgArray: string;
  imgUrl: string;
  name?: string;
};

export type TableProps = {
  column: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  Layout: string[];
  avatar?: Avatar;
  multiAvatar?: MultiAvatar;
  actions?: ActionProps;
  className?: string;
  checkbox?: {
    selectedRows: number[];
    setSelectedRows: (rows: number[]) => void;
  };
  loading?: boolean;
  styles?: StyleProps;
};

export type StyleProps = {
  // Header & Title
  TitleText?: number;
  TitleFontStyle?: "normal" | "bold" | "500" | "600";
  TitleTextAlign?: "start" | "center" | "end";
  TitleColor?: string;
  HeaderBg?: string;
  HeaderBorderColor?: string;

  // Table body
  TableBg?: string;
  TableBorderColor?: string;
  TextColor?: string;
  FontSize?: number;
  TableShadow?: string;
  TableBorderRadius?: string

  // Rows
  RowHeight?: number;
  RowBg?: string;
  RowHoverColor?: string;
  RowBorderColor?: string;
  TextAlign?: "start" | "center" | "end";

  // Avatar
  AvatarSize?: number;
  AvatarBorderRadius?: string;

  // Multi-avatar
  MultiAvatarSize?: number;
  MultiAvatarBorder?: string;

  // Actions button
  ActionsButtonBg?: string;
  ActionsButtonColor?: string;
  ActionsButtonHoverBg?: string;

  // Dropdown menu
  DropdownBg?: string;
  DropdownBorderColor?: string;
  DropdownItemBg?: string;
  DropdownItemHoverBg?: string;

  // Status column
  StatusTextColor?: string;
  StatusBgColor?: string;
};
