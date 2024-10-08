function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (diffInSeconds < 60) {
        return "just now";
    } else if (minutes < 60) {
        return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
}

export default timeAgo
