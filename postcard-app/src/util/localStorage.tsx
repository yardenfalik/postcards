export function setItem(key: string, value: any) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
        console.error("Error saving to localStorage", error);
    }
}

export function getItem(key: string) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
    catch (error) {
        console.error("Error loading from localStorage", error);
        return null;
    }
}