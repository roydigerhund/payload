"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function sendEmail(message) {
    let result;
    try {
        const email = await this.email;
        result = await email.transport.sendMail(message);
    }
    catch (err) {
        this.logger.error(err, `Failed to send mail to ${message.to}, subject: ${message.subject}`);
        return err;
    }
    return result;
}
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map