export const getLastFragmentByUrl = (url: string) => {
  const fragments = url.split('/')
  const lastFragment = fragments.at(-1)

  return lastFragment
}
