# React TablePlus

A powerful and customizable React table component library with advanced features including avatars, multi-avatars, checkboxes, actions dropdown, and extensive styling options.

## ✨ Features

- 📊 **Responsive Tables** - Fully responsive design that works on all devices
- 👤 **Avatar Support** - Display single or multiple user avatars in table cells
- ☑️ **Row Selection** - Checkbox-based row selection with select all functionality
- 🎨 **Custom Styling** - Comprehensive theming system for complete customization
- ⚡ **Actions Dropdown** - Built-in actions menu with view, edit, and delete options
- 🔄 **Loading States** - Built-in loading indicators and empty state handling
- 📱 **Mobile Friendly** - Optimized for mobile and tablet viewing
- 🎯 **TypeScript Ready** - Full TypeScript support with comprehensive type definitions

## 📦 Installation & Usage

```bash
npm install react-tableplus
# or
yarn add react-tableplus
```

## 🚀 Quick Start

### Basic Usage

```jsx
import React from 'react';
import TableComponent from 'react-tableplus';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

function UserTable() {
  return (
    <TableComponent
      column={['ID', 'Name', 'Email', 'Role']}
      itemData={users}
      Layout={['id', 'name', 'email', 'role']}
    />
  );
}

export default UserTable;
```

### 1️⃣ Responsive Tables

Tables automatically adapt to screen size.

```jsx
<TableComponent
  column={['ID', 'Name', 'Email', 'Role']}
  itemData={users}
  Layout={['id', 'name', 'email', 'role']}
/>

```
- On small screens, horizontal scroll appears
- No additional configuration needed

### 2️⃣ Row Selection (Checkbox)

Select rows individually or all at once.

```jsx
const [selectedRows, setSelectedRows] = useState<number[]>([]);

<TableComponent
  column={['ID', 'Name', 'Email']}
  itemData={users}
  Layout={['id', 'name', 'email']}
  checkbox
  checkedRows={selectedRows}
  setCheckedRows={setSelectedRows}
/>


```
Extra Tips:

- Use checkedRows to get selected rows
- Supports “Select All” automatically in header

###  3️⃣ Single Avatar

Display a profile picture with optional title and subtitle.

```jsx

<TableComponent
  column={['Name', 'Email', 'Avatar']}
  itemData={[
    { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://i.pravatar.cc/150?img=1' }
  ]}
  Layout={['name', 'email', 'avatar']}
  avatar={{ column: 2, imgUrl: 'avatar', title: 'name', subtitle: 'email' }}
/>

```

Extra Tips:

- Tooltip shows title
- Subtitle can display email, role, or status


### 4️⃣ Multi-Avatar (Team)

Display multiple avatars in one table cell for groups or teams.

```jsx

<TableComponent
  column={['Project', 'Team']}
  itemData={[
    {
      project: 'Website Redesign',
      team: [
        { name: 'Alice', avatar: 'url1' },
        { name: 'Bob', avatar: 'url2' }
      ]
    }
  ]}
  Layout={['project', 'team']}
  multiAvatar={{ column: 1, imgArray: 'team', imgUrl: 'avatar', name: 'name' }}
/>


```

Extra Tips:

- Hover over each avatar shows member name
- Supports any number of avatars

### 5️⃣ Actions Dropdown

Add row-level actions (view, edit, delete, custom navigation).

```jsx

<TableComponent
column={['ID', 'Name', 'Actions']}
  itemData={[{ _id: 1, name: 'John Doe' }]}
  Layout={['id', 'name']}
  actions={{
    view: '/details',
    edit: '/edit',
    delete: (id) => alert(`Deleted ${id}`),
    onNavigate: (path) => navigate(path),
  }}
/>
```

```jsx
actions={{
  idkey="_id" 
  }}
```
Extra Tips:

- Use idkey if row id field is different

- Dropdown styling can be customized with styles



### 6️⃣ Custom Styling
Change colors, fonts, row hover, and status badges

```jsx

<TableComponent
  column={['Name', 'Status']}
  itemData={[{ name: 'John Doe', status: 'Active' }]}
  Layout={['name', 'status']}
  styles={{
    HeaderBg: '#f3f4f6',
    RowHoverColor: '#e5e7eb',
    TitleFontStyle: 'bold',
    StatusBgColor: '#10b981',
    StatusTextColor: '#fff',
  }}
/>

```

Extra Tips:

- Full control over header, rows, avatars, dropdowns, and status
- Supports multiple pre-built themes or corporate colors


### 7️⃣ Loading State

Show a loading spinner while fetching data.

```jsx
<TableComponent
  column={['Name', 'Email']}
  itemData={[]}
  Layout={['name', 'email']}
  loading={true}
/>

```

- Automatically displays spinner
- No rows are rendered during loading


### Combined Features Example

Combine avatars, multi-avatar, checkbox, actions, and custom styling:

```jsx
  column={['ID', 'Project', 'Team', 'Status', 'Priority']}
  itemData={projects}
  Layout={['id', 'name', 'team', 'status.name', 'priority']}
  avatar={{ column: 1, imgUrl: 'avatar', title: 'name' }}
  multiAvatar={{ column: 2, imgArray: 'team', imgUrl: 'avatar', name: 'name' }}
  checkbox={true}
  checkedRows={selectedRows}
  setCheckedRows={setSelectedRows}
  actions={{
    view: '/details',
    edit: '/edit',
    delete: (id) => alert(`Deleted ${id}`),
    onNavigate: (path) => navigate(path),
  }}
  styles={{
    HeaderBg: '#f8fafc',
    RowHoverColor: '#f1f5f9',
    StatusBgColor: '#10b981',
    StatusTextColor: '#fff',
    ActionsButtonBg: '#e2e8f0',
    TitleFontStyle: 'bold',
  }}
```


Extra Tips:

- Fully responsive on all devices
- Combine with loading prop for async data
- Works with nested object data using dot notation in Layout


## 📚 Complete API Reference

### Core Props

#### `column` (required)
- **Type**: `string[]`
- **Description**: Defines the column headers that will be displayed in the table
- **Usage**: `['ID', 'Name', 'Email', 'Status']`
- **Note**: Must correspond to the `Layout` array

#### `itemData` (required)
- **Type**: `any[]`
- **Description**: Array of data objects that will be rendered as table rows
- **Usage**:
```jsx
const users = [
  { id: 1, name: 'John', email: 'john@test.com', status: 'Active' },
  { id: 2, name: 'Jane', email: 'jane@test.com', status: 'Inactive' }
];
```

#### `Layout` (required)
- **Type**: `string[]`
- **Description**: Maps column headers to object properties using dot notation for nested properties
- **Usage**: `['id', 'name', 'email', 'status']` or `['id', 'user.name', 'user.email']`
- **Note**: Must have same length as `column` array

### Feature Props

#### `avatar` (optional)
- **Type**: `Avatar`
- **Description**: Displays user avatars in a specified column
- **Configuration**:
  - `column`: Column index (0-based) where avatar appears
  - `imgUrl`: Property name containing avatar image URL
  - `title`: Property name for tooltip text (optional)
  - `subtitle`: Property name for subtitle text (optional)

#### `multiAvatar` (optional)
- **Type**: `MultiAvatar`
- **Description**: Displays multiple user avatars in a single cell
- **Configuration**:
  - `column`: Column index (0-based) where multi-avatars appear
  - `imgArray`: Property name containing array of user objects
  - `imgUrl`: Property name for avatar URL in each user object
  - `name`: Property name for tooltip text in each user object (optional)

#### `actions` (optional)
- **Type**: `ActionProps`
- **Description**: Adds a dropdown menu with actions for each row
- **Configuration**:
  - `idkey`: Property name for unique row ID (default: 'id')
  - `view`: Route path for view action (optional)
  - `edit`: Route path for edit action (optional)
  - `delete`: Delete handler function (optional)
  - `onNavigate`: Navigation handler function (optional)

#### `checkbox` (optional)
- **Type**: `boolean`
- **Description**: Enables row selection with checkboxes
- **Usage**: `<Table checkbox={true} ... />`
- **Note**: Requires `checkedRows` and `setCheckedRows` for controlled usage

#### `checkedRows` (optional)
- **Type**: `number[]`
- **Description**: Controlled array of selected row IDs
- **Usage**: `[1, 3, 5]` (row IDs that are selected)

#### `setCheckedRows` (optional)
- **Type**: `(rows: number[]) => void`
- **Description**: Callback function called when row selection changes
- **Usage**: `(selectedIds) => setSelectedRows(selectedIds)`

#### `loading` (optional)
- **Type**: `boolean`
- **Description**: Shows loading spinner instead of table content
- **Usage**: `<Table loading={isLoading} ... />`

#### `className` (optional)
- **Type**: `string`
- **Description**: Additional CSS class applied to table wrapper
- **Usage**: `<Table className="my-custom-table" ... />`

#### `styles` (optional)
- **Type**: `StyleProps`
- **Description**: Comprehensive styling configuration object
- **Usage**: See [Styling Guide](#-styling-guide) below

### Configuration Interfaces

#### Avatar Configuration
```typescript
interface Avatar {
  column: number;        // Column index where avatar appears (0-based)
  imgUrl: string;        // Field name containing the avatar image URL
  title?: string;        // Field name for title text (optional)
  subtitle?: string;     // Field name for subtitle text (optional)
}
```

#### Multi-Avatar Configuration
```typescript
interface MultiAvatar {
  column: number;        // Column index where multi-avatar appears (0-based)
  imgArray: string;      // Field name containing array of user objects
  imgUrl: string;        // Field name for avatar URL in each user object
  name?: string;         // Field name for name in each user object (for tooltips)
}
```

#### Actions Configuration
```typescript
interface ActionProps {
  idkey?: string;        // Field name for unique ID (default: 'id')
  delete?: (id: string) => void;  // Delete handler function
  view?: string;         // View route path (e.g., '/details')
  edit?: string;         // Edit route path (e.g., '/edit')
  onNavigate?: (path: string) => void;  // Navigation handler function
}
```

## 🎨 Complete Styling Guide

The `styles` prop accepts a comprehensive configuration object that controls every visual aspect of the table. Below is a detailed breakdown of each styling option:

### Header & Title Styling

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `TitleText` | `number` | Font size for column headers (px) | `16` |
| `TitleFontStyle` | `"normal" \| "bold" \| "500" \| "600"` | Font weight for headers | `"bold"` |
| `TitleColor` | `string` | Text color for column headers | `"#1f2937"` |
| `HeaderBg` | `string` | Background color for header row | `"#f8fafc"` |
| `HeaderBorderColor` | `string` | Border color for header | `"#e5e7eb"` |

### Table Body Styling

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `TableBg` | `string` | Background color for entire table | `"#ffffff"` |
| `TableBorderColor` | `string` | Border color for table outline | `"#e5e7eb"` |
| `TextColor` | `string` | Default text color for table content | `"#1f2937"` |
| `FontSize` | `number` | Base font size for table content (px) | `14` |

### Row Styling

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `RowHeight` | `number` | Height of each table row (px) | `50` |
| `RowBg` | `string` | Default background color for rows | `"#ffffff"` |
| `RowHoverColor` | `string` | Background color when hovering over rows | `"#f3f4f6"` |
| `RowBorderColor` | `string` | Border color between rows | `"#e5e7eb"` |

### Avatar Styling

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `AvatarSize` | `number` | Width and height of avatar images (px) | `40` |
| `AvatarBorderRadius` | `string` | Border radius for avatar images | `"50%"` |

### Multi-Avatar Styling

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `MultiAvatarSize` | `number` | Size of each avatar in multi-avatar display (px) | `32` |
| `MultiAvatarBorder` | `string` | Border style for multi-avatar images | `"2px solid #fff"` |

### Actions Button Styling

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `ActionsButtonBg` | `string` | Background color for action buttons | `"#e5e7eb"` |
| `ActionsButtonColor` | `string` | Text color for action buttons | `"#111827"` |
| `ActionsButtonHoverBg` | `string` | Background color when hovering action buttons | `"#d1d5db"` |

### Dropdown Menu Styling

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `DropdownBg` | `string` | Background color for dropdown menu | `"#ffffff"` |
| `DropdownBorderColor` | `string` | Border color for dropdown menu | `"#e5e7eb"` |
| `DropdownItemBg` | `string` | Background color for dropdown items | `"#ffffff"` |
| `DropdownItemHoverBg` | `string` | Background color when hovering dropdown items | `"#f3f4f6"` |

### Status Column Styling

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `StatusTextColor` | `string` | Text color for status indicators | `"#ffffff"` |
| `StatusBgColor` | `string` | Background color for status indicators | `"#10b981"` |

## 🎨 Detailed Styling Examples

### Dark Theme
```jsx
<TableComponent
  column={['Name', 'Email', 'Status']}
  itemData={users}
  Layout={['name', 'email', 'status']}
  styles={{
    // Dark header
    HeaderBg: '#1f2937',
    TitleColor: '#f9fafb',
    HeaderBorderColor: '#374151',

    // Dark table
    TableBg: '#111827',
    TableBorderColor: '#374151',
    TextColor: '#f9fafb',

    // Dark rows
    RowBg: '#1f2937',
    RowHoverColor: '#374151',
    RowBorderColor: '#4b5563',

    // Status styling
    StatusBgColor: '#059669',
    StatusTextColor: '#ffffff'
  }}
/>
```

### Compact Mobile-Friendly Design
```jsx
<TableComponent
  column={['Name', 'Status']}
  itemData={users}
  Layout={['name', 'status']}
  styles={{
    // Smaller text for mobile
    TitleText: 12,
    FontSize: 12,

    // Compact rows
    RowHeight: 35,

    // Subtle styling
    HeaderBg: '#f8fafc',
    RowHoverColor: '#f1f5f9',
    TableBorderColor: '#e2e8f0'
  }}
/>
```

### High Contrast Accessibility Theme
```jsx
<TableComponent
  column={['ID', 'Name', 'Status']}
  itemData={users}
  Layout={['id', 'name', 'status']}
  styles={{
    // High contrast colors
    TitleColor: '#000000',
    TextColor: '#000000',
    HeaderBg: '#ffffff',
    RowBg: '#ffffff',

    // Strong borders
    TableBorderColor: '#000000',
    HeaderBorderColor: '#000000',
    RowBorderColor: '#000000',

    // Hover effects
    RowHoverColor: '#f0f0f0',

    // Status with high contrast
    StatusBgColor: '#000000',
    StatusTextColor: '#ffffff'
  }}
/>
```

### Corporate Brand Theme
```jsx
<TableComponent
  column={['Employee', 'Department', 'Status']}
  itemData={employees}
  Layout={['name', 'department', 'status']}
  avatar={{
    column: 0,
    imgUrl: 'avatar',
    title: 'name'
  }}
  styles={{
    // Corporate blue theme
    HeaderBg: '#1e40af',
    TitleColor: '#ffffff',
    TitleFontStyle: 'bold',

    // Clean white table
    TableBg: '#ffffff',
    TextColor: '#1f2937',

    // Professional row styling
    RowHeight: 55,
    RowHoverColor: '#eff6ff',
    RowBg: '#ffffff',

    // Avatar styling
    AvatarSize: 45,
    AvatarBorderRadius: '8px',

    // Status badges
    StatusBgColor: '#1e40af',
    StatusTextColor: '#ffffff',

    // Action buttons
    ActionsButtonBg: '#1e40af',
    ActionsButtonColor: '#ffffff',
    ActionsButtonHoverBg: '#1d4ed8'
  }}
/>
```

## 📋 Props Deep Dive

### Understanding Each Prop

#### `column` and `Layout` - The Foundation
These two props work together to define your table structure:

```jsx
// Define what users see
column={['ID', 'Name', 'Email', 'Role']}

// Define where data comes from
Layout={['id', 'name', 'email', 'role']}

// For nested data
Layout={['id', 'user.name', 'user.email', 'user.role']}
```

#### `itemData` - Your Data Source
```jsx
const data = [
  { id: 1, name: 'John', email: 'john@test.com' },
  { id: 2, name: 'Jane', email: 'jane@test.com' }
];

// Works with complex nested data too
const complexData = [
  {
    id: 1,
    user: { name: 'John', email: 'john@test.com' },
    team: [
      { name: 'Alice', avatar: 'url1' },
      { name: 'Bob', avatar: 'url2' }
    ]
  }
];
```

#### `avatar` - Single User Display
Perfect for showing profile pictures:

```jsx
avatar={{
  column: 1,           // Show avatar in 2nd column (0-based)
  imgUrl: 'avatar',    // Use 'avatar' property for image URL
  title: 'name',       // Show 'name' as tooltip
  subtitle: 'role'     // Show 'role' as subtitle below avatar
}}
```

#### `multiAvatar` - Team Display
Great for showing multiple users in one cell:

```jsx
multiAvatar={{
  column: 3,           // Show in 4th column
  imgArray: 'team',    // Array of team member objects
  imgUrl: 'avatar',    // Avatar URL in each team member
  name: 'name'         // Name for tooltips
}}
```

#### `actions` - Row Operations
Add functionality to each row:

```jsx
actions={{
  idkey: 'id',         // Default: 'id'
  view: '/users',      // Route for view action
  edit: '/users',      // Route for edit action
  delete: handleDelete, // Function called on delete
  onNavigate: (path) => navigate(path) // Handle navigation
}}
```

#### `checkbox` - Row Selection
Enable multi-select functionality:

```jsx
// Uncontrolled (internal state)
<TableComponent checkbox={true} ... />

// Controlled (external state)
const [selected, setSelected] = useState([]);
<TableComponent
  checkbox={true}
  checkedRows={selected}
  setCheckedRows={setSelected}
  ...
/>
```

#### `loading` - Loading States
Show loading indicator:

```jsx
{loading ? (
  <TableComponent loading={true} ... />
) : (
  <TableComponent itemData={data} ... />
)}
```

#### `className` - Custom CSS
Add your own styling:

```jsx
<TableComponent className="my-custom-table responsive-table" ... />
```

#### `styles` - Complete Customization
See [Complete Styling Guide](#-complete-styling-guide) above for full details.

## 🔧 Advanced Examples

### Loading State
```jsx
function DataTable({ loading, data }) {
  return (
    <TableComponent
      column={['Name', 'Email']}
      itemData={data}
      Layout={['name', 'email']}
      loading={loading}
    />
  );
}
```

### Dynamic Column Visibility
```jsx
function DynamicTable({ showExtraColumns }) {
  const columns = ['Name', 'Email'];
  const layout = ['name', 'email'];

  if (showExtraColumns) {
    columns.push('Phone', 'Role');
    layout.push('phone', 'role');
  }

  return (
    <Table
      column={columns}
      itemData={data}
      Layout={layout}
    />
  );
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Md Moniruzzaman](https://github.com/md-moniruzzaman01)

---

**Made with ❤️ for the React community**
