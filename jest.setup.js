import '@testing-library/jest-dom/extend-expect'; // Adds jest-dom's custom matchers
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder and TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Firebase modules to prevent real Firebase network calls
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: 'test-user-id' },
  })),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
}));
