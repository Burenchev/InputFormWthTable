export const filterPhone = (phone: string) => {
    const phoneSymbols = phone.split("")
    const phoneNumericSymbols: string[] = []
    phoneSymbols.forEach(sym => {
      if (Number(sym)) {
        phoneNumericSymbols.push(sym)
      }
    })
    const phoneToApply = phoneNumericSymbols.join("");
    return phoneToApply;
  }