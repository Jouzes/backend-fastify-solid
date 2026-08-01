export class LateCheckInValidationError extends Error {
  constructor() {
    super("CheckIn is only validated at 20 minutes of his creation");
  }
}
