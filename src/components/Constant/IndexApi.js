import Index from "./Index";
// add auth user to account
export const fetchEntity = async () => {
    console.log('first')
  return (
    await new Promise((resolve, reject) => {
      Index.getEntity().then(
        (resp) => {
          if (resp) {
            resolve(resp)
          }
        })
        .catch((err) => reject(err));
    }))
}

// Report data
export const fetchReport = async () => {
    return (
      await new Promise((resolve, reject) => {
        Index.getReport().then(
          (resp) => {
            if (resp) {
              resolve(resp)
            }
          })
          .catch((err) => reject(err));
      }))
  }