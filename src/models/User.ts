const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an ' + 'object with the appropriate user keys.';

// eslint-disable-next-line no-shadow
export enum UserRoles {
  // eslint-disable-next-line no-unused-vars
  Standard,
  // eslint-disable-next-line no-unused-vars
  Admin,
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  pwdHash?: string;
  role?: UserRoles;
}

/**
 * See if the param meets criteria to be a user.
 */
function isUser(arg: unknown): boolean {
  return !!arg && typeof arg === 'object' && 'id' in arg && 'email' in arg && 'name' in arg && 'role' in arg;
}

/**
 * Create new User.
 */
function new_(
  name?: string,
  email?: string,
  role?: UserRoles,
  pwdHash?: string,
  id?: number, // id last cause usually set by db
): IUser {
  return {
    id: id ?? -1,
    name: name ?? '',
    email: email ?? '',
    role: role ?? UserRoles.Standard,
    pwdHash: pwdHash ?? '',
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IUser {
  // Check is user
  if (!isUser(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  // Get user instance
  const p = param as IUser;
  return new_(p.name, p.email, p.role, p.pwdHash, p.id);
}

// **** Export default **** //

export default {
  new: new_,
  from,
  isUser,
} as const;
