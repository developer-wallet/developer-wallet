import { storage } from 'wxt/storage'

export class CoreStorage {
  constructor() {
    console.log('CoreStorage Initialized')
  }

  static async test() {
    console.log('CoreStorage Test')
    const installDate = await storage.getItem('local:installDate')
    console.log('installDate', installDate)
  }
}
