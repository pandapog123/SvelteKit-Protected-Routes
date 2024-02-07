type User = {
  name: string;
  email: string;
  password: string;
};

let users = new Map<string, User>();

function userWithSameEmail(email: string) {
  const usersArr = Array.from(users.values());

  for (const user of usersArr) {
    if (user.email === email) {
      return true;
    }
  }

  return false;
}

export function createUser(user: User) {
  if (userWithSameEmail(user.email)) {
    throw new Error(`Email is already in use`);
  }

  const id = crypto.randomUUID();

  users.set(id, user);

  return id;
}

export function getUserByEmailAndPassword(email: string, password: string) {
  const usersArr = Array.from(users.keys());

  for (const key of usersArr) {
    const user = users.get(key);

    if (!user) {
      break;
    }

    if (user.email === email && user.password === password) {
      return key;
    }
  }

  return undefined;
}

export function getUser(id: string) {
  return users.get(id);
}
