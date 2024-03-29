const submitForm = document.querySelector('#regForm');
let idName = ''

        submitForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            idName = document.querySelector('#name').value;
            const idLink = document.querySelector('#fblink').value;
            const pageLink = document.querySelector('#pagelink').value;
            const package = document.querySelector('#pack').value;
            const paymentId = document.querySelector('#pymentid').value;

            const imageUpload = document.querySelector('#imageUpload');
            const imageFile = imageUpload.files[0];

            const data = `
            Id name : ${idName}
            Id link : ${idLink}
            page link : ${pageLink}
            package : ${package}
            paymentId : ${paymentId}
            `;

            sendDataToBot(data);

            if (imageFile) {
                try {
                    const imageResponse = await sendImageToBot(imageFile);
                    console.log(imageResponse);
                } catch (error) {
                    // console.error('Error sending image:', error);
                    window.location.reload()
                }
            }
        });

        async function sendDataToBot(data) {
            const botToken = ''; // Replace with your Telegram bot token
            const chatIds = ['', '']; // Replace with your Telegram chat IDs
            const url = ``;

            for (const chatId of chatIds) {
                const formData = new FormData();
                formData.append('chat_id', chatId);
                formData.append('text', `Contact with this person: ${data}`);

                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        alert(`Message sent to Admin. Wait for response.`);
                        window.location.reload();
                    } else {
                        throw new Error('Failed to send message');
                    }
                } catch (error) {
                    console.error('Error sending message:', error);
                    throw error;
                }
            }

            return 'Message sent successfully';
        }

        async function sendImageToBot(imageFile) {
            const botToken = ''; // Replace with your Telegram bot token
            const chatIds = ['', '']; // Replace with your Telegram chat IDs
            const url = ``;

            const formData = new FormData();
            formData.append('chat_id', chatIds[0]); // Choose a chat ID
            formData.append('photo', imageFile);
            formData.append('caption', idName);

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    console.log(`Image sent to chat ID: ${chatIds[0]}`);
                    return 'Image sent successfully';
                } else {
                    throw new Error('Failed to send image');
                }
            } catch (error) {
                console.error('Error sending image:', error);
                throw error;
            }
        }
