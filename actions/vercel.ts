import { upload } from '@vercel/blob/client'
import { type PutBlobResult } from '@vercel/blob'

export const uploadFile = async (id: string, file: File, callback: any): Promise<PutBlobResult> => {
    if (!file || !(file instanceof File)) {
        throw new Error('Invalid file provided')
    }
    
    // const id = generateId()
    const filePath = `${id}/${file.name}`
    
    try {
        const blob = await upload(filePath, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
        onUploadProgress: (progressEvent) => {
            callback(progressEvent.percentage)
        }
        })
    
        return blob
    } catch (error) {
        throw new Error(`File upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}