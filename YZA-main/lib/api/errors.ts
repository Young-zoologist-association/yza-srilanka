export class WordPressApiError extends Error {
  readonly status?: number;
  readonly endpoint?: string;

  constructor(message: string, status?: number, endpoint?: string) {
    super(message);
    this.name = "WordPressApiError";
    this.status = status;
    this.endpoint = endpoint;
  }
}
