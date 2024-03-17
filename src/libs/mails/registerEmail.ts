export const registrationMailFormat = ()=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Notification Interface</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background: linear-gradient(to bottom, #ffffff 0%, #f0f0f0 100%);
    padding: 20px;
    margin: 0;
  }
  .notification {
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  .notification-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .notification-icon {
    font-size: 24px;
    margin-right: 10px;
  }
  .notification-body {
    font-size: 14px;
    line-height: 1.6;
  }
  .pre-register-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 20px 0;
    cursor: pointer;
    border: none;
    border-radius: 5px;
  }
  </style>
</head>
<body>
  <div class="notification">
    <div class="notification-header">
      <span class="notification-icon">🔔</span>
      <strong>Hey, we get that you’re busy...</strong>
    </div>
    <div class="notification-body">
      <p>We understand it can be hard to remember everything.</p>
      <p>That’s why we’re here to help you out!</p>
      <p>Pre-registering before you arrive will save you time as you avoid waiting in line.</p>
      <p>Pre-register now</p>
      <p>It only takes 30 seconds.</p>
    </div>
    <a href="http://localhost:3000/guests"  style="text-decoration: none; color: inherit;cursor:pointer;">
  <button class="pre-register-btn">Pre-Register Here</button>
</a>
  </div>
  </div>
</body>
</html>

`
}