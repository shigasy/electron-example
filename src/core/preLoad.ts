import { contextBridge } from 'electron';
import core from './core';

console.log('aaaaaaaaaa daaaaaaaaaaaaaaaaaaaaaaaaa');
contextBridge.exposeInMainWorld('core', core);
