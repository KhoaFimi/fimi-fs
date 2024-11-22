export const newUserMailTemplate = ({
	name,
	phone,
	token
}: {
	code: string
	phone: string
	name: string
	token: string
}) => {
	return `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body style="
            background-color: #ffffff;
            width: 400px;
            font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;
    ">
  <div style="
            margin-top: 5rem;
            width: 100%;
            background: #8e191c;
            border-radius: 10px;
            padding: 5px;
        ">
    <div style="
                width: 100%;
                height: 100%;
                background-color: #ffffff;
                border-radius: 7.5px;
                position: relative;
            ">

      <div style="
                    width: 100%;
                    background: #8e191c;
                    padding-bottom: 1px;
                    padding-top: 5px;
                    color: #ffffff;
                    font-weight: bold;
                    font-size: 1.5rem;
                ">

        <p style="
                        text-align: center;
                        line-height: 0;
                        text-transform: uppercase;
                        padding-bottom: 10px;
                    ">
          Thông tin người dùng
        </p>
      </div>
      <div style="background-color: white;">
        <p style="
                        text-align: center;
                        font-weight: bold;
                        font-size: larger;
                    ">
          OTP xác thực:
        </p>
        <div style="
                        background-color: #8e191c;
                        width: fit-content;
                        margin: auto;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                        border: 2px solid #8e191c;
                        padding-left: 10px;
                        padding-right: 10px;
                        border-radius: 10px;
                    ">
          <p style="
                                font-size: 25px;
                                line-height: normal;
                                font-weight: 900;
                                line-height: 0;
                            ">
            ${token}
          </p>
        </div>
      </div>
      <div style="
                    margin-top: 15px;
                    margin-bottom: 5px;
                    height: 3.5px;
                    background: #8e191c;
                "></div>
      <div style="margin-left: 15px;">
        <p style="font-size: 13px; font-weight: 500;">Họ và tên:
          <span style="font-weight: bold;">
            ${name}
          </span>
        </p>
        <p style="font-size: 13px; font-weight: 500;">Số điện thoại:
          <span style="font-weight: bold;">
            ${phone}
          </span>
        </p>
      </div>
      <div style="
                    margin-top: 1rem;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    padding-left: 10px;
                    background:#8e191c;
                ">
        <p style="
                            line-height: 0;
                            text-align: center;
                            color: #ffffff;
                            font-weight: normal;
                            font-size: 10px;
                            text-transform: uppercase;
                            opacity: .7;
                        ">

          Công Ty TNHH Công Nghệ FIMI
        </p>
      </div>
    </div>
  </div>
</body>

</html>
  `
}
