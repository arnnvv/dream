export const getSuperUser = (): string =>
  process.env.SUPERUSER ??
  ((): never => {
    throw new Error("GET SUPERUSER");
  })();
