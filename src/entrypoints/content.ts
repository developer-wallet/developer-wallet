import { type SolanaSignInInput, type SolanaSignInOutput } from '@solana/wallet-standard-features';
import { PublicKey, Transaction, VersionedTransaction, SendOptions } from '@solana/web3.js';
import { initialize, DevWallet as DevWalletInterface, DeveloperWalletEvent } from '../wallet';

class DevWallet implements DevWalletInterface {
  publicKey: PublicKey | null;

  constructor() {
    this.publicKey = null;
  }

  connect(options?: { onlyIfTrusted?: boolean; }): Promise<{ publicKey: PublicKey; }> {
    throw new Error('Method not implemented.');
  }
  disconnect(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  signAndSendTransaction<T extends Transaction | VersionedTransaction>(transaction: T, options?: SendOptions | undefined): Promise<{ signature: string; }> {
    throw new Error('Method not implemented.');
  }
  signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  signMessage(message: Uint8Array): Promise<{ signature: Uint8Array; }> {
    throw new Error('Method not implemented.');
  }
  on<E extends keyof DeveloperWalletEvent>(event: E, listener: DeveloperWalletEvent[E], context?: any): void {
    throw new Error('Method not implemented.');
  }
  off<E extends keyof DeveloperWalletEvent>(event: E, listener: DeveloperWalletEvent[E], context?: any): void {
    throw new Error('Method not implemented.');
  }
  signIn(input?: SolanaSignInInput): Promise<SolanaSignInOutput> {
    throw new Error('Method not implemented.');
  }
}

export default defineContentScript({
  matches: ['*://*/*'],
  main() {
    const devWallet = new DevWallet();
    initialize(devWallet);

    try {
      Object.defineProperty(window, 'developerWallet', { value: devWallet });
    }
    catch (error) {
      console.error(error);
    }

    console.log('Hello content.')
  },
})
