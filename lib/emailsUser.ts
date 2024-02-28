import nodemailer from "nodemailer";

type EmailPayload = {
  to: string;
  subject: string;
  title?: string;
  username?: string;
  html?: string;
};
// This host and port auth info must change
export default async function sendEmailUser(data: EmailPayload) {
  const transporter = nodemailer.createTransport({
    host: "adam.genious.net",
    port: 465,
    secure: true,
    auth: {
      user: "direction@ambsrental.ma",
      pass: "S@@laoui2024",
      type: "Login",
    },
  });

  try {
    await transporter.sendMail({
      from: `AMBS <direction@ambsrental.ma>`,
      to: `${data.title} <${data.to}>`,
      subject: "AMBS CONTACT NOUS",
      text: data.subject,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nous Contacter</title>
        </head>
        <body>
            <h1>Contacter notre equipe de service</h1>
            <p>Cher(e) ${data.username},</p>
            <p>Nous vous remercions d'avoir pris contact avec nous chez AMBS. Votre intérêt est très apprécié !</p>
            <p>${data.subject}</p>
            <p class="signature">Cordialement,</p>
            <p class="signature">L'équipe de AMBS</p>
        </body>
        </html>
        `,
    });
  } catch (error) {
    console.error(error);
  }
}
