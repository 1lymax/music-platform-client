export const setArrayToCommaSepareted = (value: any) => {
  return !Array.isArray(value) ? value : value.join(",")
}