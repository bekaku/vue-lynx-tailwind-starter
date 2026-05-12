export const formattedTime = (d: string) => {
    if (!d) {
        return '';
    }
    // Simple time formatter. Adjust based on your preferred date library (e.g., date-fns)
    const date = new Date(d);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

};
export const formattedDateTime = (d: string) => {
    if (!d) {
        return '';
    }
    // Simple time formatter. Adjust based on your preferred date library (e.g., date-fns)
    const date = new Date(d);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Note: Months are 0-indexed
    const year = date.getFullYear();

    // Extract time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Combine them into the exact requested format: "DD/MM/YYYY HH:mm"
    return `${day}/${month}/${year} ${hours}:${minutes}`;
};