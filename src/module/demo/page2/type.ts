export interface State {
    currentUser: string;
    searchResult?: string;
    formSearch?: {
        userId?: string;
        open?: number;
        userAccount?: string;
        password?: string;
        confirm?: string;
    };
}
