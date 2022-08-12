import { Observable } from 'rxjs';

interface Pagination {
  skip?: number;
  limit?: number;
}

interface CreateUser {
  birthday: string;
  email: string;
  name: string;
}

interface ID {
  id: string;
}

interface UpdateUser extends Partial<CreateUser>, ID {}

interface UserData extends CreateUser {
  _id: string;
  createdAt: string;
}

interface UserList {
  data: UserData[];
  count: number;
}

export interface UserGrpc {
  listUsers(data: Pagination): Observable<UserList>;
  createUser(data: CreateUser): Observable<UserData>;
  fetchUser(data: ID): Observable<UserData>;
  deleteUser(data: ID): Observable<Record<string, any>>;
  updateUser(data: UpdateUser): Observable<UserData>;
}
