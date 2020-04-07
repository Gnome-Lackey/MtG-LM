import { Player } from "models/Player";
import { User } from "models/User";

export default class UserMapper {
  toPlayer = (details: User): Player => ({
    id: details.id,
    userName: details.userName,
    displayName: details.displayName,
    epithet: "",
    favoriteColors: [],
    email: details.email,
  });
}
