// importamos la funcion que vamos a testear
import { signIn } from '../src/lib/signIn.js'
import { signUp } from '../src/lib/signUp.js'
import { registerGoogle } from '../src/lib/registerGoogle.js'
import * as barrel from '../src/firebaseConfig.js'
// indico que funciones no debe de leer de firebaseConfig y simulando falseando las funciones de firebase
jest.mock('../src/firebaseConfig.js', () => ({
  getAuth: jest.fn(),
  getDatabase: jest.fn(),
  update: jest.fn(),
  ref: jest.fn(),
  set: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  initializeApp: jest.fn(),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

global.alert = jest.fn()

// limpia todos los mocks en cada uso
beforeEach(() => {
  jest.clearAllMocks();
});

describe('signIn', () => {
  it('debería ser una función', () => {
    expect(typeof signIn).toBe('function')
  })
  it('usuario logueado', async () => {
    // indicamos como estamos mockeando la funcion en este caso nos retorna un objeto cuando se resuleve la promesa
    barrel.signInWithEmailAndPassword.mockImplementation(jest.fn(() => Promise.resolve({ user: { uid: '3zs*MOCK*sT2' } })))
    // si es correcto el login con usuario y contraseña resuelve con true
    await expect(signIn()).resolves.toStrictEqual(true);
  })
  it('error', async () => {
    // indicamos como estamos mockeando la funcion en este caso nos retorna un objeto cuando se resuleve la promesa
    barrel.signInWithEmailAndPassword.mockImplementation(jest.fn(() => Promise.resolve({ errorMessage: { message: 'MOCKerror' } })))
    // si es incorrecto el login con usuario y contraseña resuelve con false
    await expect(signIn()).resolves.toStrictEqual(false);
  })
})

describe('signUp', () => {
  it('debería ser una función', () => {
    expect(typeof signUp).toBe('function')
  })
  it('usuario registrado', async () => {
    // indicamos como estamos mockeando la funcion en este caso nos retorna un objeto cuando se resuleve la promesa
    barrel.createUserWithEmailAndPassword.mockImplementation(jest.fn(() => Promise.resolve({ user: { uid: '3zs*MOCK*sT2' } })))
    // si es correcto el registro con usuario y contraseña resuelve con un objeto que en la clave resultado es true
    await expect(signUp()).resolves.toStrictEqual({ resultado: true, code: "" });
  })
  it('error', async () => {
    // para el caso de error segun el error mostramos el mensaje
    barrel.createUserWithEmailAndPassword.mockImplementation(jest.fn(() => Promise.resolve({ errorMessage: { message: 'MOCKerror' } })))
    // si es incorrecto el registro con usuario y contraseña resuelve con un objeto 
    // que en la clave resultado es false y en mensaje indicamos undefined porque no es relevante el mensaje
    await expect(signUp()).resolves.toStrictEqual({ resultado: false, code: undefined });
  })
})

describe('registerGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof registerGoogle).toBe('function')
  })
  it('usuario registrado', async () => {
    // indicamos como estamos mockeando la funcion en este caso nos retorna un objeto cuando se resuleve la promesa
    barrel.signInWithPopup.mockImplementation(jest.fn(() => Promise.resolve({ user: { uid: '3zs*MOCK*sT2' } })))
    // si es correcto el registro con google retorna true
    await expect(registerGoogle()).resolves.toStrictEqual(true);
  })
  it('error', async () => {
    // para el caso de error segun el error mostramos el mensaje
    barrel.signInWithPopup.mockImplementation(jest.fn(() => Promise.resolve({ errorMessage: { message: 'MOCKerror' } })))
    // si es incorrecto el registro con google retorna false 
    await expect(registerGoogle()).resolves.toStrictEqual(false);
  })
})
