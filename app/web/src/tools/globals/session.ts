export const session = {
  get user() {
    if (localStorage.prasi_uid) {
      return { id: localStorage.prasi_uid };
    }
    return null;
  },
};
