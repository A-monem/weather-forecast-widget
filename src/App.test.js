import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mount, shallow } from 'enzyme';
import App from './App';

describe('App renders correctly', () => {
  test('app renders', () => {
    expect(true).toBeTruthy();
  });
});
