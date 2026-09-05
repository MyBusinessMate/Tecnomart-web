import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function usePathname() {
  const location = useLocation();
  return location.pathname;
}

export function useRouter() {
  const navigate = useNavigate();
  return {
    push: (url: string) => navigate(url),
    replace: (url: string) => navigate(url, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
  };
}

export { useParams };
