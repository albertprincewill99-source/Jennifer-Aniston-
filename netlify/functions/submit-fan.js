exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: "Method not allowed"
      })
    };
  }

  try {
    const data = JSON.parse(event.body);

    const {
      name,
      age,
      email,
      gender,
      content,
      reason
    } = data;

    if (!name || !age || !email || !content) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Please complete all required fields."
        })
      };
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Telegram configuration is missing."
        })
      };
    }

    const message = `
✨ NEW FAN VERIFICATION ✨

👤 Name: ${name}
🎂 Age: ${age}
📧 Email: ${email}
⚧ Gender: ${gender || "Not provided"}

🎬 Content mentioned:
${content}

💬 What they like:
${reason || "Not provided"}
`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      }
    );

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok || !telegramResult.ok) {
      console.error("Telegram error:", telegramResult);

      return {
        statusCode: 502,
        body: JSON.stringify({
          message: "Could not send the submission."
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true
      })
    };

  } catch (error) {
    console.error("Submission error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong."
      })
    };
  }
};
