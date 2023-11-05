export const protectRoute = (user, id) => {
  if (!user || !id) {
    return false;
  }
  return true;
};
