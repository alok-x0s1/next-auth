export const mailTemplet = ({ reciever, link, type }: any) => {
	return `<!DOCTYPE html>
                <html lang="en">
                <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Next-auth</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #555555;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 10px 0;
            font-size: 16px;
            color: #ffffff;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Our Service</h1>
        </div>
        <div class="content">
            <h2>Hello ${reciever},</h2>
            ${
				type === "VERIFY"
					? `<p>Thank you for signing up for our service. We are thrilled to have you on board!</p>
                        <p>Please click the button below to verify your email address.</p>`
					: `<p>Please click the button below to reset your password.</p>`
			}
            
            <p>To get started, please click the button below to ${
				type === "VERIFY"
					? " verify your email"
					: " reset your password"
			}:</p>
            <a href="${link}" class="button">Verify Your Email</a>
            <p>Or paste the link in your browser : ${link}</p>
            <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
            <p>Best regards,<br>The Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Our next-auth. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};
