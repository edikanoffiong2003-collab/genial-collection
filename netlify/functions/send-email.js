import { Resend } from 'resend';

// Initialize Resend using the environment variable saved in Netlify
const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, userName, type } = JSON.parse(event.body);

    let subject = "";
    let htmlContent = "";

    // Watermark style and email layout container
    const emailWrapper = `
      font-family: Arial, sans-serif;
      background-color: #fdfbf7;
      color: #333333;
      padding: 40px;
      position: relative;
    `;

    const watermarkStyle = `
      background-image: url('https://genialcollection.shop/assets/logo.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      opacity: 0.95;
    `;

    if (type === 'welcome') {
      subject = "Welcome to Genial Collection – Luxury, Elegance & Bespoke Style Await!";
      htmlContent = `
        <div style="${emailWrapper}">
          <div style="${watermarkStyle}">
            <h2 style="color: #bfa15f;">Welcome to Genial Collection, ${userName || 'Valued Customer'}!</h2>
            <p>We are thrilled to have you join our exclusive community.</p>
            <p>Genial Collection is your ultimate destination for sophisticated style. We specialize in exquisite luxury perfumes crafted for both men and women as well as stunning, bespoke female apparel designed to turn heads wherever you go.</p>
            <p>Your satisfaction is our highest priority. If you are ever unsatisfied with a perfume or dress you receive, or if you experience any issues with our dispatch drivers, please feel free to reach out to us immediately at <strong>genialcollection05@gmail.com</strong>.</p>
            <br>
            <p>Warm regards,</p>
            <p><strong>Management</strong><br>Ogechi,Goodness<br>Genial Collection</p>
          </div>
        </div>
      `;
    } else if (type === 'login') {
      subject = "Welcome Back to Genial Collection! How Did You Love Your Last Scent?";
      htmlContent = `
        <div style="${emailWrapper}">
          <div style="${watermarkStyle}">
            <h2 style="color: #bfa15f;">Welcome back, ${userName || 'Valued Customer'}!</h2>
            <p>Thank you for always choosing Genial Collection to elevate your style and signature scent.</p>
            <p>We wanted to check in and ask: how did you enjoy your last luxury fragrance? Or perhaps you've been wearing our bespoke female apparel—did it make you feel as fabulous as you deserve?</p>
            <p>Whether you are looking to restock your favorite unisex luxury perfume (perfect for both men and women) or want to request a custom-crafted dress for your next big event, Genial Collection is always at your service.</p>
            <br>
            <p>Warm regards,</p>
            <p><strong>Management</strong><br>Ogechi,Goodness<br>Genial Collection</p>
          </div>
        </div>
      `;
    }

    // Send the email
    const data = await resend.emails.send({
      from: 'Genial Collection <support@genialcollection.shop>',
      to: [email],
      reply_to: 'genialcollection@gmail.com',
      subject: subject,
      html: htmlContent,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}