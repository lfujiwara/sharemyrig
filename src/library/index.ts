export function isString(s: any) {
  return !(s instanceof String) && !(typeof s !== 'string')
}
