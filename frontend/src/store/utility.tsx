export const updatedObject = (oldObjects: any, updatedObjects: any) => {
    return{
        ...oldObjects,
        ...updatedObjects
    }
}