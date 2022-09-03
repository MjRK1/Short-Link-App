export enum MainPageActionTypes {
    FETCH_LINKS = "FETCH_LINKS",
    SET_ERROR = "SET_ERROR",
    SET_SHORT_LINK = "SET_SHORT_LINK",


}

export interface ILinks extends Array<ILink> {};
export interface ILink {
    id: number
    short: string
    target: string
    counter: number
}

export interface MainPageState {
    links: ILinks[] | any[] | undefined
    shortLink: string | undefined | null
    order: string
    error?: string | undefined | null
}

export interface MainPageFetchLinks {
    type: MainPageActionTypes.FETCH_LINKS
    payload: ILinks[]
}
export interface MainPageSetError {
    type: MainPageActionTypes.SET_ERROR
    payload: string | null
}
export interface MainPageSetShortLink {
    type: MainPageActionTypes.SET_SHORT_LINK
    payload: string | undefined
}


export interface ILinkForm {
    target: string
}
export type MainPageAction =
    MainPageFetchLinks
    | MainPageSetError
    | MainPageSetShortLink