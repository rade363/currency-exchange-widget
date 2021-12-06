import React from 'react';
import { create } from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  test('Should render active primary button', () => {
    const button = create(
      <Button
        styleType="primary"
        active
      >
        Click me
      </Button>,
    );
    const tree = button.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Active button should be active and clickable', () => {
    const mockCallBack = jest.fn();

    const { getByText } = render(
      <Button
        styleType="primary"
        active
        onClick={mockCallBack}
      >
        Click me
      </Button>,
    );

    fireEvent.click(screen.getByText(/click me/i));

    expect(getByText(/Click me/i).closest('button')).toBeEnabled();
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });

  test('Inactive button should be disabled and not fire the onClick event', () => {
    const mockCallBack = jest.fn();

    const { getByText } = render(
      <Button
        styleType="danger"
        active={false}
      >
        Click me
      </Button>,
    );

    fireEvent.click(screen.getByText(/click me/i));

    expect(getByText(/Click me/i).closest('button')).toBeDisabled();
    expect(mockCallBack).toHaveBeenCalledTimes(0);
  });
});
