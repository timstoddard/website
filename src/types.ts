export type EmptyObject = Record<string, never>

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => (): void => {}
