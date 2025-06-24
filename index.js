const express = require('express');
const app = express();
const auctionRoutes = require('./routes/auction.js');
const userRoutes = require('./routes/user.js');
const callRoutes = require('./routes/call.js');

app.use(express.json());

app.use('/auctions', auctionRoutes);
app.use('/users', userRoutes);
app.use('/calls', callRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));