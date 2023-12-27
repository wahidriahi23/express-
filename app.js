const express = require('express');
const app = express();

// Custom middleware to verify working hours
const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = now.getHours(); // 0 to 23

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour <= 17) {
        next();
    } else {
        res.send('Sorry, the web application is only available during working hours (Monday to Friday, 9 to 17).');
    }
};

app.use(express.static('public'));
app.use(checkWorkingHours);

// Here I am Defining routes for the three pages
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
    });

    app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/views/services.html');
    });

    app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
    });

    const port = 3000; // Note here that You can use any port you prefer
    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
