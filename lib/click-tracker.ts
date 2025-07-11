export async function trackLinkClick(linkId: string, userId: string) {
  try {
    const response = await fetch('/api/links/track-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ linkId, userId }),
    });

    if (!response.ok) {
      console.error('Failed to track click');
    }
  } catch (error) {
    console.error('Error tracking click:', error);
  }
}
