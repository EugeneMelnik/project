import React, {
  FC,
  ReactElement,
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { ILanguage } from '../types';

export enum LanguageEnum {
  eng = 'eng',
  by = 'by',
}

export const languages: { [key in LanguageEnum]: ILanguage } = {
  eng: {
    mode: 'eng',
    common: {
      appName: 'Collections',
      collections: 'Collections',
      carouselTitle: 'Explore collections',
      createCollection: 'Create collection',
      addItem: 'Add item',
      emptyCollections: 'Your library is empty. Create your first collection.',
      noItems: 'No items yet',
      save: 'Save',
      itemTitle: 'Item title',
      itemDescription: 'Description',
      profile: 'Profile',
      email: 'Email',
      role: 'Role',
      status: 'Status',
      tags: 'Tags',
      comments: 'Comments',
      addComment: 'Add comment',
      like: 'Like',
      unlike: 'Unlike',
      image: 'Image',
      chooseImage: 'Choose image',
    },
    auth: {
      signUp: 'Sign Up',
      login: 'Login',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      surname: 'Surname',
      confirmPassword: 'Confirm password',
      errors: {
        validEmail: 'Enter a valid email',
        emailRequired: 'Email is required',
        passwordMin: 'Password should be at least 2 characters long',
        passwordRequired: 'Password is required',
        nameMin: 'Name must have at least 2 letters',
        nameMax: 'Name must have less than 30 letters',
        nameRequired: 'Name is required',
        surnameMin: 'Surname must have at least 2 letters',
        surnameMax: 'Surname must have less than 30 letters',
        surnameRequired: 'Surname is required',
        confirmRequired: 'Please confirm your password.',
        passwordMatch: 'Your passwords do not match.',
      },
    },
    search: 'Search',
    userPage: {
      createCollection: 'Create',
      edit: 'Edit',
      delete: 'Garbage',
    },
    adminPage: {
      block: 'Block',
      unblock: 'Unblock',
      makeAdmin: 'Make an admin',
      removeAdmin: 'Remove from admin',
      delete: 'Delete the user',
      active: 'active',
      admin: 'admin',
      blocked: 'blocked',
    },
    collectionPage: {
      createItem: 'Create',
      edit: 'Edit',
      delete: 'Garbage',
      putDelete: 'Throw in the trash',
      putEdit: 'Make an edit',
      filterCleaning: 'Reset filter',
      export: 'Export',
      ready: 'Ready',
      addPhoto: 'Add photo',
      title: 'Title',
      tags: 'Tags',
      likes: 'Likes',
      actions: 'Actions',
      rowsPerPage: 'Rows per page',
      created: 'Created',
    },
    collectionsPage: {
      myCollections: 'My collections',
    },
    modalCreateCollection: {
      title: 'Title',
      theme: 'Subject',
      description: 'Description',
      nameField: 'Name field',
      nameOption: 'Name option',
      addPhoto: 'Add photo',
      numbers: 'Fields for entering numbers',
      texts: 'Fields for entering single-line text',
      dates: 'Fields for entering dates',
      multiLines: 'Fields for entering multi-line text',
      radioFields: 'Fields with yes/no selection',
      checkboxFields: 'Fields with multiple choices',
      delete: 'Delete',
      ready: 'Ready',
      addField: 'Add field',
      reset: 'Reset',
      confirm: 'Confirm',
    },
    modalEditCollection: {
      title: 'Title',
      theme: 'Subject',
      description: 'Description',
      variants: 'Variants',
      update: 'Update',
      pullOut: 'Pull out',
      reset: 'Reset',
      created: 'Created',
    },
    modalEditItem: {
      title: 'Title',
      update: 'Update',
      pullOut: 'Pull out',
      reset: 'Reset',
      enterBtn: 'Please press enter to add a new tag',
      tags: 'Tags',
      created: 'Created',
    },
    modalDelete: {
      delete: 'Delete',
      pullOut: 'Pull out',
      created: 'Created',
    },
    itemPage: {
      created: 'Created',
      comments: 'Comments',
      addComment: 'Add comments',
      myComments: 'My Comments',
      likes: 'Likes',
    },
  },
  by: {
    mode: 'by',
    common: {
      appName: 'Калекцыі',
      collections: 'Калекцыі',
      carouselTitle: 'Агляд калекцый',
      createCollection: 'Стварыць калекцыю',
      addItem: 'Дадаць элемент',
      emptyCollections: 'Ваша бібліятэка пустая. Стварыце першую калекцыю.',
      noItems: 'Элементаў пакуль няма',
      save: 'Захаваць',
      itemTitle: 'Назва элемента',
      itemDescription: 'Апісанне',
      profile: 'Профіль',
      email: 'Электронная пошта',
      role: 'Роля',
      status: 'Статус',
      tags: 'Тэгі',
      comments: 'Каментары',
      addComment: 'Дадаць каментар',
      like: 'Падабаецца',
      unlike: 'Не падабаецца',
      image: 'Выява',
      chooseImage: 'Выбраць выяву',
    },
    auth: {
      signUp: 'Зарэгістравацца',
      login: 'Увайсці',
      email: 'Электронная пошта',
      password: 'Пароль',
      name: 'Імя',
      surname: 'Прозвішча',
      confirmPassword: 'Пацвердзіць пароль',
      errors: {
        validEmail: 'Увядзіце карэктны адрас электроннай пошты',
        emailRequired: 'Увядзіце адрас электроннай пошты',
        passwordMin: 'Пароль павінен мець не менш за 2 сімвалы',
        passwordRequired: 'Увядзіце пароль',
        nameMin: 'Імя павінна мець не менш за 2 літары',
        nameMax: 'Імя павінна мець менш за 30 літар',
        nameRequired: 'Увядзіце імя',
        surnameMin: 'Прозвішча павінна мець не менш за 2 літары',
        surnameMax: 'Прозвішча павінна мець менш за 30 літар',
        surnameRequired: 'Увядзіце прозвішча',
        confirmRequired: 'Пацвердзіце пароль.',
        passwordMatch: 'Паролі не супадаюць.',
      },
    },
    search: 'Знайсці',
    adminPage: {
      block: 'Блакаваць',
      unblock: 'Разблакаваць',
      makeAdmin: 'Зрабіць адмінам',
      removeAdmin: 'Выдаліць з адміна',
      delete: 'Выдаліць',
      active: 'актыўны',
      blocked: 'заблакаваны',
      admin: 'адмін',
    },
    userPage: {
      createCollection: 'Стварыць',
      edit: 'Рэдагаваць',
      delete: 'Кошык',
    },
    collectionPage: {
      createItem: 'Стварыць',
      edit: 'Рэдагаваць',
      delete: 'Кошык',
      putDelete: 'Закінуць у кошык',
      addPhoto: 'Дадаць фота',
      putEdit: 'Зрабіць выпраўленні',
      filterCleaning: 'Ачысціць фільтр',
      export: 'Экспарт',
      title: 'Назва',
      tags: 'Тэгі',
      likes: 'Падабайкі',
      actions: 'Дзеянні',
      rowsPerPage: 'Радкоў на старонцы',
      created: 'Створана',
      ready: 'Гатова',
    },
    collectionsPage: {
      myCollections: 'Мае калекцыі',
    },
    modalCreateCollection: {
      title: 'Назва',
      theme: 'Тэма',
      description: 'Апісанне',
      nameField: 'Назва поля',
      nameOption: 'Назва выбару',
      addPhoto: 'Дадаць фота',
      numbers: 'Палі для ўводу лікаў',
      texts: 'Палі для ўводу аднарадковага тэксту',
      dates: 'Палі для ўводу даты',
      multiLines: 'Палі для ўводу шматрадковага тэксту',
      radioFields: 'Палі з вабарам да/не',
      checkboxFields: 'Палі з варыянтамі выбару',
      delete: 'Выдаліць',
      addField: 'Дадаць поле',
      reset: 'Сцерці',
      confirm: 'Пацвердзіць',
      ready: 'Гатова',
    },
    modalEditCollection: {
      title: 'Назва',
      theme: 'Тэма',
      description: 'Апісанне',
      variants: 'Варыянты',
      update: 'Абнавіць',
      pullOut: 'Дастаць',
      reset: 'Сцерці',
      created: 'Створаны',
    },
    modalEditItem: {
      title: 'Назва',
      update: 'Абнавіць',
      pullOut: 'Дастаць',
      reset: 'Сцерці',
      enterBtn: 'Для дадання новага тэга націсніце ўвод',
      tags: 'Тэгі',
      created: 'Створаны',
    },
    modalDelete: {
      delete: 'Выдаліць',
      pullOut: 'Дастаць',
      created: 'Створаны',
    },
    itemPage: {
      created: 'Створаны',
      comments: 'Каментары',
      addComment: 'Дадаць каментар',
      myComments: 'Мае каментары',
      likes: 'Падабайкі',
    },
  },
};

interface ILanguageContext {
  language: ILanguage;
  setLanguage: (language: LanguageEnum) => void;
}

export function setLanguageValue(value: LanguageEnum) {
  localStorage.setItem('language', value);
}

export function getLanguage() {
  return localStorage.getItem('language') as LanguageEnum | null;
}

const LanguageContext = createContext<ILanguageContext | null>(null);

export const LanguageContextProvider: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<ILanguage>(
    languages[getLanguage() || 'eng']
  );

  const handleSetLanguage = (language: LanguageEnum) => {
    setLanguage(languages[language]);

    setLanguageValue(language);
  };

  useEffect(() => {
    if (!getLanguage()) setLanguageValue(LanguageEnum.eng);
  }, []);

  const languageProviderValue = useMemo(
    () => ({ language, setLanguage: handleSetLanguage }),
    [language]
  );

  return (
    <LanguageContext.Provider value={languageProviderValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error('languageContext is not provided');
  }

  return languageContext;
};
