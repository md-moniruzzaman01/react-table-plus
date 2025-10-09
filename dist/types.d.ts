import React from 'react';
export type DropdownProps = {
    itemId: string;
    actions: {
        delete?: (id: string) => void;
        view?: string;
        edit?: string;
    };
    dropdownRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
    setOpenDropdownId: React.Dispatch<React.SetStateAction<string | null>>;
    onNavigate?: (path: string) => void;
    customStyle?: StyleProps;
};
export type ActionProps = {
    idkey?: string;
    delete?: (id: string) => void;
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
    itemData?: any[];
    Layout: string[];
    avatar?: Avatar;
    multiAvatar?: MultiAvatar;
    actions?: ActionProps;
    className?: string;
    checkbox?: boolean;
    checkedRows?: number[];
    setCheckedRows?: (rows: number[]) => void;
    loading?: boolean;
    styles?: StyleProps;
};
export type StyleProps = {
    TitleText?: number;
    TitleFontStyle?: "normal" | "bold" | "500" | "600";
    TitleColor?: string;
    HeaderBg?: string;
    HeaderBorderColor?: string;
    TableBg?: string;
    TableBorderColor?: string;
    TextColor?: string;
    FontSize?: number;
    RowHeight?: number;
    RowBg?: string;
    RowHoverColor?: string;
    RowBorderColor?: string;
    AvatarSize?: number;
    AvatarBorderRadius?: string;
    MultiAvatarSize?: number;
    MultiAvatarBorder?: string;
    ActionsButtonBg?: string;
    ActionsButtonColor?: string;
    ActionsButtonHoverBg?: string;
    DropdownBg?: string;
    DropdownBorderColor?: string;
    DropdownItemBg?: string;
    DropdownItemHoverBg?: string;
    StatusTextColor?: string;
    StatusBgColor?: string;
};
