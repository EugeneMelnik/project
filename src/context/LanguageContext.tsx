import React, {
  FC,
  ReactElement,
  useState,
  createContext,
  useContext,
  useMemo,
} from 'react';

export const languages = {
  eng: {
    mode: 'eng',
    auth: {
      signUp: 'Sign Up',
      login: 'Login',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      surname: 'Surname',
      confirmPassword: 'Confirm password',
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
      numbers: 'Fields for entering numbers',
      texts: 'Fields for entering single-line text',
      dates: 'Fields for entering dates',
      multiLines: 'Fields for entering multi-line text',
      radioFields: 'Fields with yes/no selection',
      checkboxFields: 'Fields with multiple choices',
      delete: 'Delete',
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
    auth: {
      signUp: 'Зарэгістравацца',
      login: 'Увайсці',
      email: 'Электронная пошта',
      password: 'Пароль',
      name: 'Імя',
      surname: 'Прозвішча',
      confirmPassword: 'Пацвердзіць пароль',
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
      addPhoto: 'Add photo',
      putEdit: 'Зрабіць выпраўленні',
      filterCleaning: 'Ачысціць фільтр',
      export: 'Экспарт',
      title: 'Назва',
      tags: 'Тэгі',
      likes: 'Падабайкі',
      actions: 'Дзеянні',
      rowsPerPage: 'Радкоў на старонцы',
      created: 'Створана',
      ready: 'Ready',
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

type LanguageType = 'eng' | 'by';

interface ILanguage {
  language: any;
  setLanguage:(language: any) => void;
}

export function setLanguageValue(value: LanguageType) {
  localStorage.setItem('language', value);
}

export function getLanguage() {
  return localStorage.getItem('language') as LanguageType | null;
}

const LanguageContext = createContext<ILanguage | null>(null);

export const LanguageContextProvider: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [language, setLanguage] = useState(languages[getLanguage() || 'eng']);

  const handleSetLanguage = (language: LanguageType) => {
    setLanguage(languages[language]);

    setLanguageValue(language);
  };

  if (!getLanguage()) {
    handleSetLanguage('eng');
  }

  const languageProviderValue = useMemo(
    () => ({ language, setLanguage: handleSetLanguage }),
    [language],
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
