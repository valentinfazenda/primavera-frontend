export interface WebSocketResponse {
    response?: {
        text: string;
        step?: string;
    };
    status: string;
    type: string;
}