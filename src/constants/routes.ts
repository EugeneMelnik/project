enum RoutesApp {
  Login = '/login',
  SignUp = '/signup',
  Admin = '/admin',
  Root = '/',
  Home = '/',
  User = '/profile',
  Collections = '/collections/*',
  CollectionsLink = '/collections/',
  Collection = '/collections/:collectionId/*',
  CollectionLink = '/collections/',
  Item = '/items/:itemId',
  TargetCollections = '/user/:userId',
  ItemLink = '/items/',
  Search = '/search/',
}

export default RoutesApp;
