interface ErrorException extends Error {
    statusCode: number | string,
    message: string;
    stack: string;
}

export default ErrorException
