export function scrollTopOnPush(action: string): void {
    if (action === 'PUSH') {
        window.scrollTo(0, 0);
    }
}
