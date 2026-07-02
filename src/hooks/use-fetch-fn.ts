import { useEffect, useEffectEvent, useState } from "react"

const useFetchFn = <T>(fn: () => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<null | T>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fn()
      setData(response)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }

  const event = useEffectEvent(() => fetchData())

  useEffect(() => {
    ;(async () => {
      await event()
    })()
  }, [])

  return { data, error, fetchData, isLoading }
}

export default useFetchFn
