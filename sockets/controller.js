const socketController = (socket) => {

    socket.on('channel-test', ( payload, callback ) => {
        socket.broadcast.emit('channel-test', payload);
        const id = 123456;
        callback(id);
    })
}

module.exports = {
    socketController
}