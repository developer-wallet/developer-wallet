import { registerWallet } from './register.js';
import { DeveloperWallet } from './wallet.js';
import type { DevWallet } from './window.js';

export function initialize(devWallet: DevWallet): void {
    registerWallet(new DeveloperWallet(devWallet));
}
