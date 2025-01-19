import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

jest.mock('gatsby', () => {
  const React = require('react');
  const gatsby = jest.requireActual('gatsby');

  return {
    ...gatsby,
    graphql: jest.fn(), 
    StaticQuery: jest.fn(), 
    useStaticQuery: jest.fn(), 
  };
});