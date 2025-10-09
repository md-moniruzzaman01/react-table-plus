import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../index';

interface TestData {
  id: number;
  name: string;
  age: number;
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
];

const columns = ['ID', 'Name', 'Age'];
const layout = ['id', 'name', 'age'];

describe('Table Component', () => {
  test('renders table with data', () => {
    render(
      <Table
        column={columns}
        itemData={testData}
        Layout={layout}
      />
    );

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });
});
