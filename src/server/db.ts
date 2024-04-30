import { v4 as uuid4 } from 'uuid'
import { delayedLog } from '../utils/app'

export const db = {
    user: {
        createUser: async (name: string) => { 
            await delayedLog('Creating user...', 5000)
            return { id: uuid4(), name: name } 
        }
    }
}