import { toast } from 'sonner'

export const useToast = () => {
  return {
    toast: (message: string) => toast(message),
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    warning: (message: string) => toast.warning(message),
    info: (message: string) => toast.info(message),
    loading: (message: string) => toast.loading(message),
    promise: <T>(
      promise: Promise<T>,
      messages: {
        loading: string
        success: string | ((data: T) => string)
        error: string | ((error: Error) => string)
      }
    ) => toast.promise(promise, messages),
  }
}
