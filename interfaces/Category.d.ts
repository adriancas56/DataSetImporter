export {}

declare global {
  interface ICategoryItem {
    _id: string,
    name: string,
    description: string,
    filename: string,
    username: string,
    creationTime: string,
    modificationTime: string
  }

  interface ICategoryListItem {
    _id: string,
    name: string,
    username: string,
    creationTime: string,
    modificationTime: string
  }

}

