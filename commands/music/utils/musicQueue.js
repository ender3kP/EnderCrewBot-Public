class MusicQueue {
    constructor() {
        this.queue = [];
    }

    addToQueue(track) {
        this.queue.push(track);
    }

    removeFromQueue() {
        return this.queue.shift();
    }

    getQueue() {
        return this.queue;
    }

    clearQueue() {
        this.queue = [];
    }
}

module.exports = MusicQueue;
