export interface NotificationItem {
    id: string;
    title: string;
    description: string;
    createdAt: string; // ISO format: "2024-02-21T10:30:00Z"
}

export interface NotificationGroup {
    category: string;
    items: NotificationItem[];
}

/**
 * Formats an ISO date string into a relative time representation (e.g., "2m ago", "1h ago")
 */
export const formatRelativeTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
};

/**
 * Groups a flat list of notifications into categories: Today, Yesterday, and Earlier.
 */
export const groupNotifications = (items: NotificationItem[]): NotificationGroup[] => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = today - 24 * 60 * 60 * 1000;

    const groups: { [key: string]: NotificationItem[] } = {
        "Today": [],
        "Yesterday": [],
        "Earlier": []
    };

    items.forEach(item => {
        const itemDate = new Date(item.createdAt);
        const itemDay = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate()).getTime();

        if (itemDay === today) {
            groups["Today"].push(item);
        } else if (itemDay === yesterday) {
            groups["Yesterday"].push(item);
        } else {
            groups["Earlier"].push(item);
        }
    });

    return Object.entries(groups)
        .filter(([_, items]) => items.length > 0)
        .map(([category, items]) => ({ category, items }));
};
