// Reusable composable for CKToast notifications

export const useCkToast = () => {
    const { $toast } = useNuxtApp()

    const success = (message) => {
      $toast.success(message, {
        duration: 3000,
      })
    }

    const error = (message) => {
      $toast.error(message, {
        duration: 4000,
      })
    }

    const info = (message) => {
      $toast(message, {
        duration: 3000,
      })
    }

    const promise = (fn, messages) => {
      return $toast.promise(fn, messages)
    }

    return { success, error, info, promise }
}