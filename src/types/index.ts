export interface ICredentials {
  email: string;
  password: string;
}

export interface CreateUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export enum RolesEnum {
  Admin = 'Admin',
  User = 'User',
  Reader = 'Reader',
}

export enum UserStatusEnum {
  active = 'active',
  blocked = 'blocked',
}

export enum SubjectEnum {
  books = 'books',
  movies = 'movies',
  bands = 'bands',
  memories = 'memories',
  artworks = 'artworks',
}

export enum CommentStateEnum {
  touched = 'touched',
  untouched = 'untouched',
}

export interface IComment {
  id: number;
  content: string;
  user: IUser;
  item: IItem;
  state: CommentStateEnum;
  createdAt: string;
  updatedAt: string;
}

export interface ILike {
  id: number;
  user: IUser;
  item: IItem;
}

export interface IItem {
  id: number;
  title: string;
  icon: string;
  tags: ITag[];
  likes: ILike[];
  comments: IComment[];
  collection: ICollection;
  createdAt: string;
  updatedAt: string;
}

export interface ICollection {
  id: number;
  icon: string;
  title: string;
  description: string;
  subject: SubjectEnum;
  items: IItem[];
  user: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: string;
  role: RolesEnum;
  name: string;
  surname: string;
  email: string;
  status: UserStatusEnum;
  collections: ICollection[];
  createdAt: string;
  updatedAt: string;
}

export interface ITag {
  id: number;
  content: string;
}

export interface CollectionsPageType {
  allCollections:
    | {
        id: number;
        name: string;
        surname: string;
        collections: {
          collections: ICollection[] | null;
          countCollections: number;
        };
      }[]
    | null;
  targetCollections: {
    name: string;
    surname: string;
    collections: Array<ICollection[] | null>;
  } | null;
  isLoading: boolean;
}

export interface HomePageType {
  collections: ICollection[] | null;
  list: IItem[] | null;
  tags: { content: string }[] | null;
  isLoading: boolean;
}

export interface UserPageType {
  id: number | null;
  userId: null | string;
  role: 'Admin' | 'User' | 'Reader' | null;
  name: string | null;
  surname: string | null;
  theme?: 'light' | 'dark';
  email: null | string;
  status: 'active' | 'blocked';
  createdAt: null | string;
  updatedAt: null | string;
  myCollections: {
    countCollections: number;
    collections: ICollection[] | null;
  };
  listEditCollections: Array<ICollection | null>;
  listDeleteCollections: Array<ICollection | null>;
  likes: { itemId: number }[] | null;
  themes: null | { id: number; value: string };
  isLoading: boolean;
}

export interface SearchPageType {
  itemsSearch: IItem;
  usersSearch:
    | {
        name: string;
        surname: string;
        collections: Array<ICollection | null>;
      }[]
    | null;
  listSearch:
    | IItem[]
    | {
        name: string;
        surname: string;
        collections: Array<ICollection | null>;
      }[]
    | null;
  isLoading: boolean;
}

export interface AdminType {
  users: IUser[] | null;
  targetUser: IUser | null;
  targetCollections: {
    collections: ICollection[] | null;
    countCollections: number;
  };
  isLoading: boolean;
}

export interface ILanguage {
  mode: string;
  common: {
    appName: string;
    collections: string;
    carouselTitle: string;
    createCollection: string;
    addItem: string;
    emptyCollections: string;
    noItems: string;
    save: string;
    itemTitle: string;
    itemDescription: string;
    profile: string;
    email: string;
    role: string;
    status: string;
    tags: string;
    comments: string;
    addComment: string;
    like: string;
    unlike: string;
    image: string;
    chooseImage: string;
  };
  userPage: { edit: string; delete: string; createCollection: string };
  modalEditItem: {
    created: string;
    update: string;
    reset: string;
    title: string;
    pullOut: string;
    enterBtn: string;
    tags: string;
  };
  search: string;
  modalCreateCollection: {
    nameOption: string;
    numbers: string;
    addField: string;
    description: string;
    nameField: string;
    dates: string;
    title: string;
    multiLines: string;
    delete: string;
    addPhoto: string;
    confirm: string;
    texts: string;
    radioFields: string;
    ready: string;
    checkboxFields: string;
    reset: string;
    theme: string;
  };
  auth: {
    password: string;
    surname: string;
    name: string;
    confirmPassword: string;
    login: string;
    signUp: string;
    email: string;
    errors: {
      validEmail: string;
      emailRequired: string;
      passwordMin: string;
      passwordRequired: string;
      nameMin: string;
      nameMax: string;
      nameRequired: string;
      surnameMin: string;
      surnameMax: string;
      surnameRequired: string;
      confirmRequired: string;
      passwordMatch: string;
    };
  };
  adminPage: {
    unblock: string;
    blocked: string;
    removeAdmin: string;
    active: string;
    admin: string;
    block: string;
    makeAdmin: string;
    delete: string;
  };
  modalDelete: { created: string; pullOut: string; delete: string };
  collectionPage: {
    putDelete: string;
    filterCleaning: string;
    edit: string;
    created: string;
    title: string;
    delete: string;
    rowsPerPage: string;
    addPhoto: string;
    tags: string;
    ready: string;
    createItem: string;
    putEdit: string;
    export: string;
    actions: string;
    likes: string;
  };
  collectionsPage: { myCollections: string };
  modalEditCollection: {
    created: string;
    description: string;
    update: string;
    reset: string;
    theme: string;
    variants: string;
    title: string;
    pullOut: string;
  };
  itemPage: {
    comments: string;
    created: string;
    addComment: string;
    myComments: string;
    likes: string;
  };
}
