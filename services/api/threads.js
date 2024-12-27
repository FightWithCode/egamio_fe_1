// services/api/threads.js
import { useAuth } from '@/context/AuthContext';

export async function getBestSuitedThreads({ page = 1, per_page = 10, days = 30 }) {
  // Since we're in a service function, we can't directly use the useAuth hook
  // Instead, we'll get the token from localStorage
  const accessToken = localStorage.getItem('accessToken');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/eg-threads/threads/list?page=${page}&per_page=${per_page}&days=${days}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized access
      throw new Error('Unauthorized access');
    }
    throw new Error('Failed to fetch threads');
  }

  return response.json();
}
