import { MailAdapter, SendEmailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "714787a78e6c6e",
    pass: "4ee26ba8637161",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendEmailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Vitor Ferraz <vitorferraz@gmail.com>",
      subject,
      html: body,
    });
  }
}
