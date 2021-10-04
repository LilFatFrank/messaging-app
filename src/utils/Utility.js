import { Users } from "./constants";

export const userKey = (id) => {
  return Users[Users.findIndex((user) => user.id == id)].name
    .toLowerCase()
    .split(" ")
    .join("");
};
