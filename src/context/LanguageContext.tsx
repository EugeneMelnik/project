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
    homePage: {
      topCollections: 'Collections with the most liked items',
      popularItems: 'Most liked items',
    },
    userPage: {
      profile: 'Profile',
      myCollections: 'My collections',
      collections: 'Collections',
      items: 'Items',
      availableActions: 'Collections to manage',
      noCollections: 'Your collection shelf is empty',
      createCollection: 'Create collection',
      edit: 'Edit collections',
      delete: 'Trash',
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
      createItem: 'Create item',
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
      ready: 'Ready',
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
      addPhoto: 'Add photo',
      delete: 'Delete',
      addField: 'Add field',
      reset: 'Reset',
      confirm: 'Confirm',
      ready: 'Ready',
    },
    modalEditCollection: {
      title: 'Title',
      theme: 'Subject',
      description: 'Description',
      variants: 'Variants',
      update: 'Update',
      reset: 'Reset',
      created: 'Created',
    },
    modalEditItem: {
      title: 'Title',
      update: 'Update',
      reset: 'Reset',
      enterBtn: 'Please press enter to add a new tag',
      tags: 'Tags',
      created: 'Created',
    },
    modalDelete: {
      delete: 'Delete',
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
  rus: {
    mode: 'rus',
    auth: {
      signUp: 'Зарегистрироваться',
      login: 'Войти',
      email: 'Электронная почта',
      password: 'Пароль',
      name: 'Имя',
      surname: 'Фамилия',
      confirmPassword: 'Подтвердить пароль',
    },
    search: 'Поиск',
    homePage: {
      topCollections: 'Коллекции с самыми популярными элементами',
      popularItems: 'Самые популярные элементы',
    },
    adminPage: {
      block: 'Заблокировать',
      unblock: 'Разблокировать',
      makeAdmin: 'Назначить администратором',
      removeAdmin: 'Убрать из администраторов',
      delete: 'Удалить пользователя',
      active: 'активен',
      blocked: 'заблокирован',
      admin: 'администратор',
    },
    userPage: {
      profile: 'Профиль',
      myCollections: 'Мои коллекции',
      collections: 'Коллекции',
      items: 'Элементы',
      availableActions: 'Коллекции в работе',
      noCollections: 'Ваша полка коллекций пока пуста',
      createCollection: 'Создать коллекцию',
      edit: 'Редактировать коллекции',
      delete: 'Корзина',
    },
    collectionPage: {
      createItem: 'Создать элемент',
      edit: 'Редактировать',
      delete: 'Корзина',
      putDelete: 'Переместить в корзину',
      addPhoto: 'Добавить фото',
      putEdit: 'Редактировать',
      filterCleaning: 'Сбросить фильтр',
      export: 'Экспорт',
      title: 'Название',
      tags: 'Теги',
      likes: 'Лайки',
      actions: 'Действия',
      rowsPerPage: 'Строк на странице',
      created: 'Создано',
      ready: 'Готово',
    },
    collectionsPage: {
      myCollections: 'Мои коллекции',
    },
    modalCreateCollection: {
      title: 'Название',
      theme: 'Тема',
      description: 'Описание',
      nameField: 'Название поля',
      nameOption: 'Название варианта',
      addPhoto: 'Добавить фото',
      numbers: 'Поля для ввода чисел',
      texts: 'Поля для однострочного текста',
      dates: 'Поля для ввода дат',
      multiLines: 'Поля для многострочного текста',
      radioFields: 'Поля с выбором да/нет',
      checkboxFields: 'Поля с несколькими вариантами',
      delete: 'Удалить',
      addField: 'Добавить поле',
      reset: 'Сбросить',
      confirm: 'Подтвердить',
      ready: 'Готово',
    },
    modalEditCollection: {
      title: 'Название',
      theme: 'Тема',
      description: 'Описание',
      variants: 'Варианты',
      update: 'Обновить',
      reset: 'Сбросить',
      created: 'Создано',
    },
    modalEditItem: {
      title: 'Название',
      update: 'Обновить',
      reset: 'Сбросить',
      enterBtn: 'Нажмите Enter, чтобы добавить новый тег',
      tags: 'Теги',
      created: 'Создано',
    },
    modalDelete: {
      delete: 'Удалить',
      created: 'Создано',
    },
    itemPage: {
      created: 'Создано',
      comments: 'Комментарии',
      addComment: 'Добавить комментарий',
      myComments: 'Мои комментарии',
      likes: 'Лайки',
    },
  },
};

type LanguageType = keyof typeof languages;
type LanguageValue = (typeof languages)[LanguageType];

interface ILanguage {
  language: LanguageValue;
  setLanguage: (language: LanguageType) => void;
}

export function setLanguageValue(value: LanguageType) {
  localStorage.setItem('language', value);
}

export function getLanguage() {
  const value = localStorage.getItem('language');
  return value === 'rus' ? value : 'eng';
}

const LanguageContext = createContext<ILanguage | null>(null);

export const LanguageContextProvider: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<LanguageValue>(languages[getLanguage()]);

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
