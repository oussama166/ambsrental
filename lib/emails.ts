import nodemailer from "nodemailer";

type EmailPayload = {
  to: string;
  subject: string;
  title?: string;
  username?: string;
  html?: string;
};

// This host and port auth info must change
export default async function sendEmailCompany(data: EmailPayload) {
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
      from: `${data.title} <${data.to}>`,
      to: `AMBS <direction@ambsrental.ma>`,
      subject: "AMBS CONTACT NOUS",
      text: data.subject,
      html: `
          <!DOCTYPE html>
          <html lang="fr">
         <head></head>
          <body>
              <h1>${data.subject}</h1>
              <p>Cher(e) ${data.username},</p>
              <p>Nous vous remercions d'avoir pris contact avec nous chez . Votre intérêt est très apprécié !</p>
              <p>${data.subject}</p>
              <p class="signature">Cordialement</p>
              <p class="signature">L'équipe de AMBS</p>
          </body>
          </html>
      `,
    });
  } catch (err) {
    console.warn(err);
  }
}
