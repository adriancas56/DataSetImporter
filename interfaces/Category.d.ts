export {}

declare global {
  interface ICategoryItem {
    _id: string,
    name: string,
    description: string,
    filename: string,
    userCreate: string,
    userUpdate: string,
    creationTime: string,
    modificationTime: string
  }

  interface ICategoryListItem {
    _id: string,
    name: string,
    userUpdate: string,
    creationTime: string,
    modificationTime: string
  }

}

