import MainNavigation from './src/navigation';
import { AuthProvider } from './src/providers/auth';

export default function App() {
  return (
    <AuthProvider>
      <MainNavigation />
    </AuthProvider>
  );
}