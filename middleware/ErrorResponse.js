function ErrorResponse(message, status) {
    this.message = message;
    this.status = status
}

module.exports = ErrorResponse