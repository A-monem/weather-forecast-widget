/* eslint-disable no-undef */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import { mount } from 'enzyme';
import App from './App';
import '@testing-library/jest-dom';

describe('logic', () => {
  test('app get weather data', async () => {
    // const onSubmit = jest.fn();

    // render(<App />);
    // fireEvent.change(screen.getByLabelText(/enter/i), { target: { value: 'London' } });
    // fireEvent.click(screen.getByText(/submit/i));
    // expect(onSubmit).toHaveBeenCalled();
  });
});
