

export const trywarp = async (fn) => {
  try {
    return [await fn,null]
  }catch (e) {
    return [null,e]
  }
}
