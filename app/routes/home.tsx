import React from 'react';
import Welcome from '~/components/welcome';

export const HOME_ROUTE = '/';

/**
 * Home route component that renders the Welcome component
 * @returns {React.Element} The rendered Welcome page
 */
export default function Home() {
  return <Welcome />;
}
