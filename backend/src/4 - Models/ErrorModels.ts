export type ErrorType = {
    message: string;
    status: number;
}


export const RouteNotFoundError = (route: string) => {
    const error: ErrorType = {message: `Route  ${route} not exists`, status: 404}
    return error;
}

export const validationError = (msg: string) => {
    const error: ErrorType = {message: msg, status: 401}
    throw error;
}

export const UnauthorizedError = (msg: string) => {
    const errorObj: ErrorType = { message: msg, status: 401 }
    throw errorObj;
}

export const resourceNotFound = (resource: number) => {
    const error: ErrorType = {message:`can't find any resource with input ${resource}`, status: 404}
    throw error;
}